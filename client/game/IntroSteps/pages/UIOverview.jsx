import React from "react"

import { Centered } from "meteor/empirica:core"
export default class UIOverview extends React.Component {
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
    const { hasPrev, hasNext, onNext, onPrev, treatment } = this.props
    const imagePath =
      treatment.playerCount > 1
        ? "experiment/uiSuggestions.png"
        : "experiment/indUIExample.svg"

    console.log("imagePath", imagePath)

    return (
      <Centered>
        <div className="instructions">
          <h1 className={"bp3-heading"}> Game Interface</h1>
          <p>
            We are almost there! please take a second to familiarize yourself
            with the game User Interface shown here:
          </p>

          <div className="image">
            <img src={imagePath} style={{ border: "2px solid" }} />
          </div>
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
