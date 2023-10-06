import React, { Component } from "react"
import { FinalAlert, PausedAlert, UnpausedAlert } from "./AlertContent"

// Custom alert message that shows up in the middle and hides the rest of the page.
// Tells participants that they are almost out of time.
// This is prettier and more relable than browser alerts that participatns might not see and will block the components from updating
export default class Alert extends Component {
  closeAlert = (e) => {
    const { player } = this.props

    player.stage.set("alert", false)
  }

  render() {
    const { game, stage, player, suggestions, remainingSeconds } = this.props

    const paused = stage.get("paused")
    const hasPaused = stage.get("hasPaused")
    const role = player.get("role")
    const stageId = stage.get("task")._id
    const showAlert = (stageId === "0") | (stageId === "1")
    const showFinalAlert = (stageId === "2") | (stageId === "4")

    return (
      <div style={shadedPage}>
        <div style={alert}>
          {hasPaused && showFinalAlert ? (
            <FinalAlert {...this.props} />
          ) : showAlert && paused ? (
            <PausedAlert role={role} {...this.props} />
          ) : (
            showAlert && <UnpausedAlert role={role} {...this.props} />
          )}

          <p className="button-holder">
            <button onClick={this.closeAlert}>Ok</button>
          </p>
        </div>
      </div>
    )

    // return (
    //   <div style={shadedPage}>
    //     <div style={alert}>
    //       {showAlert && paused ? (
    //         <PausedAlert role={role} {...this.props} />
    //       ) : (
    //         showAlert && <UnpausedAlert role={role} {...this.props} />
    //       )}
    //       {hasPaused && showFinalAlert && <FinalAlert {...this.props} />}

    //       <p className="button-holder">
    //         <button onClick={this.closeAlert}>Ok</button>
    //       </p>
    //     </div>
    //   </div>
    // )
  }
}

// Style variables
const shadedPage = {
  position: "absolute",
  backgroundColor: "rgb(255, 255, 255, 0.7)",
  zIndex: "1",
  width: "100%",
  height: "100%",

  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}

const alert = {
  backgroundColor: "rgb(250, 250, 250)",
  width: "400px",
  height: "250px",
  border: "1px solid black",
  borderRadius: "1rem",

  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
}
