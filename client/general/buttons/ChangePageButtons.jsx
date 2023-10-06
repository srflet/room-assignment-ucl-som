import React, { Component } from 'react'

// Buttons that allow players to navigate through paged components
// The pageDbIndex must be set in the server/main.js with the min for a start.
// It is a variable set to the player that allows us to tell the player on which page
// they should be and render that page for them: player.get(pageDbIndex)

export default class ChangePageButtons extends Component {

    // Decrement page
    previous = () => {
        const { player, pageDbIndex } = this.props;
        let currentPage = player.get(pageDbIndex);
        currentPage--;
        player.set(pageDbIndex, currentPage);
    }

    // Increment page
    next = () => {
        const { player, pageDbIndex, max } = this.props;
        let currentPage = player.get(pageDbIndex);
        currentPage++;

        if (currentPage > max) {
            player.stage.submit();
        } else {
            player.set(pageDbIndex, currentPage);
        }
    }

    render() {
        const { player, pageDbIndex, min, disabledCondition, altText } = this.props;

        // If there is not alternative text for the next button propose, use "Next"
        const nextButtonText = altText ?? "Next"

        // Get the current page - can't go back if the currentPage is equal to the minimum so disable previous button
        let currentPage = player.get(pageDbIndex);

        // Disable next button based on the disabledCondition passed down in the props. If it is disabled, show a small 
        // red text message telling participants to answer all the questions.

        return (
            <>
                {disabledCondition &&
                    <p style={disabledConditionMessage} className="justify-center">
                        Please answer all the questions to continue
                    </p>
                }
                <p className="button-holder">
                    <button onClick={this.previous} disabled={currentPage === min}>Previous</button>
                &emsp;
                <button onClick={this.next} disabled={disabledCondition}>{nextButtonText}</button>
                </p>
            </>
        )
    }
}

// Styling
const disabledConditionMessage = {
    fontSize: "10pt"
    , color: "red"
    , marginTop: "20px"
}