import React from "react"

import SocialInteractions from "./SocialInteractions.jsx"
// import TaskMoon from "./TaskMoon.jsx"
import Task from "./Task.jsx"
import Alert from "./Alert.jsx"
import { StartAlert } from "./AlertContent.jsx"
import Quiz from "./Quiz.jsx"
import PersonalisedInstructions from "./IntroSteps/PersonalisedInstructions.jsx"

const roundSound = new Audio("experiment/round-sound.mp3")
const gameSound = new Audio("experiment/bell.mp3")

export default class Round extends React.Component {
  componentDidMount() {
    const { game } = this.props
    // if (game.get("justStarted")) {
    //   //play the bell sound only once when the game starts
    //   gameSound.play()
    //   game.set("justStarted", false)
    // } else {
    //   roundSound.play()
    // }
  }

  closeAlert = (e) => {
    const { player, game } = this.props
    game.set("showStartAlert", false)
  }

  render() {
    const { stage, game, player } = this.props

    if (stage.name.split("_")[0] === "Quiz") {
      return (
        <div className="round">
          <Quiz {...this.props} />
        </div>
      )
    }

    if (stage.name === "personalised_instructions") {
      return (
        <div className="round">
          <PersonalisedInstructions {...this.props} />
        </div>
      )
    }

    const showStartAlert = game.get("showStartAlert")
    const isTraining = stage.get("isPractice")

    // const noAlert =
    //   (stage.get("stageNum") === 1) | (stage.get("stageNum") === 2)
    // const showAlert = false
    return (
      <div className="round">
        {showStartAlert && isTraining && (
          <div style={shadedPage}>
            <div style={alert}>
              <StartAlert {...this.props} />
              <p className="button-holder">
                <button onClick={this.closeAlert}>Ok</button>
              </p>
            </div>
          </div>
        )}
        <Task {...this.props} />

        {player.stage.get("alert") && <Alert {...this.props} />}

        {/*game.player.length is a better check for social interaction than 'game.treatment.playerCount > 1' because of the lobby --> ignor settings*/}
        {stage.get("type") === "room" &&
        stage.name.split("_")[0] === "Group" ? (
          <SocialInteractions {...this.props} />
        ) : null}
      </div>
    )
  }
}

// Style variables
const shadedPage = {
  position: "absolute",
  backgroundColor: "rgb(255, 255, 255, 0.7)",
  zIndex: "1",
  width: "100%",
  height: "100%",

  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}

const alert = {
  backgroundColor: "rgb(250, 250, 250)",
  width: "400px",
  height: "250px",
  border: "1px solid black",
  borderRadius: "1rem",

  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
}
