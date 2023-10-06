import React from "react"

import { Centered, AlertToaster } from "meteor/empirica:core"

import { Radio, RadioGroup } from "@blueprintjs/core"

import { Checkbox } from "@blueprintjs/core"

import InformationLine from "../../../general/information-line/InformationLine"

export default class GroupQuiz extends React.Component {
  state = {
    nParticipants: "",
    scoreOption: "",
    idle: "",
    largeError: "",
    mc_1_101: false,
    mc_1_102: false,
    mc_1_103: false,
    mc_1_104: false,
    mc_1_105: false,
    mc_2_101: false,
    mc_2_102: false,
    mc_2_103: false,
    mc_2_104: false,
    mc_2_105: false,
    talk_task_1: false,
    talk_task_2: false,
    talk_task_3: false,
    talk_task_4: false,
    talk_task_5: false,
    emptyOption: "",
    memberVoiceOption: "",
    num_players: 0,
  }

  componentDidMount() {
    const { game } = this.props
    this.state.num_players = 3
  }

  handleChange = (event) => {
    const el = event.currentTarget
    this.setState({ [el.name]: el.value.trim().toLowerCase() })
  }

  handleRadioChange = (event) => {
    const el = event.currentTarget
    console.log("el", el)
    console.log("ev", event)
    this.setState({ [el.name]: el.value })
  }

  handleEnabledChange = (event) => {
    const el = event.currentTarget
    this.setState({ [el.name]: !this.state[el.name] })
  }

  // Decrement page
  previous = () => {
    const { player, pageDbIndex } = this.props
    let currentPage = player.get(pageDbIndex)
    currentPage--
    player.set(pageDbIndex, currentPage)
  }

  handleSubmit = (event) => {
    event.preventDefault()

    const { player } = this.props

    //it should be this.state.nParticipants !== "3" but we don't have "treatment" in QUIZ
    if (
      this.state.nParticipants !== this.state.num_players.toString() ||
      this.state.scoreOption !== "all" ||
      this.state.idle !== "100" ||
      this.state.largeError !== "0" ||
      this.state.mc_1_101 ||
      !this.state.mc_1_102 || //only this one is correct
      this.state.mc_1_103 ||
      this.state.mc_1_104 ||
      this.state.mc_1_105 ||
      this.state.mc_2_101 ||
      !this.state.mc_2_102 || //this one is correct
      this.state.mc_2_103 ||
      !this.state.mc_2_104 || //this one is correct
      this.state.mc_2_105 ||
      !this.state.talk_task_1 ||
      !this.state.talk_task_2 ||
      this.state.talk_task_3 ||
      !this.state.talk_task_4 ||
      this.state.talk_task_5 ||
      this.state.emptyOption !== "yes" ||
      this.state.memberVoiceOption === "yes"
    ) {
      AlertToaster.show({
        message:
          "Sorry, you have one or more mistakes. Please ensure that you answer the questions correctly, or go back to the instructions",
      })
    } else {
      player.stage.submit()
    }
  }

  render() {
    const { player } = this.props
    return (
      <Centered>
        <div className="quiz">
          <h1 className={"bp3-heading"}> Quiz </h1>
          <form onSubmit={this.handleSubmit}>
            <div className="bp3-form-group">
              <label className="bp3-label" htmlFor="number-of-participants">
                How many participants will play at the same time, including
                yourself?
              </label>
              <div className="bp3-form-content">
                <input
                  id="nParticipants"
                  className="bp3-input"
                  type="number"
                  min="0"
                  max="150"
                  step="1"
                  dir="auto"
                  name="nParticipants"
                  value={this.state.nParticipants}
                  onChange={this.handleChange}
                  required
                />
              </div>
            </div>

            <div className="bp3-form-group">
              <div className="bp3-form-content">
                <RadioGroup
                  label="Select the true statement about the score:"
                  onChange={this.handleRadioChange}
                  selectedValue={this.state.scoreOption}
                  name="scoreOption"
                  required
                >
                  <Radio
                    label="I will score points only based on the assignments that I make"
                    value="single"
                  />
                  <Radio
                    label="We will submit only one answer as a team and therefore we will all get the same score."
                    value="all"
                  />
                </RadioGroup>
              </div>
            </div>

            <div className="bp3-form-group">
              <div className="bp3-form-content">
                <RadioGroup
                  name="emptyOption"
                  label="is it ok to have some rooms empty? (the answer is 'Yes')"
                  onChange={this.handleRadioChange}
                  selectedValue={this.state.emptyOption}
                  required
                >
                  <Radio label="Yes!" value="yes" />
                  <Radio label="No!" value="no" />
                </RadioGroup>
              </div>
            </div>

            <div className="bp3-form-group">
              <div className="bp3-form-content">
                <RadioGroup
                  name="memberVoiceOption"
                  label="can team leaders or members move students during the phase 'member voice?' (the answer is 'No')"
                  onChange={this.handleRadioChange}
                  selectedValue={this.state.memberVoiceOption}
                  required
                >
                  <Radio label="Yes!" value="yes" />
                  <Radio label="No!" value="no" />
                </RadioGroup>
              </div>
            </div>

            <div className="bp3-form-group">
              <label className="bp3-label" htmlFor="number-of-participants">
                If your team ended up NOT assigning all students to room (i.e.,
                at least one student remained in the deck) then your score in
                that task will be:
              </label>
              <div className="bp3-form-content">
                <input
                  id="nParticipants"
                  className="bp3-input"
                  type="number"
                  min="-10"
                  max="10"
                  step="1"
                  dir="auto"
                  name="largeError"
                  value={this.state.largeError}
                  onChange={this.handleChange}
                  required
                />
              </div>
            </div>

            <div className="bp3-form-group">
              <label className="bp3-label" htmlFor="number-of-participants">
                For each unsatisfied (i.e., violated) constraint, how many
                points will be deducted from you?
              </label>
              <div className="bp3-form-content">
                <input
                  id="nParticipants"
                  className="bp3-input"
                  type="number"
                  min="0"
                  max="1000"
                  step="1"
                  dir="auto"
                  name="idle"
                  value={this.state.idle}
                  onChange={this.handleChange}
                  required
                />
              </div>
            </div>

            <div className="bp3-form-group">
              <label className="bp3-label" htmlFor="neighbor-of-room-101">
                During which of the following tasks can team members and leaders
                talk to one another directly without using the in-game chat box?
                (Task 1, 2 and 4)
              </label>
              <div className="bp3-form-content ">
                <div className="bp3-control bp3-checkbox bp3-inline">
                  <Checkbox
                    name={"talk_task_1"}
                    label="Task 1"
                    onChange={this.handleEnabledChange}
                  />
                </div>
                <div className="bp3-control bp3-checkbox bp3-inline">
                  <Checkbox
                    name={"talk_task_2"}
                    label="Task 2"
                    onChange={this.handleEnabledChange}
                  />
                </div>
                <div className="bp3-control bp3-checkbox">
                  <Checkbox
                    name={"talk_task_3"}
                    label="Task 3"
                    onChange={this.handleEnabledChange}
                  />
                </div>
                <div className="bp3-control bp3-checkbox bp3-inline">
                  <Checkbox
                    name={"talk_task_4"}
                    label="Task 4"
                    onChange={this.handleEnabledChange}
                  />
                </div>
                <div className="bp3-control bp3-checkbox bp3-inline">
                  <Checkbox
                    name={"talk_task_5"}
                    label="Task 5"
                    onChange={this.handleEnabledChange}
                  />
                </div>
              </div>
            </div>

            <div className="bp3-form-group">
              <label className="bp3-label" htmlFor="neighbor-of-room-101">
                Which of the following rooms is a neighbor of Room 101? Please
                select all that apply. (102)
              </label>
              <div className="bp3-form-content ">
                <div className="bp3-control bp3-checkbox bp3-inline">
                  <Checkbox
                    name={"mc_1_101"}
                    label="Room 101"
                    onChange={this.handleEnabledChange}
                  />
                </div>
                <div className="bp3-control bp3-checkbox bp3-inline">
                  <Checkbox
                    name={"mc_1_102"}
                    label="Room 102"
                    onChange={this.handleEnabledChange}
                  />
                </div>
                <div className="bp3-control bp3-checkbox">
                  <Checkbox
                    name={"mc_1_103"}
                    label="Room 103"
                    onChange={this.handleEnabledChange}
                  />
                </div>
                <div className="bp3-control bp3-checkbox bp3-inline">
                  <Checkbox
                    name={"mc_1_104"}
                    label="Room 104"
                    onChange={this.handleEnabledChange}
                  />
                </div>
                <div className="bp3-control bp3-checkbox bp3-inline">
                  <Checkbox
                    name={"mc_1_105"}
                    label="Room 105"
                    onChange={this.handleEnabledChange}
                  />
                </div>
              </div>
            </div>

            <div className="bp3-form-group">
              <label className="bp3-label" htmlFor="neighbor-of-room-101">
                Which of the following rooms is a neighbor of Room 103? Please
                select all that apply. (102, 104){" "}
              </label>
              <div className="bp3-form-content ">
                <div className="bp3-control bp3-checkbox">
                  <Checkbox
                    name={"mc_2_101"}
                    label="Room 101"
                    onChange={this.handleEnabledChange}
                  />
                </div>
                <div className="bp3-control bp3-checkbox bp3-inline">
                  <Checkbox
                    name={"mc_2_102"}
                    label="Room 102"
                    onChange={this.handleEnabledChange}
                  />
                </div>
                <div className="bp3-control bp3-checkbox bp3-inline">
                  <Checkbox
                    name={"mc_2_103"}
                    label="Room 103"
                    onChange={this.handleEnabledChange}
                  />
                </div>
                <div className="bp3-control bp3-checkbox">
                  <Checkbox
                    name={"mc_2_104"}
                    label="Room 104"
                    onChange={this.handleEnabledChange}
                  />
                </div>
                <div className="bp3-control bp3-checkbox">
                  <Checkbox
                    name={"mc_2_105"}
                    label="Room 105"
                    onChange={this.handleEnabledChange}
                  />
                </div>
              </div>
            </div>

            <button
              type="button"
              className="bp3-button bp3-intent-nope bp3-icon-double-chevron-left"
              onClick={this.previous}
            >
              Back to instructions
            </button>
            <button
              type="submit"
              disabled={player.stage.submitted}
              className="bp3-button bp3-intent-primary"
            >
              {this.props.player.stage.submitted
                ? "Waiting for the others..."
                : "Submit"}
              <span className="bp3-icon-standard bp3-icon-key-enter bp3-align-right" />
            </button>
          </form>

          {/* Show this message once the player has submitted, this is to explain to them why they are waiting for the others */}
          {player.stage.submitted && (
            <>
              <br />
              <div className="game-instructions">
                <div>
                  <strong>Note:</strong> The next stage will only start once all
                  players have finished reading the instructions and have
                  clicked the <em>‘Submit’</em> button. You can see whether
                  players have clicked the button by looking at the "Player
                  Status" below: the cross next to their avatar (i.e., their
                  chess piece) will have changed to a checkmark.
                </div>
              </div>
            </>
          )}
        </div>
      </Centered>
    )
  }
}
