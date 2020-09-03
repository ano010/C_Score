import React, { Component } from "react";

const NOT_STARTED = "NOT_STARTED";
const END = "END";
const FIRST_INNINGS = "FIRST_INNINGS";
const SECOND_INNINGS = "SECOND_INNINGS";

class ScoreKeyBoard extends Component {
  disableKey = () => {
    const { status } = this.props;
    return status === NOT_STARTED || status === END;
  };

  disableDecrement = () => {
    const { status, team1Run, team2Run } = this.props;

    if (status === FIRST_INNINGS) return team1Run === 0;

    if (status === SECOND_INNINGS) return team2Run === 0;

    return false;
  };

  render() {
    const {
      onIncrement,
      on2,
      on3,
      on4,
      on5,
      on6,
      onDecrement,
      onWicketIncrease,
      onWicketDecrease,
      onOverIncrease,
      onOverDecrease
    } = this.props;
    return (
      <div className="card">
        <div className="card-body text-center">
          <button
            onClick={onOverIncrease}
            className="btn btn-secondary btn-sm m-2"
            disabled={this.disableKey()}
          >
            B+
          </button>

          <button
            onClick={onOverDecrease}
            className="btn btn-secondary btn-sm m-2"
            disabled={this.disableKey() || this.disableOverDecrement()}
          >
            B-
          </button>

          <button
            onClick={onWicketIncrease}
            className="btn btn-secondary btn-sm m-2"
            disabled={this.disableKey() || this.disableWicketIncrement()}
          >
            W+
          </button>
          <button
            onClick={onWicketDecrease}
            className="btn btn-secondary btn-sm m-2"
            disabled={this.disableKey() || this.disableWicketDecrement()}
          >
            W-
          </button>
          <button
            onClick={onIncrement}
            className="btn btn-secondary btn-sm m-2"
            disabled={this.disableKey()}
          >
            +
          </button>

          <button
            onClick={on2}
            className="btn btn-secondary btn-sm m-2"
            disabled={this.disableKey()}
          >
            2
          </button>
          <button
            onClick={on3}
            className="btn btn-secondary btn-sm m-2"
            disabled={this.disableKey()}
          >
            3
          </button>
          <button
            onClick={on4}
            className="btn btn-secondary btn-sm m-2"
            disabled={this.disableKey()}
          >
            4
          </button>
          <button
            onClick={on5}
            className="btn btn-secondary btn-sm m-2"
            disabled={this.disableKey()}
          >
            5
          </button>
          <button
            onClick={on6}
            className="btn btn-secondary btn-sm m-2"
            disabled={this.disableKey()}
          >
            6
          </button>
          <button
            disabled={this.disableKey() || this.disableDecrement()}
            onClick={onDecrement}
            className="btn btn-secondary btn-sm m-2"
          >
            -
          </button>
        </div>
      </div>
    );
  }

  disableWicketIncrement = () => {
    const { status, team1Wicket, team2Wicket } = this.props;
    if (status === FIRST_INNINGS && team1Wicket >= 10) return true;
    if (status === SECOND_INNINGS && team2Wicket >= 10) return true;
  };

  disableWicketDecrement = () => {
    const { status, team1Wicket, team2Wicket } = this.props;
    if (status === FIRST_INNINGS && team1Wicket <= 0) return true;
    if (status === SECOND_INNINGS && team2Wicket <= 0) return true;
  };

  disableOverDecrement = () => {
    const { status, team1Over, team2Over } = this.props;
    if (status === FIRST_INNINGS && team1Over <= 0) return true;
    if (status === SECOND_INNINGS && team2Over <= 0) return true;
    return false;
  };
}

export default ScoreKeyBoard;
