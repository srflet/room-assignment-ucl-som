import React from "react"

import { StageTimeWrapper } from "meteor/empirica:core"

class timer extends React.Component {
  state = { phaseName: "Leader Decision" }

  componentDidMount() {
    const { game } = this.props
    const pauseStart = (game.treatment.stageDuration / 3) * 2
    const pauseEnd = pauseStart - game.treatment.pauseDuration

    this.setState({ pauseStart: pauseStart })
    this.setState({ pauseEnd: pauseEnd })
  }

  render() {
    const { remainingSeconds, game, stage, player } = this.props
    const stageId = stage.get("task")._id
    const minutes = ("0" + Math.floor(remainingSeconds / 60)).slice(-2)
    const seconds = ("0" + (remainingSeconds - minutes * 60)).slice(-2)

    const pauseStart = stage.get("pauseStart")
    const pauseEnd = stage.get("pauseEnd")

    const classes = ["timer"]
    if (remainingSeconds <= 5) {
      classes.push("lessThan5")
    } else if (remainingSeconds <= 10) {
      classes.push("lessThan10")
    }

    if (
      stage.name.split("_")[0] === "Group" &&
      remainingSeconds === pauseStart
    ) {
      if (stageId === "0") {
        player.stage.set("alert", true)
      }
      stage.set("paused", true)
      stage.set("canSuggest", true)
      // this.setState({ phaseName: "Member Voice" })
    }

    if (stage.name.split("_")[0] === "Group" && remainingSeconds === pauseEnd) {
      if (stageId !== "1") {
        player.stage.set("alert", true)
      }
      stage.set("paused", false)
      stage.set("hasPaused", true)
      // this.setState({ phaseName: "Collective Deliberation" })
    }

    return (
      <div className={classes.join(" ")}>
        <h5 className="bp3-heading">Timer</h5>
        <span className="seconds">
          {minutes}:{seconds}
        </span>
      </div>
    )
  }
}

export default Timer = StageTimeWrapper(timer)
