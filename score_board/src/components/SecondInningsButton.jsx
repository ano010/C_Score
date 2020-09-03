import React, { Component } from "react";
import MyModal from "./common/myModal";
import socketIoClient from "socket.io-client";

const FIRST_INNINGS = "FIRST_INNINGS";

const MATCH_SECOND_INNINGS_FROM_CLIENT = "MATCH_SECOND_INNINGS_FROM_CLIENT";

const socket = socketIoClient(process.env.REACT_APP_API_URL);

class SecondInningsButton extends Component {
  state = {
    isStartSecondInningsModalOpen: false
  };

  toggleStartSecondInningsModel = () => {
    this.setState({
      isStartSecondInningsModalOpen: !this.state.isStartSecondInningsModalOpen
    });
  };

  getBody = () => {
    return "This will start second innings. Aru you sure want to continue?";
  };

  getHeader = () => {
    return "2nd Innings";
  };

  getAction = () => {
    return "yes";
  };

  getDismiss = () => {
    return "No";
  };

  handleAction = () => {
    this.setState({
      isStartSecondInningsModalOpen: !this.state.isStartSecondInningsModalOpen
    });
    socket.emit(
      MATCH_SECOND_INNINGS_FROM_CLIENT,
      localStorage.getItem("match_id")
    );
  };

  render() {
    const { status } = this.props;
    return (
      <React.Fragment>
        <button
          onClick={this.toggleStartSecondInningsModel}
          className="btn btn-secondary active btn-sm m-2"
          disabled={status !== FIRST_INNINGS}
        >
          2nd Innings
        </button>
        <MyModal
          isOpen={this.state.isStartSecondInningsModalOpen}
          header={this.getHeader()}
          body={this.getBody()}
          key1={this.getAction()}
          key2={this.getDismiss()}
          onKey1={this.handleAction}
          onKey2={this.toggleStartSecondInningsModel}
        />
      </React.Fragment>
    );
  }
}

export default SecondInningsButton;
