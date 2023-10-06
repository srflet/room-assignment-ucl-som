import React from "react"
import Author from "./Author"
import { TimeSync } from "meteor/mizzao:timesync"
import moment from "moment"

var Filter = require("bad-words"),
  filter = new Filter()

export default class SuggestionBox extends React.Component {
  state = { comment: "", time: 0 }

  handleChange = (e) => {
    const el = e.currentTarget
    // console.log('el', el.value)
    this.setState({ [el.name]: el.value })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const text = filter.clean(this.state.comment.trim())
    // console.log("submitted");
    // console.log(filter.clean("Don't be an ash0le"));
    // console.log(moment(TimeSync.serverTime(null, 1000)));
    // console.log(moment(TimeSync.serverTime(new Date(), 1000)).format('HH:mm:ss'));
    // console.log('just timesync', new Date(TimeSync.serverTime(null, 1000)))
    // console.log('server time dif', TimeSync.serverOffset())
    // console.log('is synced?', TimeSync.isSynced())

    console.log(new Date(Date.now() + TimeSync.serverOffset()))

    if (text !== "") {
      const { stage, player } = this.props
      const groupTag = player.get("groupIdTag")

      stage.append(`${groupTag}-suggestions`, {
        text: text,
        playerId: player._id,
        at: moment(TimeSync.serverTime(null, 1000)),
        groupId: groupTag,
      })
      this.setState({ comment: "" })
    }
  }

  render() {
    const { comment } = this.state
    const { player } = this.props
    const role = player.get("role")

    // console.log('message', messages);
    // console.log('comment', comment)
    if (role === "Leader") {
      return <p> Waiting for suggestions...</p>
    } else {
      return (
        <div className="chat bp3-card">
          <form onSubmit={this.handleSubmit}>
            <div className="bp3-control-group">
              <input
                name="comment"
                type="text"
                className="bp3-input bp3-fill"
                placeholder="Enter suggestions for the leader"
                value={comment}
                onChange={this.handleChange}
                autoComplete="off"
              />
              <button type="submit" className="bp3-button bp3-intent-primary">
                Submit
              </button>
            </div>
          </form>
        </div>
      )
    }
  }
}
