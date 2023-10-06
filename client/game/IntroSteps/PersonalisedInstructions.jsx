import React, { Component } from "react"

// Importing the ui
import Page from "./ui/Page" // Where the pages are handled
import Heading from "./ui/Heading" // Just repeats some information the players about how this stage (their profile, timer, number of pages)

// This is one stage of instructions, but to split the instructions in to readable chunks
// we use multiple pages that participants can navigate back and forth between

export default class PersonalisedInstructions extends Component {
  // Have the min and max pages.
  // The pageDbIndex is the name underwhich the player has the number of the page they are currently at.
  // You would get it with player.get(pageDbIndex)
  state = {
    min: 1,
    max: 9,
    pageDbIndex: "personalisedInstructionsPage",
  }

  // Play a little sound to announce to players that the stage has started
  notificationSound = new Audio("sounds/notification.mp3")
  componentDidMount() {
    this.notificationSound.play()
  }

  // Because the pages are within the same component, the position of the user's scroll stays the same
  // This function can be used to scroll the window to the top on the rendering of the component
  scrollToTop = () => {
    window.scrollTo(0, 0)
  }

  render() {
    const { player } = this.props
    const { pageDbIndex, min, max } = this.state
    let currentPage = player.get(pageDbIndex)

    return (
      <div>
        <Heading currentPage={currentPage} max={max} {...this.props} />

        <Page
          pageDbIndex={pageDbIndex}
          min={min}
          max={max}
          scrollToTop={this.scrollToTop}
          {...this.props}
        />
      </div>
    )
  }
}
