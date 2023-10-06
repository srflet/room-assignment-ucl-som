import React, { Component } from "react"

export default class GroupIdField extends Component {
  constructor(props) {
    super(props)
    this.state = {
      groupId: "",
      fullName: "",
    }
  }

  handleChange = (event) => {
    this.setState({ groupId: event.currentTarget.value })
  }

  handleUpdate = (event) => {
    const { value, name } = event.currentTarget
    this.setState({ [name]: value })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    const { player, onNext } = this.props
    const { groupId, fullName } = this.state

    if (groupId === "") {
      alert("Please select your Group ID")
      return
    }

    player.set("groupIdTag", groupId)
    player.set("fullName", fullName)
    onNext()
  }

  handleClick = (event) => {
    event.preventDefault()
    const { player, onNext } = this.props
    const { groupId } = this.state

    player.set("groupIdTag", groupId)

    onNext()
  }

  render() {
    const { groupId, fullName } = this.state

    return (
      <div className="container">
        <form className="flex-col" onSubmit={this.handleSubmit}>
          <h1>Identification</h1>

          <p>
            Please enter your <strong>full name</strong>:
          </p>

          <p>
            <input
              dir="auto"
              type="text"
              name="fullName"
              id="fullName"
              value={fullName}
              onChange={this.handleUpdate}
              required
              autoComplete="off"
            />
          </p>

          <p>
            Please select your <strong>Group ID</strong> from the options below:
          </p>
          <p>
            <strong>
              You must select the Group ID that has been given to you
            </strong>
            .
          </p>

          <div className="id-options">
            <div className="id-options-item">
              <input
                type="radio"
                name="groupId"
                value="1"
                onChange={this.handleChange}
                checked={groupId === "1"}
              />
              <span>One</span>
            </div>
            <div className="id-options-item">
              <input
                type="radio"
                name="groupId"
                value="2"
                onChange={this.handleChange}
                checked={groupId === "2"}
              />
              <span>Two</span>
            </div>
            <div className="id-options-item">
              <input
                type="radio"
                name="groupId"
                value="3"
                onChange={this.handleChange}
                checked={groupId === "3"}
              />
              <span>Three</span>
            </div>
            <div className="id-options-item">
              <input
                type="radio"
                name="groupId"
                value="4"
                onChange={this.handleChange}
                checked={groupId === "4"}
              />
              <span>Four</span>
            </div>
            <div className="id-options-item">
              <input
                type="radio"
                name="groupId"
                value="5"
                onChange={this.handleChange}
                checked={groupId === "5"}
              />
              <span>Five</span>
            </div>
          </div>

          <br />
          <p>
            <button className="main-btn" onClick={this.handleSubmit}>
              Submit
            </button>
          </p>
        </form>
      </div>
    )
  }
}
