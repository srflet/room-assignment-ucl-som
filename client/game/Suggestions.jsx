import React from "react"
import Author from "./Author"
import { TimeSync } from "meteor/mizzao:timesync"
import moment from "moment"

var Filter = require("bad-words"),
  filter = new Filter()

export default class Suggestions extends React.Component {
  state = { comment: "", time: 0 }

  handleChange = (e) => {
    const el = e.currentTarget
    console.log("el", el.value)
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
        text,
        playerId: player._id,
        at: moment(TimeSync.serverTime(null, 1000)),
        mtype: stage.get("paused") ? "suggestion" : "chat",
        groupId: groupTag,
      })
      this.setState({ comment: "" })
      this.setState({ time: 0 })
    }
  }

  render() {
    const { comment } = this.state
    const { messages, stage, player } = this.props
    const role = player.get("role")

    const isPaused = stage.get("paused")
    const hasPaused = stage.get("hasPaused")

    // console.log("message", messages)
    // console.log("comment", comment)
    return (
      <div className="chat bp3-card">
        <Messages
          messages={messages}
          player={player}
          paused={isPaused}
          stage={stage}
        />
        {((role === "Follower") & isPaused || hasPaused) && (
          <form onSubmit={this.handleSubmit}>
            <div className="bp3-control-group">
              <input
                name="comment"
                type="text"
                className="bp3-input bp3-fill"
                placeholder="e.g. Move X to 125"
                value={comment}
                onChange={this.handleChange}
                autoComplete="off"
              />
              <button type="submit" className="bp3-button bp3-intent-primary">
                Submit
              </button>
            </div>
          </form>
        )}
      </div>
    )
  }
}

// const chatSound = new Audio("experiment/unsure.mp3");
class Messages extends React.Component {
  componentDidMount() {
    this.messagesEl.scrollTop = this.messagesEl.scrollHeight
  }

  componentDidUpdate(prevProps) {
    if (prevProps.messages.length < this.props.messages.length) {
      this.messagesEl.scrollTop = this.messagesEl.scrollHeight
      // chatSound.play();
    }
  }
  render() {
    const { messages, player, paused, stage } = this.props
    const isLeader = player.get("role") === "Leader"

    let _messages =
      paused && !isLeader
        ? messages
            .filter((m) => m.groupId === player.get("groupIdTag"))
            .filter((m) => m.subject.id === player.id)
        : messages.filter((m) => m.groupId === player.get("groupIdTag"))

    return (
      <div className="messages" ref={(el) => (this.messagesEl = el)}>
        {messages.length === 0 ? (
          <div className="empty">
            {paused
              ? "Please enter a suggestion for the leader..."
              : "No suggestions were made."}
          </div>
        ) : null}
        {_messages.map((message, i) => (
          <Message
            key={i}
            id={i}
            message={message}
            self={message.subject ? player._id === message.subject._id : null}
            {...this.props}
          />
        ))}
      </div>
    )
  }
}

class Message extends React.Component {
  handleChange = (key, subject, text, event) => {
    const { stage, player } = this.props
    const groupTag = player.get("groupIdTag")
    let suggestions = stage.get(`${groupTag}-suggestions`)
    if (event.target.checked) {
      suggestions[key]["approved"] = true
    } else {
      suggestions[key]["approved"] = false
    }
    stage.set(`${groupTag}-suggestions`, suggestions)
  }

  render() {
    const { text, subject, mtype } = this.props.message
    const { self, player, stage, id } = this.props

    console.log(stage.get("paused"))

    return (
      <div className="message-container">
        <div className="message">
          <Author player={subject} self={self} />
          {text}
        </div>
        {player.get("role") === "Leader" && mtype === "suggestion" && (
          <input
            className="checkbox"
            type="checkbox"
            onChange={(e) => this.handleChange(id, subject, text, e)}
          />
        )}
      </div>
    )
  }
}
