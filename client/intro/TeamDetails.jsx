import React from "react"

import { Centered } from "meteor/empirica:core"
// //// Avatar stuff //////
// const names = "abcdefghijklmnopqrstuvwxyz".toUpperCase().split(""); //for the players names (we will call them A, B, C etc)
const names = ["Blue", "Green", "Pink", "Yellow"] // for the players names to match avatar color
const avatarNames = ["Colton", "Aaron", "Alex", "Tristan"] // to do more go to https://jdenticon.com/#icon-D3
const nameColor = ["#3D50B7", "#70A945", "#DE8AAB", "A59144"] // similar to the color of the avatar

export default class TeamDetails extends React.Component {
  renderPlayer(player, self = false) {
    return (
      <div className="player" key={player._id}>
        <span className="image">
          <img src={player.avatar} />
        </span>
        {/* <span className="name" style={{ color: player.get("nameColor") }}> */}
        <span className="name" style={{ color: player.nameColor }}>
          {player.get("role")}
          {self ? " (You)" : ""}
        </span>
      </div>
    )
  }

  render() {
    const { hasPrev, hasNext, onNext, onPrev, treatment } = this.props
    const player = {
      _id: 0,
      name: names[0],
      nameColor: nameColor[0],
      avatar: `/avatars/Leader.png`,
    }

    const otherPlayers = [
      {
        _id: 1,
        name: names[1],
        nameColor: nameColor[1],
        avatar: `/avatars/Follower.png`,
      },
      {
        _id: 2,
        name: names[2],
        nameColor: nameColor[2],
        avatar: `/avatars/Follower.png`,
      },
    ]
    return (
      <Centered>
        <div className="instructions">
          <h1 className={"bp3-heading"}>You will be part of a team</h1>
          <p>
            In this game, you will{" "}
            <strong>
              play together with 2 other participants (your teammates)
            </strong>
            . They are other other students sitting near you. Throughout all the
            tasks, the team will submit only one answer, and therefore,{" "}
            <strong>all members of the team will receive the same score</strong>
            .
          </p>

          <p>
            <strong>
              <u>
                One member will be assigned as team LEADER, whose responsibility
                is to manage the drag and drop function on behalf of the team
              </u>
              .
            </strong>{" "}
            Meanwhile, the other two members will be able to communicate and
            advise the leader about what moves the team should make by verbal
            communication or typing in the dialogue box in the simulation.
          </p>
          <p>
            Another way for members to influence team decisions is to utilize
            the mid-game suggestion function. At the halfpoint of each round,{" "}
            <strong>
              <u>
                the game will pause for 1 minute where the two team members can
                make independent suggestions
              </u>
            </strong>{" "}
            about the team’s next moves.
          </p>

          <p>
            To help you identify yourself and differentiate each other in the
            team, we will assign a color to you when the game starts (as shown
            in the following example).
          </p>
          <br />
          <div className="social-interactions" style={{ margin: "auto" }}>
            <div className="status">
              <div className="players bp3-card">
                {this.renderPlayer(player, true)}
                {otherPlayers.map((p) => this.renderPlayer(p))}
              </div>
              <div className="total-score bp3-card">
                <h6 className={"bp3-heading"}>Total Score</h6>

                <h2 className={"bp3-heading"}>{3400}</h2>
              </div>
            </div>
          </div>

          <br />

          <button
            type="button"
            className="bp3-button bp3-intent-nope bp3-icon-double-chevron-left"
            onClick={onPrev}
            disabled={!hasPrev}
          >
            Previous
          </button>
          <button
            type="button"
            className="bp3-button bp3-intent-primary"
            onClick={onNext}
            disabled={!hasNext}
          >
            Next
            <span className="bp3-icon-standard bp3-icon-double-chevron-right bp3-icon-align-right" />
          </button>
        </div>
      </Centered>
    )
  }
}
