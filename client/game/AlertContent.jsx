import { Divider } from "@blueprintjs/core"
import React, { Component } from "react"
import Author from "./Author"

export class PausedAlert extends Component {
  render() {
    const { role } = this.props
    return (
      <div style={alertText}>
        {role === "Leader" ? (
          <p>
            <strong>
              Please wait while the other players submit suggestion for moves
              that you could make
            </strong>
          </p>
        ) : (
          <p>
            <strong>
              Please use the chat box to submit suggestions for moves that can
              improve your leaders' decisions
            </strong>
          </p>
        )}
      </div>
    )
  }
}

export class UnpausedAlert extends Component {
  render() {
    const { role } = this.props
    return (
      <div style={alertText}>
        <p>
          You can talk to one another directly during this phase. Please discuss
          ways to improve the leader's decision.
        </p>
      </div>
    )
  }
}

export class StartAlert extends Component {
  render() {
    const { role } = this.props
    return (
      <div style={alertText}>
        <p>
          You now enter the “leader decision” phase, during which only team
          leaders can move students. Team members should consider ways to
          improve their leaders' decisions during this period.
        </p>

        {role === "Leader" && (
          <p>
            <em>
              Please use the checkboxes next to each suggestion to indicate that
              you endorse that suggestion
            </em>
          </p>
        )}
      </div>
    )
  }
}

export class FinalAlert extends Component {
  render() {
    const { stageId, role } = this.props
    return (
      <div style={alertText}>
        {(stageId === "2") | (stageId === "4") ? (
          <div>
            <p>
              <strong>
                You can only communicate with one another using the chat box
                during this phase.
              </strong>
            </p>
            <p>Please discuss ways to improve the leader's decision.</p>
          </div>
        ) : (
          <div>
            <p>
              You can talk to one another directly during this phase. Please
              discuss ways to improve the leader's decision.
            </p>
          </div>
        )}

        {role === "Leader" && (
          <p>
            <em>
              Please use the checkboxes next to each suggestion to indicate that
              you endorse that suggestion
            </em>
          </p>
        )}
      </div>
    )
  }
}

const alertText = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  margin: "3rem",
}
