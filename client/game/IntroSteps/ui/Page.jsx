import React, { Component } from "react"

// Importing the pages
import Overview from "../pages/Overview"
import TaskDetails from "../pages/TaskDetails"
import ConstraintsDetails from "../pages/ConstraintsDetails"
import RoomArrangements from "../pages/RoomArrangements"
import TeamDetails from "../pages/TeamDetails"
import MoreAboutBonus from "../pages/MoreAboutBonus"
import Phases from "../pages/Phases"
import SocialInteractionDetails from "../pages/SocialInteractionDetails"
import GroupQuiz from "../pages/GroupQuiz"

// Based on the currentPage number (that the player can change with navigating buttons),
// show that page and passed down all the props.

export default class Page extends Component {
  render() {
    const { player, pageDbIndex } = this.props
    let currentPage = player.get(pageDbIndex)

    if (currentPage === 1) {
      return <Overview {...this.props} />
    } else if (currentPage === 2) {
      return <TaskDetails {...this.props} />
    } else if (currentPage === 3) {
      return <ConstraintsDetails {...this.props} />
    } else if (currentPage === 4) {
      return <RoomArrangements {...this.props} />
    } else if (currentPage === 5) {
      return <TeamDetails {...this.props} />
    } else if (currentPage === 6) {
      return <Phases {...this.props} />
    } else if (currentPage === 7) {
      return <MoreAboutBonus {...this.props} />
    } else if (currentPage === 8) {
      return <SocialInteractionDetails {...this.props} />
    } else if (currentPage === 9) {
      return <GroupQuiz {...this.props} />
    }
  }
}
