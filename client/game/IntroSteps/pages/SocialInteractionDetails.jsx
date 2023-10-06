import React from "react"

import { Centered } from "meteor/empirica:core"
// //// Avatar stuff //////
// const names = "abcdefghijklmnopqrstuvwxyz".toUpperCase().split(""); //for the players names (we will call them A, B, C etc)
const names = ["Blue", "Green", "Pink", "Yellow"] // for the players names to match avatar color
const avatarNames = ["Colton", "Aaron", "Alex", "Tristan"] // to do more go to https://jdenticon.com/#icon-D3
const nameColor = ["#3D50B7", "#70A945", "#DE8AAB", "A59144"] // similar to the color of the avatar

export default class SocialInteractionDetails extends React.Component {
  state = {
    satisfied: false,
  }

  renderPlayer(player, self = false) {
    return (
      <div className="player" key={player._id}>
        <span className="image">
          <span
            className={`satisfied bp3-tag bp3-round ${
              player.satisfied ? "bp3-intent-success" : "bp3-intent-danger"
            }`}
          >
            <span
              className={`bp3-icon-standard ${
                player.satisfied ? "bp3-icon-tick" : "bp3-icon-cross"
              }`}
            />
          </span>

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

  handleSatisfaction = (satisfied, event) => {
    event.preventDefault()
    this.setState({ satisfied: satisfied })
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

    const imagePath =
      game.treatment.playerCount > 1
        ? "experiment/uiSuggestionExample.png"
        : "experiment/indUIExample.svg"

    console.log("imagePath", imagePath)

    const isLeader = player.get("role") === "Leader"

    const leaderIcon = "/avatars/Leader.png"
    const followerIcon = "/avatars/Follower.png"

    const thisPlayer = {
      _id: 0,
      name: names[0],
      nameColor: nameColor[0],
      avatar: isLeader ? leaderIcon : followerIcon,
      satisfied: this.state.satisfied,
      role: isLeader ? "Leader" : "Member",
    }

    const otherPlayers = [
      {
        _id: 1,
        name: names[1],
        nameColor: nameColor[1],
        avatar: isLeader ? followerIcon : leaderIcon,
        satisfied: false,
        role: isLeader ? "Member" : "Leader",
      },
      {
        _id: 2,
        name: names[2],
        nameColor: nameColor[2],
        avatar: followerIcon,
        satisfied: true,
        role: "Member",
      },
    ]
    return (
      <Centered>
        <div className="instructions">
          <h1 className={"bp3-heading"}> Game Interface</h1>
          <p>
            We are almost there! please take a second to familiarize yourself
            with the game User Interface shown here:
          </p>

          <div className="image">
            <img
              className="image-social"
              src={imagePath}
              style={{ border: "2px solid" }}
            />
          </div>

          <br />

          <p>
            Remember, you and your teammates have to find a room assignment plan
            during the time given to you in each task. Please pay attention to
            the Timer on top left, which shows the time you have until the end
            of the task. You will automatically progress to the next task when
            the time is up.
          </p>

          <p>
            However, you can always indicate whether you are satisfied with the
            answer before the timer is up (indicated by the check mark on the
            avatar). Click on the "Satisfied" button in the following example
            and see what happens!
          </p>

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

          <div className="task">
            <div className="board">
              <div className="response">
                <button
                  type="button"
                  className={`bp3-button bp3-icon-cross bp3-intent-danger bp3-large ${
                    this.state.satisfied ? "bp3-minimal" : ""
                  }`}
                  onClick={this.handleSatisfaction.bind(this, false)}
                >
                  Unsatisfied
                </button>
                <button
                  type="button"
                  className={`bp3-button bp3-icon-tick bp3-intent-success bp3-large ${
                    this.state.satisfied ? "" : "bp3-minimal"
                  }`}
                  onClick={this.handleSatisfaction.bind(this, true)}
                >
                  Satisfied
                </button>
              </div>
            </div>
          </div>

          <p>
            If the "Satisfied" button for in is unclickable (i.e., inactive) for
            more than 10 seconds, try to refresh the page. Otherwise, you will
            have wait for the time run out. This will not effect your bonus.
          </p>

          <p>
            Now you know where everything goes and ready to take the quiz! Good
            luck.
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
