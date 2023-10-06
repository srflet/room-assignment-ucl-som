import React, { Component } from 'react';
import Timer from '../../../general/timer/Timer';
import { MyProfile } from '../../../general/information-line/InformationLine';


// Show the participants profile (name and avatar)
// Show the timer
// Show which page they are at / max

export default class Heading extends Component {
    render() {
        const { currentPage, max, player, round, stage } = this.props;

        return (
            <div>
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: "5px" }}>
                    <MyProfile player={player} hideCheck={true} />
                    <Timer round={round} stage={stage} player={player} />
                    {stage.name === "personalised_instructions" &&
                        <div>
                            <p style={{ margin: "0" }}><strong>Page:</strong></p>
                            <p style={{ textAlign: "center" }}>{currentPage} / {max}</p>
                        </div>
                    }
                </div>
            </div>
        )
    }
}