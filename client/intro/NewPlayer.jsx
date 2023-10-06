import React, { Component } from "react"

export default class NewPlayer extends Component {
  state = { id: "" }

  handleUpdate = (event) => {
    const { value, name } = event.currentTarget
    this.setState({ [name]: value })
  }

  handleSubmit = (event) => {
    event.preventDefault()

    const { handleNewPlayer } = this.props
    const { id } = this.state
    handleNewPlayer(id)
  }

  render() {
    const { id } = this.state

    return (
      <div className="container">
        <form className="flex-col" onSubmit={this.handleSubmit}>
          <h1>Identification</h1>

          <p>
            Please enter your <strong>TCU ID</strong>:
          </p>

          <p>
            <input
              dir="auto"
              type="text"
              name="id"
              id="id"
              value={id}
              onChange={this.handleUpdate}
              required
              autoComplete="off"
            />
          </p>

          <br />

          <p>
            <button className="main-btn" type="submit">
              Submit
            </button>
          </p>
        </form>
      </div>
    )
  }
}
