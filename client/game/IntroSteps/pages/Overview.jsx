import React from "react"

import { Centered } from "meteor/empirica:core"
import { Button } from "@blueprintjs/core"

export default class Overview extends React.Component {
  // Decrement page
  previous = () => {
    const { player, pageDbIndex } = this.props
    let currentPage = player.get(pageDbIndex)
    currentPage--
    player.set(pageDbIndex, currentPage)
  }

  // Increment page
  next = () => {
    const { player, pageDbIndex, max } = this.props
    let currentPage = player.get(pageDbIndex)
    currentPage++

    if (currentPage > max) {
      player.stage.submit()
    } else {
      player.set(pageDbIndex, currentPage)
    }
  }
  render() {
    const { game } = this.props
    const social = game.treatment.playerCount > 1
    return (
      <Centered>
        <div className="instructions">
          <h1 className={"bp3-heading"}> Game Overview </h1>
          <p>
            In this game, you will be{" "}
            <strong>
              asked to solve a sequence of resource allocation tasks
            </strong>
            . In each task, you are going to{" "}
            <strong>assign a group of students into dorm rooms</strong>. You are
            asked to find the room assignment plan that maximizes overall
            satisfaction for the group while respecting certain constraints
            (e.g., some students can not live together in one room).
          </p>

          <p>
            You have at most{" "}
            <strong>
              {Math.ceil(game.treatment.stageDuration / 60.0)} minutes
            </strong>{" "}
            to work on each task. Completing the entire game may take you
            approximately 60 minutes.{" "}
          </p>

          {social ? (
            <div>
              <p>
                You will play this game with 2 other students in real-time. As
                we will explain in more detail later, in each task, you and your
                teammates will submit a single room assignment plan. . As we
                will explain in more detail later, in each task, you and your
                teammates will submit a single room assignment plan.
              </p>
              <p>
                You will have the opportunity to earn a
                <strong>
                  {" "}
                  bonus payment that is set up to motivate you to work hard on
                  this simulation
                </strong>
                . Specifically, each of the top 10 teams will earn $100, and the
                three members of each team will split the bonus payment. Note
                that "free riding" is not permitted.{" "}
                <em style={{ color: "red" }}>
                  If we detect that you are inactive during a task, you will not
                  receive course credits for your participation.
                </em>
              </p>
            </div>
          ) : (
            <p>
              In each task, you will submit a single room assignment plan. We
              will evaluate the quality of your plan by scoring it in each task.
              At the end of the game, you will have the opportunity to earn a
              bonus payment and the amount is dependent on your accumulated
              score in all {game.treatment.nRounds} tasks.{" "}
              <em style={{ color: "red" }}>
                If we detect that you are inactive during a task, you will not
                receive a bonus for that task.
              </em>
            </p>
          )}
          <p>
            <strong>
              For the best experience, please maximize the window containing
              this task or make it as large as possible.
            </strong>
          </p>
          <button
            type="button"
            className="bp3-button bp3-intent-primary"
            onClick={this.next}
          >
            Next
            <span className="bp3-icon-standard bp3-icon-double-chevron-right bp3-align-right" />
          </button>
        </div>
      </Centered>
    )
  }
}
