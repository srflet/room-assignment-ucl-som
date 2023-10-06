import React from "react"

import { Centered } from "meteor/empirica:core"

export default class MoreAboutBonus extends React.Component {
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
          <h1 className={"bp3-heading"}> Scores and Performance Points</h1>

          <p>
            In each task, we use "score" to evaluate the quality of the room
            assignment plan that {social ? "your team" : "you"} came up with.{" "}
            <strong style={{ color: "red" }}>
              {" "}
              Your score starts counting only when you have a complete
              assignment
            </strong>{" "}
            (that is, each student has been assigned to a room).
          </p>

          <p>The score of your assignment is calculated as:</p>

          <div className="game-tip" style={{ textAlign: "center" }}>
            <p>
              S = The sum of students' ratings of their assigned rooms - 100 *
              the number of violated constraints
            </p>
          </div>

          <p>
            That means,{" "}
            <strong>
              for each constraint you violate, you get 100 points deducted.
            </strong>
          </p>

          {social ? (
            <p>
              As a team, <strong>you will submit ONE answer per task</strong>{" "}
              and therefore{" "}
              <strong>
                all team members will have the same score on each task
              </strong>
              .
            </p>
          ) : null}

          <p>
            Please note{" "}
            <strong>your goal is to find the BEST possible assignment </strong>{" "}
            (i.e., "optimal assignment solution"). Also,
            <strong>
              you can earn more game points (i.e., better overall performance)
              from the difficult tasks{" "}
            </strong>{" "}
            compared to the easier ones (more students/rooms means more possible
            bonus).
          </p>

          <p>
            <em style={{ color: "red" }}>
              Please note that your performance in the second and third session
              will carry 30% of weight in the overall performance (each carries
              15%), and that your performance in the fourth and fifth session
              will carry 70% of weight in the overall performance (each carries
              35%). In other words, your overall success in this simulation will
              be disproportionately determined by your performance in the last
              two tasks, which are more difficult than the previous two tasks.
            </em>
          </p>

          {social ? (
            <div style={{ textAlign: "center" }}>
              <p>
                <strong>
                  Together with your teammates, you should try to find a
                  complete room assignment with a score that is as high as
                  possible to earn more bonus in each task!
                </strong>
              </p>
            </div>
          ) : null}

          <p>
            <strong>
              {social ? "Remember, free riding is not permitted." : ""} If we
              detect that you are inactive during a task, you will not receive a
              bonus for that task.
            </strong>
          </p>

          <button
            type="button"
            className="bp3-button bp3-intent-nope bp3-icon-double-chevron-left"
            onClick={this.previous}
          >
            Previous
          </button>
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
