import React from "react"

import Room from "./Room.jsx"
import Timer from "./Timer.jsx"
import { HTMLTable } from "@blueprintjs/core"
import { StageTimeWrapper } from "meteor/empirica:core"
import { TimeSync } from "meteor/mizzao:timesync"
import moment from "moment"

const TimedButton_1 = StageTimeWrapper((props) => {
  const { player, onClick, activateAt, remainingSeconds, stage, testEnv } =
    props

  const disabled = remainingSeconds > activateAt
  return (
    <button
      type="button"
      className={`bp3-button bp3-icon-cross bp3-intent-danger bp3-large ${
        player.get("satisfied") ? "bp3-minimal" : ""
      }`}
      onClick={onClick}
      disabled={testEnv ? false : disabled}
    >
      Unsatisfied
    </button>
  )
})

const TimedButton_2 = StageTimeWrapper((props) => {
  const { player, onClick, activateAt, remainingSeconds, stage, testEnv } =
    props

  const disabled = remainingSeconds > activateAt
  return (
    <button
      type="button"
      className={`bp3-button bp3-icon-tick bp3-intent-success bp3-large ${
        player.get("satisfied") ? "" : "bp3-minimal"
      }`}
      onClick={onClick}
      disabled={testEnv ? false : disabled}
    >
      Satisfied
    </button>
  )
})

export default class Task extends React.Component {
  constructor(props) {
    super(props)
    this.state = { activeButton: false }
  }

  componentDidMount() {
    const { player, stage, playerStage } = this.props
    setTimeout(() => this.setState({ activeButton: true }), 5000) //we make the satisfied button active after 5 seconds
    if (player.stage.submitted) {
      this.setState({ activeButton: false })
    }
  }

  handleSatisfaction = (satisfied, event) => {
    const { game, player, stage } = this.props
    event.preventDefault()

    //if everyone submitted then, there is nothing to handle
    if (player.stage.submitted) {
      return
    }

    //if it is only one player, and satisfied, we want to lock everything
    if (game.players.length === 1 && satisfied) {
      this.setState({ activeButton: false })
    } else {
      //if they are group (or individual that clicked unsatisfied), we want to momentarily disable the button so they don't spam, but they can change their mind so we unlock it after 1.5 seconds
      this.setState({ activeButton: false })
      setTimeout(() => this.setState({ activeButton: true }), 800) //preventing spam by a group
    }

    player.set("satisfied", satisfied)
    // console.log("task moment", moment(TimeSync.serverTime(null, 1000)))
  }

  render() {
    const { game, stage, player } = this.props
    const isSolo = stage.name.split("_")[0] === "Independent"
    const task = stage.get("task")
    const groupTag = player.get("groupIdTag")
    const solutions = stage.get(`${groupTag}-intermediateSolutions`)
    const violatedConstraints = isSolo
      ? player.stage.get("violatedConstraints") || []
      : solutions[solutions.length - 1]?.violatedConstraintsIds || []
    const score = isSolo
      ? player.stage.get("score") || 0
      : solutions[solutions.length - 1]?.completeSolutionScore || 0

    const testEnv = game.treatment.isTest === "yes"

    const phaseName = stage.get("paused")
      ? "Member Voice"
      : stage.get("hasPaused")
      ? "Collective Deliberation"
      : "Leader Decision"

    return (
      <div className="task">
        <div className="left">
          <div className="info">
            <Timer stage={stage} {...this.props} />
            <div className="score">
              <h5 className="bp3-heading">Score</h5>
              <h2 className="bp3-heading">{score}</h2>
            </div>
          </div>
          <br />
          <h3 className="bp3-heading">
            <strong style={{ color: "red" }}>Phase: {phaseName}</strong>
          </h3>
          <div className="constraints">
            {stage.name === "practice" ? (
              <p>
                <strong style={{ color: "blue" }}>
                  This is practice round and the Score will not count
                </strong>
              </p>
            ) : (
              ""
            )}
            <h5 className="bp3-heading">Constraints</h5>
            <ul>
              {task.constraints.map((constraint) => {
                const failed = violatedConstraints.includes(constraint._id)
                return (
                  <li key={constraint._id} className={failed ? "failed" : ""}>
                    {failed ? (
                      <span className="bp3-icon-standard bp3-icon-cross" />
                    ) : (
                      <span className="bp3-icon-standard bp3-icon-dot" />
                    )}
                    {constraint.pair.join(" and ")} {constraint.text}.
                  </li>
                )
              })}
            </ul>
          </div>

          <div className="payoff">
            <h5 className="bp3-heading">Payoff</h5>
            <HTMLTable className="bp3-table">
              <thead>
                <tr>
                  <th>Rooms</th>
                  {task.rooms.map((room) => (
                    <th key={room}>{room}</th>
                  ))}
                </tr>
              </thead>
              {isSolo && (
                <tbody>
                  {task.students.map((student) => (
                    <tr key={student}>
                      <th>Student {student}</th>
                      {task.rooms.map((room) => (
                        <td
                          className={
                            player.stage.get(
                              `${groupTag}-student-${student}-room`
                            ) === room
                              ? "active"
                              : null
                          }
                          key={room}
                        >
                          {task.payoff[student][room]}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              )}
              {!isSolo && (
                <tbody>
                  {task.students.map((student) => (
                    <tr key={student}>
                      <th>Student {student}</th>
                      {task.rooms.map((room) => (
                        <td
                          className={
                            stage.get(`${groupTag}-student-${student}-room`) ===
                            room
                              ? "active"
                              : null
                          }
                          key={room}
                        >
                          {task.payoff[student][room]}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              )}
            </HTMLTable>
          </div>
        </div>

        <div className="board">
          <div className="all-rooms">
            <Room room="deck" isDeck {...this.props} />

            <div className="rooms">
              {task.rooms.map((room) => (
                <Room key={room} room={room} {...this.props} />
              ))}
            </div>
          </div>

          <div className="response">
            <TimedButton_1
              activateAt={game.treatment.stageDuration - 5}
              onClick={this.handleSatisfaction.bind(this, false)}
              testEnv={testEnv}
              {...this.props}
            />

            <TimedButton_2
              activateAt={game.treatment.stageDuration - 5}
              onClick={this.handleSatisfaction.bind(this, true)}
              testEnv={testEnv}
              {...this.props}
            />

            {/* <button
                type="button"
                className={`bp3-button bp3-icon-cross bp3-intent-danger bp3-large ${
                  player.get("satisfied") ? "bp3-minimal" : ""
                }`}
                onClick={this.handleSatisfaction.bind(this, false)}
                disabled={!this.state.activeButton}
              >
                Unsatisfied
              </button>
            <button
              type="button"
              className={`bp3-button bp3-icon-tick bp3-intent-success bp3-large ${
                player.get("satisfied") ? "" : "bp3-minimal"
              }`}
              onClick={this.handleSatisfaction.bind(this, true)}
              disabled={!this.state.activeButton}
            >
              Satisfied
            </button> */}
          </div>
        </div>
      </div>
    )
  }
}
