import React, { Component } from "react";
import StartButton from "./startButton";
import SecondInningsButton from "./SecondInningsButton";
import EndButton from "./endButton";

class StatusKey extends Component {
  render() {
    const { status } = this.props;
    return (
      <React.Fragment>
        <div className="container">
          <div className="row">
            <div className="col text-left">
              <StartButton status={status} />
            </div>

            <div className="col text-center">
              <SecondInningsButton status={status} />
            </div>

            <div className="col text-right">
              <EndButton status={status} />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default StatusKey;
