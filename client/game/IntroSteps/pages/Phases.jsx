import React from "react"

import { Centered } from "meteor/empirica:core"
import { Button } from "@blueprintjs/core"

export default class Phases extends React.Component {
  // Decrement page
  previous = () => {
    const { player, pageDbIndex } = this.props
    let currentPage = player.get(pageDbIndex)
    currentPage--
    player.set(pageDbIndex, currentPage)
  }

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
    return (
      <Centered>
        <div className="instructions">
          <h1 className={"bp3-heading"}> Task Phases </h1>
          <p>
            There are <strong>three phases</strong> for each task.
          </p>
          <p>
            <strong>First,</strong> each task starts with the{" "}
            <strong>
              “<u>leader decision</u>”
            </strong>{" "}
            phase, during which only team leaders can move students into rooms.
            At this phase, members cannot move students. Instead, members should
            watch their leaders’ decisions and consider ways to improve leaders’
            decisions.
          </p>

          <p>
            <strong>Second,</strong> the{" "}
            <strong>
              “<u>leader decision</u>”
            </strong>{" "}
            phase will be followed by the{" "}
            <strong>
              “<u>member voice</u>”
            </strong>{" "}
            phase, during which members can offer suggestions to improve
            leaders’ decisions. To do this, members can type their voice using
            the chat box on the right part of the interface. For instance,
            members can type “move Student A to Room 105”.{" "}
            <em style={{ color: "red" }}>
              Please note that neither leaders nor members can move students
              during this phase.
            </em>{" "}
            Specifically, members can only provide suggestions using the chat
            box and leaders can only watch members’ suggestions. Please note no
            in-person communication is allowed during this stage.
          </p>

          <p>
            Next, you will enter the last phase –{" "}
            <strong>
              “<u>collective deliberation</u>”
            </strong>
            . During this period of time, leaders and members can exchange ideas
            and opinions to improve leaders’ decisions.{" "}
            <em style={{ color: "red" }}>
              For the first <u>first</u>, <u>second</u>, and <u>fourth</u>{" "}
              tasks, members can talk to one another directly. However, for the{" "}
              <u>third</u> and <u>fifth</u> tasks, team members and leaders can
              only communicate via the chat box (no talking for the last two
              rounds).
            </em>
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
