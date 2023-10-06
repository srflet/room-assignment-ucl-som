import React, { Component } from "react"
import Timer from "../timer/Timer"

// Information line sometimes show at the top or bottom of a page telling the player:
// - What their profile is and whether they have submitted the stage
// - Whether the other players have submitted the stage
// - The timer
export default class InformationLine extends Component {
  render() {
    const { game, stage, player } = this.props

    return (
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        {/* Player's profile */}
        <MyProfile player={player} />

        {/* Whether the other player's have submitted the stage */}
        <div
          style={{
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <span>
            <strong>Other Player Submission Status</strong>
          </span>
          <div className="justify-center-middle">
            {game.players.map((_player, index) => {
              if (_player._id !== player._id) {
                return <PlayerProfile key={index} player={_player} />
              }
            })}
          </div>
        </div>

        {/* The timer */}
        <Timer player={player} stage={stage} />
      </div>
    )
  }
}

// Whether the player passed down in the props has submitted the stage (check) or not (cross)
class Check extends Component {
  render() {
    const { player } = this.props

    return (
      <>
        {player.stage.submitted ? (
          <img src="/validation/check.png" style={mediumImage} />
        ) : (
          <img src="/validation/cross.png" style={mediumImage} />
        )}
      </>
    )
  }
}

// Current player's profile with initials, avatar, and whether they have submitted the stage
export class MyProfile extends Component {
  render() {
    const { player, hideCheck } = this.props

    return (
      <div
        style={{
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <span>
          <strong>Your Profile</strong>
        </span>
        <div className="justify-center-middle">
          {player.get("initials")}
          {<img src={player.get("avatar")} className="avatar-medium" />}
          {!hideCheck && <Check player={player} />}
        </div>
      </div>
    )
  }
}

// Other players' profile with avatar and whether they have submitted the stage
class PlayerProfile extends Component {
  render() {
    const { player } = this.props

    return (
      <div>
        {<img src={player.get("avatar")} className="avatar-medium" />}
        <Check player={player} />
      </div>
    )
  }
}

// Style variables
const mediumImage = {
  width: "2.5rem",
  height: "2.5rem",
  margin: "0",
}
