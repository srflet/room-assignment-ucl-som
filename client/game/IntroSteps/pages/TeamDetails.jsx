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
          {player.role}
          {self ? " (You)" : ""}
        </span>
      </div>
    )
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
    const { game, player } = this.props
    const isLeader = player.get("role") === "Leader"

    const leaderImg = `/avatars/Leader.png`
    const followerImg = `/avatars/Follower.png`

    const thisPlayer = {
      _id: 0,
      name: names[0],
      nameColor: nameColor[0],
      avatar: isLeader ? leaderImg : followerImg,
      role: isLeader ? "Leader" : "Member",
    }

    const otherPlayers = [
      {
        _id: 1,
        name: names[1],
        nameColor: nameColor[1],
        avatar: isLeader ? followerImg : leaderImg,
        role: isLeader ? "Member" : "Leader",
      },
      {
        _id: 2,
        name: names[2],
        nameColor: nameColor[2],
        avatar: followerImg,
        role: "Member",
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
            . They are other students sitting near you. Throughout all the
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
          <div className="game-tip">
            {isLeader ? (
              <p>
                <strong>
                  <u>You have been assigned as team Leader</u>
                </strong>
                . It is your responsibility to handle the drag and drop function
                on behalf of the team.
              </p>
            ) : (
              <p>
                <strong>
                  <u>You have been assigned as team Member</u>
                </strong>
                . You will have the opportunity to suggest moves for the team
                leader during the{" "}
                <strong>
                  “<u>member voice</u>”
                </strong>{" "}
                phase. Another way for members to influence team decisions is to
                speak up during the
                <strong>
                  “<u>collective deliberation</u>”
                </strong>{" "}
                phase.
              </p>
            )}
          </div>
          <br />

          <p>
            To help you identify yourself and differentiate each other in the
            team, we will assign an icon to you when the game starts (as shown
            in the following example).
          </p>
          <br />
          <div className="social-interactions" style={{ margin: "auto" }}>
            <div className="status">
              <div className="players bp3-card">
                {this.renderPlayer(thisPlayer, true)}
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
            <span className="bp3-icon-standard bp3-icon-double-chevron-right bp3-icon-align-right" />
          </button>
        </div>
      </Centered>
    )
  }
}
