import Empirica from "meteor/empirica:core"

import { getGroupMates, getGroupTags } from "../shared/helpers.js"

// //// Avatar stuff //////

// onGameStart is triggered opnce per game before the game starts, and before
// the first onRoundStart. It receives the game and list of all the players in
// the game.
Empirica.onGameStart((game) => {
  const players = game.players
  console.debug("game ", game._id, " started")

  const names = [
    "Blue",
    "Green",
    "Pink",
    "Yellow",
    "Purple",
    "Red",
    "Turqoise",
    "Gold",
    "Grey",
    "Magenta",
  ] // for the players names to match avatar color
  const avatarNames = [
    "Colton",
    "Aaron",
    "Alex",
    "Tristan",
    "Daniel",
    "Jill",
    "Jimmy",
    "Adam",
    "Flynn",
    "Annalise",
  ] // to do more go to https://jdenticon.com/#icon-D3
  const nameColor = [
    "#3D50B7",
    "#70A945",
    "#DE8AAB",
    "#A59144",
    "#DER5F4",
    "#EB8TWV",
    "#N0WFA4",
    "#TP3BWU",
    "#QW7MI9",
    "#EB8TWj",
  ] // similar to the color of the avatar

  players.forEach((player, i) => {
    player.set("name", names[i])
    player.set("avatar", `/avatars/${player.get("role")}.png`)
    player.set("nameColor", nameColor[i])
    player.set("cumulativeScore", 0)
    player.set("bonus", 0)

    // const groupMates = getGroupMates(players, player)
    // player.set("groupMates", groupMates)
    // console.log(groupMates)
  })

  console.log("TAGS HERE")
  console.log(getGroupTags(players))
})

// onRoundStart is triggered before each round starts, and before onStageStart.
// It receives the same options as onGameStart, and the round that is starting.
Empirica.onRoundStart((game, round) => {})

// onRoundStart is triggered before each stage starts.
// It receives the same options as onRoundStart, and the stage that is starting.
Empirica.onStageStart((game, round, stage) => {
  const players = game.players

  players.forEach((player) => {
    player.set("satisfied", false)
  })

  console.debug("Round ", stage.name, "game", game._id, " started")
  const team = game.get("team")
  console.log("is it team?", team)

  if (stage.get("type") === "moon") {
    const items = stage.get("items")
    if (stage.name === "Independent") {
      game.players.map((player, index) => {
        player.stage.set("items", items)
      })
    }
  }

  if (stage.get("type") === "room") {
    const task = stage.get("task")
    //initiate the score for this round (because everyone will have the same score, we can save it at the round object
    if (stage.name.split("_")[0] === "Independent") {
      game.players.map((player, index) => {
        player.stage.set("task", task)
        player.stage.set("score", 0)
        player.stage.set("log", [
          {
            verb: "roundStarted",
            roundId: stage.name,
            at: new Date(),
          },
        ])

        player.stage.set("intermediateSolutions", [])

        task.students.map((student) => {
          player.stage.set(`student-${student}-room`, "deck")
          // player.stage.set(`student-${student}-dragger`, null)
        })
      })
    } else {
      const groupTags = getGroupTags(players)
      groupTags.forEach((tag) => {
        stage.set(`${tag}-score`, 0)
        stage.set(`${tag}-suggestions`, [])
        stage.set(`${tag}-canSuggest`, false)
        stage.set(`${tag}-log`, [
          {
            verb: "roundStarted",
            roundId:
              stage.name === "practice"
                ? stage.name + " (will not count towards your score)"
                : stage.name,
            at: new Date(),
          },
        ])
        stage.set(`${tag}-intermediateSolutions`, [])

        task.students.forEach((student) => {
          stage.set(`${tag}-student-${student}-room`, "deck")
          // stage.set(`${tag}-student-${student}-dragger`, null)
        })

        //there is a case where the optimal is found, but not submitted (i.e., they ruin things)
        stage.set(`${tag}-optimalFound`, false) //the optimal answer wasn't found
        stage.set(`${tag}-optimalSubmitted`, false) //the optimal answer wasn't submitted
      })
    }
  }
})

// onStageEnd is triggered after each stage.
// It receives the same options as onRoundEnd, and the stage that just ended.
Empirica.onStageEnd((game, round, stage) => {
  console.debug("Round ", stage.name, "game", game._id, " ended")

  if (stage.get("type") === "room") {
    if (stage.name.split("_")[0] === "Independent") {
      game.players.forEach((player) => {
        const currentScore = player.stage.get("score")
        const optimalScore = player.stage.get("task").optimal

        if (currentScore === optimalScore) {
          if (stage.name !== "practice") {
            player.set("nOptimalSolutions", player.get("nOptimalSolutions") + 1)
          }
          player.stage.set("optimalSubmitted", true)
          console.log("You found the optimal")
        }

        if (stage.name !== "practice") {
          const cumScore = player.get("cumulativeScore") || 0
          const scoreIncrement = currentScore > 0 ? Math.round(currentScore) : 0
          player.set("cumulativeScore", Math.round(scoreIncrement + cumScore))
        }
      })
    } else {
      const players = game.players
      const groupTags = getGroupTags(players)
      groupTags.forEach((tag) => {
        const currentScore = stage.get(`${tag}-score`)
        const optimalScore = stage.get(`task`).optimal

        if (currentScore === optimalScore) {
          if (stage.name !== "practice") {
            game.set(
              `${tag}-nOptimalSolutions`,
              game.get(`${tag}-nOptimalSolutions`) + 1
            )
          }
          stage.set(`${tag}-optimalSubmitted`, true)
          console.log("You found the optimal")
        }

        //add the round score to the game total cumulative score (only if it is not practice)
        if (stage.name !== "practice") {
          const cumScore = game.get(`${tag}-cumulativeScore`) || 0
          const scoreIncrement = currentScore > 0 ? Math.round(currentScore) : 0
          game.set(
            `${tag}-cumulativeScore`,
            Math.round(scoreIncrement + cumScore)
          )
        }
      })
    }
  }
})

// onRoundEnd is triggered after each round.
// It receives the same options as onGameEnd, and the round that just ended.
Empirica.onRoundEnd((game, round) => {})

// onRoundEnd is triggered when the game ends.
// It receives the same options as onGameStart.
Empirica.onGameEnd((game) => {
  const players = game.players
  console.debug("The game", game._id, "has ended")
  //computing the bonus for everyone (in this game, everyone will get the same value)
  const conversionRate = game.treatment.conversionRate
    ? game.treatment.conversionRate
    : 1

  const optimalSolutionBonus = game.treatment.optimalSolutionBonus
    ? game.treatment.optimalSolutionBonus
    : 0

  const groupTags = getGroupTags(players)

  groupTags.forEach((tag) => {
    const bonus =
      game.get(`${tag}-cumulativeScore`) > 0
        ? (
            game.get(`${tag}-cumulativeScore`) * conversionRate +
            game.get(`${tag}-nOptimalSolutions`) * optimalSolutionBonus
          ).toFixed(2)
        : 0

    players
      .filter((_player) => _player.get("groupIdTag") === tag)
      .forEach((player) => {
        if (player.get("bonus") === 0) {
          //if we never computed their bonus
          player.set("bonus", bonus)
          player.set("cumulativeScore", game.get(`${tag}-cumulativeScore`))
        }
      })
  })
})

// ===========================================================================
// => onSet, onAppend and onChanged ==========================================
// ===========================================================================

// onSet, onAppend and onChanged are called on every single update made by all
// players in each game, so they can rapidly become quite expensive and have
// the potential to slow down the app. Use wisely.
//
// It is very useful to be able to react to each update a user makes. Try
// nontheless to limit the amount of computations and database saves (.set)
// done in these callbacks. You can also try to limit the amount of calls to
// set() and append() you make (avoid calling them on a continuous drag of a
// slider for example) and inside these callbacks use the `key` argument at the
// very beginning of the callback to filter out which keys your need to run
// logic against.
//
// If you are not using these callbacks, comment them out so the system does
// not call them for nothing.

// // onSet is called when the experiment code call the .set() method
// // on games, rounds, stages, players, playerRounds or playerStages.
Empirica.onSet(
  (
    game,
    round,
    stage,
    player, // Player who made the change
    target, // Object on which the change was made (eg. player.set() => player)
    targetType, // Type of object on which the change was made (eg. player.set() => "player")
    key, // Key of changed value (e.g. player.set("score", 1) => "score")
    value, // New value
    prevValue // Previous value
  ) => {
    const players = game.players
    //someone changed their satisfaction status
    // console.log("key", key)
    // console.log(player.id)
    if (key === "satisfied") {
      //check if everyone is satisfied and if so, submit their answer
      let allSatisfied = true
      players.forEach((player) => {
        allSatisfied = player.get("satisfied") && allSatisfied
      })
      if (allSatisfied) {
        players.forEach((player) => {
          player.stage.submit()
        })
      }
      return
    }
    console.log("line 294", key)
    console.log("line 295", key.split("-"))
    if (key.split("-")[1] === "student" && key.split("-")[3] === "room") {
      console.log("line 297", key.split("-"))
      const groupTag = players
        .filter((_p) => _p.id === player.id)
        .map((p) => {
          return p.get("groupIdTag")
        })[0]

      console.log(groupTag)
      console.log(key.substring(0, 10))
      //someone placed a student to a room
      if (key.split("-")[0] === `${groupTag}`) {
        const task = stage.get("task")
        let assignments = { deck: [] }
        task.rooms.forEach((room) => {
          assignments[room] = []
        })

        //find the rooms for each player
        task.students.forEach((student) => {
          const room = stage.get(`${groupTag}-student-${student}-room`)
          assignments[room].push(student)
        })

        console.log(assignments)

        //check for constraint violations
        const violationIds = getViolations(stage, assignments)
        // stage.set(`${groupTag}-violatedConstraints`, violationIds)

        //get score if there are no violations, otherwise,    the score is 0
        const currentScore =
          assignments["deck"].length === 0
            ? getScore(task, assignments, violationIds.length)
            : 0
        //console.debug("currentScore", currentScore);
        // stage.set(`${groupTag}-score`, currentScore || 0)

        // if (currentScore === task.optimal) {
        //   stage.set(`${groupTag}-optimalFound`, true)
        // }

        //keep track of solution, scores, and violated constraints
        //TODO: eventually this should have the 'log' parameter so it is not sent to the UI
        //TODO: how about I store everything here, and that's it! less data
        stage.append(`${groupTag}-intermediateSolutions`, {
          solution: assignments,
          at: new Date(),
          violatedConstraintsIds: violationIds,
          nConstraintsViolated: violationIds.length,
          score: getScore(task, assignments, violationIds.length),
          optimalFound: currentScore === task.optimal,
          completeSolution: assignments["deck"].length === 0,
          completeSolutionScore: currentScore,
        })
      }
    }
  }
)

//helpers
function getScore(task, assignments, nViolations) {
  let score = 0
  Object.keys(assignments).forEach((room) => {
    assignments[room].forEach((student) => {
      score += task.payoff[student][room]
    })
  })
  return score - nViolations * 100
}

function find_room(assignments, student) {
  return Object.keys(assignments).find((room) =>
    assignments[room].includes(student)
  )
}

function getViolations(stage, assignments) {
  // console.debug("assignments ", assignments);
  const task = stage.get("task")
  const violatedConstraintsIds = []

  task.constraints.forEach((constraint) => {
    const firstStudentRoom = find_room(assignments, constraint.pair[0])
    const secondStudentRoom = find_room(assignments, constraint.pair[1])

    if (firstStudentRoom !== "deck" && secondStudentRoom !== "deck") {
      switch (constraint.type) {
        case 0:
          //they are not in the same room, when they should've
          if (firstStudentRoom !== secondStudentRoom) {
            // console.debug(
            //   constraint.pair.join(" and "),
            //   "they are not in the same room, when they should've"
            // );
            violatedConstraintsIds.push(constraint._id)
          }
          break
        case 1:
          //they are in the same room, when they shouldn't
          if (firstStudentRoom === secondStudentRoom) {
            // console.debug(
            //   constraint.pair.join(" and "),
            //   "they are in the same room, when they shouldn't"
            // );
            violatedConstraintsIds.push(constraint._id)
          }

          break
        case 2:
          //if they are not neighbors, when they should've been
          if (Math.abs(firstStudentRoom - secondStudentRoom) !== 1) {
            // console.debug(
            //   constraint.pair.join(" and "),
            //   "they are not neighbors, when they should've been"
            // );
            violatedConstraintsIds.push(constraint._id)
          }

          break
        case 3:
          if (Math.abs(firstStudentRoom - secondStudentRoom) < 2) {
            // console.debug(
            //   constraint.pair.join(" and "),
            //   "can't live in the same room or be neighbors, so why are they?"
            // );
            violatedConstraintsIds.push(constraint._id)
          }
          break
      }
    }
  })

  return violatedConstraintsIds
}

// // onSet is called when the experiment code call the `.append()` method
// // on games, rounds, stages, players, playerRounds or playerStages.
// Empirica.onAppend((
//   game,
//   round,
//   stage,
//   players,
//   player, // Player who made the change
//   target, // Object on which the change was made (eg. player.set() => player)
//   targetType, // Type of object on which the change was made (eg. player.set() => "player")
//   key, // Key of changed value (e.g. player.set("score", 1) => "score")
//   value, // New value
//   prevValue // Previous value
// ) => {
//   // Note: `value` is the single last value (e.g 0.2), while `prevValue` will
//   //       be an array of the previsous valued (e.g. [0.3, 0.4, 0.65]).
// });

// // onChange is called when the experiment code call the `.set()` or the
// // `.append()` method on games, rounds, stages, players, playerRounds or
// // playerStages.
// Empirica.onChange((
//   game,
//   round,
//   stage,
//   players,
//   player, // Player who made the change
//   target, // Object on which the change was made (eg. player.set() => player)
//   targetType, // Type of object on which the change was made (eg. player.set() => "player")
//   key, // Key of changed value (e.g. player.set("score", 1) => "score")
//   value, // New value
//   prevValue, // Previous value
//   isAppend // True if the change was an append, false if it was a set
// ) => {
//   // `onChange` is useful to run server-side logic for any user interaction.
//   // Note the extra isAppend boolean that will allow to differenciate sets and
//   // appends.
// });
