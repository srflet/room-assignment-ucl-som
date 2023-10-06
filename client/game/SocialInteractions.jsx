import React from "react"
import Suggestions from "./Suggestions"

export default class SocialInteractions extends React.Component {
  state = {}

  // componentDidMount() {
  //   const { game } = this.props

  //   const pauseStart = game.treatment.stageDuration / 2 + game.treatment.pauseDuration / 2
  //   const pauseEnd = game.treatment.stageDuration / 2 - game.treatment.pauseDuration / 2

  //   this.setState({ pauseStart: pauseStart })
  //   this.setState({ pauseEnd: pauseEnd })
  // }

  renderPlayer(player, self = false) {
    return (
      <div className="player" key={player._id}>
        <span className="image">
          <span
            className={`satisfied bp3-tag bp3-round ${
              player.get("satisfied")
                ? "bp3-intent-success"
                : "bp3-intent-danger"
            }`}
          >
            <span
              className={`bp3-icon-standard ${
                player.get("satisfied") ? "bp3-icon-tick" : "bp3-icon-cross"
              }`}
            />
          </span>

          <img src={player.get("avatar")} />
        </span>
        {/* <span className="name" style={{ color: player.get("nameColor") }}> */}
        <span className="name" style={{ color: player.get("nameColor") }}>
          {player.get("role")}
          {self ? " (You)" : ""}
        </span>
      </div>
    )
  }

  render() {
    const { game, stage, player } = this.props
    const groupTag = player.get("groupIdTag")

    const otherPlayers = _.reject(
      game.players.filter(
        (p) => p.get("groupIdTag") === player.get("groupIdTag")
      ),
      (p) => p._id === player._id
    )
    // console.log("otherPlayers", otherPlayers);
    // console.log("chat", stage.get("chat"));
    // console.log("log", stage.get("log"));
    const messages = stage
      .get(`${groupTag}-suggestions`)
      .map(({ text, playerId, mtype, groupId }) => ({
        text,
        subject: game.players.find((p) => p._id === playerId),
        mtype,
        groupId,
      }))
    // const events = stage.get("log").map(({ subjectId, ...rest }) => ({
    //   subject: subjectId && game.players.find((p) => p._id === subjectId),
    //   ...rest,
    // }))

    const paused = stage.get("paused")
    const pauseEnd = stage.get("pauseEnd")
    const role = player.get("role")

    const isVisible = paused ? true : stage.get("canSuggest")

    return (
      <div className="social-interactions">
        <div className="status">
          <div className="players bp3-card">
            {this.renderPlayer(player, true)}
            {otherPlayers.map((p) => this.renderPlayer(p))}
          </div>

          <div className="total-score bp3-card">
            <h6 className="bp3-heading">Total Score</h6>

            <h2 className="bp3-heading">
              {game.get(`${groupTag}-cumulativeScore`) || 0}
            </h2>
          </div>
        </div>
        {isVisible && (
          <Suggestions messages={messages} stage={stage} player={player} />
        )}
      </div>
    )
  }
}
