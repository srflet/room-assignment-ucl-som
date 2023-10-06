import Empirica from "meteor/empirica:core"

import "./callbacks.js"
import "./bots.js"
import { independentData, groupData, ItemList, classData } from "./constants"
import { getGroupTags } from "../shared/helpers.js"

// gameInit is where the structure of a game is defined.
// Just before every game starts, once all the players needed are ready, this
// function is called with the treatment and the list of players.
// You must then add rounds and stages to the game, depending on the treatment
// and the players. You can also get/set initial values on your game, players,
// rounds and stages (with get/set methods), that will be able to use later in
// the game.

Empirica.gameInit((game, treatment) => {
  console.log(
    "Game with a treatment: ",
    treatment,
    " will start, with workers",
    _.pluck(game.players, "id")
  )

  //initiate the cumulative score for this game (because everyone will have the same score, we can save it at the game object
  game.set("cumulativeScore", 0) // the total score at the end of the game
  game.set("nOptimalSolutions", 0) // will count how many times they've got the optimal answer
  game.set("showStartAlert", true)

  let playerRoles = ["Leader", "Follower", "Follower"]
  playerRoles = shuffle(playerRoles)

  game.players.forEach((player, i) => {
    player.set("cumulativeScore", 0)
    player.set("nOptimalSolutions", 0)
    player.set("personalisedInstructionsPage", 1)
  })

  const groupTags = getGroupTags(game.players)
  console.log("----TAGS HERE")
  console.log(groupTags)
  groupTags.forEach((tag) => {
    const _players = game.players.filter((_p) => _p.get("groupIdTag") === tag)
    _players.forEach((player, i) => {
      player.set("role", playerRoles[i])
    })
  })

  game.set("justStarted", true) // I use this to play the sound on the UI when the game starts

  //we don't know the sequence yet
  // let taskSequence1 = independentData
  let taskSequence = classData

  console.log(taskSequence)

  if (game.treatment.shuffleTaskOrder) {
    //TODO: I need to make sure that I keep the first task fixed (if it has training)
    //taskSequence = _.shuffle(taskSequence); //this is full shuffle
    // taskSequence1 = customShuffle(taskSequence1)
    taskSequence = customShuffle(taskSequence) //this is with keeping the first practice round fixed
  }

  // const roundMoonLanding = game.addRound()
  // _.times(2, (i) => {
  //   const stage = roundMoonLanding.addStage({
  //     name: i ? "Group" : "Independent",
  //     displayName: `Moon Landing - ${i ? "Group" : "Independent"}`,
  //     durationInSeconds: 9999999, //game.treatment.stageDuration,
  //   })
  //   stage.set("items", ItemList)
  //   stage.set("type", "moon")
  // })

  //we'll have 2 rounds, each task is one stage. Round 1 is independent, round2 is grouped
  // const round1 = game.addRound()
  // _.times(taskSequence1.length, (i) => {
  //   const stage = round1.addStage({
  //     name: "Independent_" + i,

  //     displayName: taskSequence1[i].difficulty,
  //     durationInSeconds: game.treatment.stageDuration,
  //   })
  //   stage.set("task", taskSequence1[i])
  //   stage.set("type", "room")
  // })

  const round2 = game.addRound()
  const testEnv = game.treatment.isTest === "yes"
  if (!testEnv) {
    round2.addStage({
      name: "personalised_instructions",
      displayName: "Instructions",
      durationInSeconds: testEnv ? 9999 : game.treatment.instructionsDuration,
    })
  }
  _.times(taskSequence.length, (i) => {
    // 2*taskSequence.length ==> if (i % 2) {
    //   const stage = round2.addStage({
    //     name: "Quiz_" + i,
    //     displayName: "Quiz",
    //     durationInSeconds: game.treatment.stageDuration,
    //     pauseDuration: game.treatment.pauseDuration,
    //   })
    const stage = round2.addStage({
      name: "Group_" + i,
      displayName: taskSequence[i].difficulty,
      durationInSeconds: testEnv ? 9999 : game.treatment.stageDuration,
      pauseDuration: game.treatment.pauseDuration,
    })

    const pauseStart =
      game.treatment.stageDuration - game.treatment.leaderDecisionDuration
    const pauseEnd = pauseStart - game.treatment.pauseDuration

    stage.set("pauseEnd", pauseEnd)
    stage.set("pauseStart", pauseStart)
    stage.set("task", taskSequence[i])
    stage.set("type", "room")
    stage.set("paused", false)
    stage.set("isPractice", i === 0)
    stage.set("stageNum", i)
  })
})

// fix the first practice task and shuffle the rest
//to learn more:
//https://stackoverflow.com/questions/50536044/swapping-all-elements-of-an-array-except-for-first-and-last
function customShuffle(taskSequence) {
  // Find and remove first and last:
  const practiceTask = taskSequence[0]

  const firstIndex = taskSequence.indexOf(practiceTask)

  if (firstIndex !== -1) {
    taskSequence.splice(firstIndex, 1)
  }

  // Normal shuffle with the remaining elements using ES6:
  for (let i = taskSequence.length - 1; i > 0; --i) {
    const j = Math.floor(Math.random() * (i + 1))

    ;[taskSequence[i], taskSequence[j]] = [taskSequence[j], taskSequence[i]]
  }

  // Add them back in their new position:
  if (firstIndex !== -1) {
    taskSequence.unshift(practiceTask)
  }

  return taskSequence
}

// shuffle(): Fisher-Yates shuffle from https://www.frankmitchell.org/2015/01/fisher-yates/
function shuffle(array) {
  var i = 0,
    j = 0,
    temp = null
  //Start with i one less than the array size, and decrement i everytime
  for (i = array.length - 1; i > 0; i -= 1) {
    //Math.random() returns a random number between 0 (inclusive) and 1 (exclusive)
    //Math.floor() function returns the largest integer less than or equal to a given number.
    //This will return an integer that is a possible index of the array
    j = Math.floor(Math.random() * (i + 1))
    //Swap the last element of the array (index i) with the element at index j (randomly generated:
    temp = array[i]
    array[i] = array[j]
    array[j] = temp
  }
  //return the shuffled array
  return array
}
