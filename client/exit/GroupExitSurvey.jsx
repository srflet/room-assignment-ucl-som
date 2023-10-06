import React from "react"

import { Centered, AlertToaster } from "meteor/empirica:core"

import {
  Button,
  Classes,
  FormGroup,
  RadioGroup,
  TextArea,
  Intent,
  Radio,
} from "@blueprintjs/core"

export default class GroupExitSurvey extends React.Component {
  static stepName = "ExitSurvey"
  state = {
    tookLead: "",
    determinedAbout: "",
    determinedFocus: "",
    determinedCourse: "",
    askOpinion: "",
    askFeeling: "",
    askConclusion: "",
    askToExplain: "",
    usedSuggestion: "",
    consideredOpinion: "",
    adoptToFix: "",
  }

  handleChange = (event) => {
    const el = event.currentTarget
    this.setState({ [el.name]: el.value })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    const { player, onSubmit } = this.props
    if (
      this.state.tookLead === "" ||
      this.state.determinedAbout === "" ||
      this.state.determinedFocus === "" ||
      this.state.determinedCourse === "" ||
      this.state.askOpinion === "" ||
      this.state.askFeeling === "" || //only this one is correct
      this.state.askConclusion === "" ||
      this.state.askToExplain === "" ||
      this.state.usedSuggestion === "" ||
      this.state.consideredOpinion === "" ||
      this.state.adoptToFix === ""
    ) {
      AlertToaster.show({
        message: "Please ensure that you answer the question",
      })
    } else {
      player.set("exitData", this.state)
      onSubmit()
    }
  }

  exitMessage = (player, game) => {
    return (
      <div>
        {" "}
        <h1> Exit Survey </h1>
      </div>
    )
  }

  render() {
    const { player, game } = this.props

    const {
      tookLead,
      determinedAbout,
      determinedFocus,
      determinedCourse,
      askOpinion,
      askFeeling,
      askConclusion,
      askToExplain,
      usedSuggestion,
      consideredOpinion,
      adoptToFix,
    } = this.state

    return (
      <div>
        {" "}
        <h1> Exit Survey </h1>{" "}
        <p>
          Please rely on your experience in the simulation to answer the
          following questions.
        </p>
        <p>During the “collective deliberation” phase, the team leader…</p>
        <form onSubmit={this.handleSubmit}>
          <div className="pt-form-group">
            <div className="pt-form-content">
              <RadioGroup
                name="tookLead"
                label="Took the lead in the discussion."
                onChange={this.handleChange}
                selectedValue={tookLead}
              >
                <Radio
                  label="Strongly Disagree"
                  value="stronglyDisagree"
                  className={"pt-inline"}
                />
                <Radio
                  label="Somewhat Disagree"
                  value="somewhatDisagree"
                  className={"pt-inline"}
                />
                <Radio
                  label="Neither Agree or Disagree"
                  value="neutral"
                  className={"pt-inline"}
                />

                <Radio
                  label="Somewhat Agree"
                  value="somewhatAgree"
                  className={"pt-inline"}
                />
                <Radio
                  label="Strongly Agree"
                  value="stronglyagree"
                  className={"pt-inline"}
                />
              </RadioGroup>
            </div>
          </div>

          <div className="pt-form-group">
            <div className="pt-form-content">
              <RadioGroup
                name="determinedAbout"
                label="Determined what the discussion was about."
                onChange={this.handleChange}
                selectedValue={determinedAbout}
              >
                <Radio
                  label="Strongly Disagree"
                  value="stronglyDisagree"
                  className={"pt-inline"}
                />
                <Radio
                  label="Somewhat Disagree"
                  value="somewhatDisagree"
                  className={"pt-inline"}
                />
                <Radio
                  label="Neither Agree or Disagree"
                  value="neutral"
                  className={"pt-inline"}
                />

                <Radio
                  label="Somewhat Agree"
                  value="somewhatAgree"
                  className={"pt-inline"}
                />
                <Radio
                  label="Strongly Agree"
                  value="stronglyagree"
                  className={"pt-inline"}
                />
              </RadioGroup>
            </div>
          </div>

          <div className="pt-form-group">
            <div className="pt-form-content">
              <RadioGroup
                name="determinedFocus"
                label="Determined what  what we should focus on during the discussion."
                onChange={this.handleChange}
                selectedValue={determinedFocus}
              >
                <Radio
                  label="Strongly Disagree"
                  value="stronglyDisagree"
                  className={"pt-inline"}
                />
                <Radio
                  label="Somewhat Disagree"
                  value="somewhatDisagree"
                  className={"pt-inline"}
                />
                <Radio
                  label="Neither Agree or Disagree"
                  value="neutral"
                  className={"pt-inline"}
                />

                <Radio
                  label="Somewhat Agree"
                  value="somewhatAgree"
                  className={"pt-inline"}
                />
                <Radio
                  label="Strongly Agree"
                  value="stronglyagree"
                  className={"pt-inline"}
                />
              </RadioGroup>
            </div>
          </div>

          <div className="pt-form-group">
            <div className="pt-form-content">
              <RadioGroup
                name="determinedCourse"
                label="Determined the course of the discussion."
                onChange={this.handleChange}
                selectedValue={determinedCourse}
              >
                <Radio
                  label="Strongly Disagree"
                  value="stronglyDisagree"
                  className={"pt-inline"}
                />
                <Radio
                  label="Somewhat Disagree"
                  value="somewhatDisagree"
                  className={"pt-inline"}
                />
                <Radio
                  label="Neither Agree or Disagree"
                  value="neutral"
                  className={"pt-inline"}
                />

                <Radio
                  label="Somewhat Agree"
                  value="somewhatAgree"
                  className={"pt-inline"}
                />
                <Radio
                  label="Strongly Agree"
                  value="stronglyagree"
                  className={"pt-inline"}
                />
              </RadioGroup>
            </div>
          </div>

          <div className="pt-form-group">
            <div className="pt-form-content">
              <RadioGroup
                name="askOpinion"
                label="Asked to find out about the background of somebody's opinion."
                onChange={this.handleChange}
                selectedValue={askOpinion}
              >
                <Radio
                  label="Strongly Disagree"
                  value="stronglyDisagree"
                  className={"pt-inline"}
                />
                <Radio
                  label="Somewhat Disagree"
                  value="somewhatDisagree"
                  className={"pt-inline"}
                />
                <Radio
                  label="Neither Agree or Disagree"
                  value="neutral"
                  className={"pt-inline"}
                />

                <Radio
                  label="Somewhat Agree"
                  value="somewhatAgree"
                  className={"pt-inline"}
                />
                <Radio
                  label="Strongly Agree"
                  value="stronglyagree"
                  className={"pt-inline"}
                />
              </RadioGroup>
            </div>
          </div>

          <div className="pt-form-group">
            <div className="pt-form-content">
              <RadioGroup
                name="askFeeling"
                label="Asked a lot of questions to understand why people felt the way they did."
                onChange={this.handleChange}
                selectedValue={askFeeling}
              >
                <Radio
                  label="Strongly Disagree"
                  value="stronglyDisagree"
                  className={"pt-inline"}
                />
                <Radio
                  label="Somewhat Disagree"
                  value="somewhatDisagree"
                  className={"pt-inline"}
                />
                <Radio
                  label="Neither Agree or Disagree"
                  value="neutral"
                  className={"pt-inline"}
                />

                <Radio
                  label="Somewhat Agree"
                  value="somewhatAgree"
                  className={"pt-inline"}
                />
                <Radio
                  label="Strongly Agree"
                  value="stronglyagree"
                  className={"pt-inline"}
                />
              </RadioGroup>
            </div>
          </div>

          <div className="pt-form-group">
            <div className="pt-form-content">
              <RadioGroup
                name="askConclusion"
                label="Asked how people arrived at their conclusions."
                onChange={this.handleChange}
                selectedValue={askConclusion}
              >
                <Radio
                  label="Strongly Disagree"
                  value="stronglyDisagree"
                  className={"pt-inline"}
                />
                <Radio
                  label="Somewhat Disagree"
                  value="somewhatDisagree"
                  className={"pt-inline"}
                />
                <Radio
                  label="Neither Agree or Disagree"
                  value="neutral"
                  className={"pt-inline"}
                />

                <Radio
                  label="Somewhat Agree"
                  value="somewhatAgree"
                  className={"pt-inline"}
                />
                <Radio
                  label="Strongly Agree"
                  value="stronglyagree"
                  className={"pt-inline"}
                />
              </RadioGroup>
            </div>
          </div>

          <div className="pt-form-group">
            <div className="pt-form-content">
              <RadioGroup
                name="askToExplain"
                label="Asked people to explain the rationales behind their opinions."
                onChange={this.handleChange}
                selectedValue={askToExplain}
              >
                <Radio
                  label="Strongly Disagree"
                  value="stronglyDisagree"
                  className={"pt-inline"}
                />
                <Radio
                  label="Somewhat Disagree"
                  value="somewhatDisagree"
                  className={"pt-inline"}
                />
                <Radio
                  label="Neither Agree or Disagree"
                  value="neutral"
                  className={"pt-inline"}
                />

                <Radio
                  label="Somewhat Agree"
                  value="somewhatAgree"
                  className={"pt-inline"}
                />
                <Radio
                  label="Strongly Agree"
                  value="stronglyagree"
                  className={"pt-inline"}
                />
              </RadioGroup>
            </div>
          </div>

          <div className="pt-form-group">
            <div className="pt-form-content">
              <RadioGroup
                name="usedSuggestion"
                label="Used my suggestions to improve his or her decisions."
                onChange={this.handleChange}
                selectedValue={usedSuggestion}
              >
                <Radio
                  label="Strongly Disagree"
                  value="stronglyDisagree"
                  className={"pt-inline"}
                />
                <Radio
                  label="Somewhat Disagree"
                  value="somewhatDisagree"
                  className={"pt-inline"}
                />
                <Radio
                  label="Neither Agree or Disagree"
                  value="neutral"
                  className={"pt-inline"}
                />

                <Radio
                  label="Somewhat Agree"
                  value="somewhatAgree"
                  className={"pt-inline"}
                />
                <Radio
                  label="Strongly Agree"
                  value="stronglyagree"
                  className={"pt-inline"}
                />
              </RadioGroup>
            </div>
          </div>

          <div className="pt-form-group">
            <div className="pt-form-content">
              <RadioGroup
                name="consideredOpinion"
                label="Considered my opinions when making important decisions."
                onChange={this.handleChange}
                selectedValue={consideredOpinion}
              >
                <Radio
                  label="Strongly Disagree"
                  value="stronglyDisagree"
                  className={"pt-inline"}
                />
                <Radio
                  label="Somewhat Disagree"
                  value="somewhatDisagree"
                  className={"pt-inline"}
                />
                <Radio
                  label="Neither Agree or Disagree"
                  value="neutral"
                  className={"pt-inline"}
                />

                <Radio
                  label="Somewhat Agree"
                  value="somewhatAgree"
                  className={"pt-inline"}
                />
                <Radio
                  label="Strongly Agree"
                  value="stronglyagree"
                  className={"pt-inline"}
                />
              </RadioGroup>
            </div>
          </div>

          <div className="pt-form-group">
            <div className="pt-form-content">
              <RadioGroup
                name="adoptToFix"
                label="Adopted my suggestions to fix errors and mistakes."
                onChange={this.handleChange}
                selectedValue={adoptToFix}
              >
                <Radio
                  label="Strongly Disagree"
                  value="stronglyDisagree"
                  className={"pt-inline"}
                />
                <Radio
                  label="Somewhat Disagree"
                  value="somewhatDisagree"
                  className={"pt-inline"}
                />
                <Radio
                  label="Neither Agree or Disagree"
                  value="neutral"
                  className={"pt-inline"}
                />

                <Radio
                  label="Somewhat Agree"
                  value="somewhatAgree"
                  className={"pt-inline"}
                />
                <Radio
                  label="Strongly Agree"
                  value="stronglyagree"
                  className={"pt-inline"}
                />
              </RadioGroup>
            </div>
          </div>

          <button type="submit" className="pt-button pt-intent-primary">
            Submit
            <span className="pt-icon-standard pt-icon-key-enter pt-align-right" />
          </button>
        </form>{" "}
      </div>
    )
  }
}

// componentWillMount() {}

//   render() {
//     const { player, game } = this.props
//     return (
//       <Centered>
//         <div className="exit-survey">
//           {this.exitMessage(player, game)}
//           <hr />
//           {this.exitForm()}
//         </div>
//       </Centered>
//     )
//   }
// }
