import React from "react";

// QUIZ TO SEE IF PLAYERS UNDERSTAND THE BASICS OF THE GAME

export default class Quiz extends React.Component {
	state = { answer: "" };

	// Update the selected answer
	handleChange = e => {
		const radio = e.currentTarget;
		this.setState({ answer: radio.value });
	};

	// Submit answer
	handleSubmit = event => {
		event.preventDefault();

		const { player, onNext, stage } = this.props
		const { answer } = this.state

		// If there is no answer, alert the player
		if (answer === "") {
			alert("Please select an answer!")
		} else {
			player.set(`${stage.name}_quix`, answer);
			// Navigate to the next page
			player.stage.submit();
		}
	};

	render() {
		const { player } = this.props;
		const { answer } = this.state;

		const role = player.get("role")

		return (
			<div className="task">
					<div className="quiz">
						<h2> THIS IS A DUMMY QUIZ </h2>
						<p>Who are you</p>
						<form onSubmit={this.handleSubmit}>

							<div className="radio-list">
								<input
									type="radio"
									name="amCheck"
									value="am"
									onChange={this.handleChange}
									checked={answer === "am"}
								/>
								<span> I am {role}</span>
								<br />
							</div>
							<div className="radio-list">
								<input
									type="radio"
									name="notCheck"
									value="not"
									onChange={this.handleChange}
									checked={answer === "not"}
								/>
								<span> I am not {role === "Leader" ? "Follower" : "Leader" }</span>
								<br />
							</div>

							<p className="button-holder">
							<button
								type="button"
								className={`bp3-button bp3-icon-tick bp3-intent-success bp3-large ${
									player.get("satisfied") ? "" : "bp3-minimal"
								}`}
								onClick={this.handleSubmit}
								>
								Submit
							</button>
							</p>

						</form>
					</div>
			</div>
		);
	}
}
