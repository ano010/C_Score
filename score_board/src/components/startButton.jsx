import React, { Component } from "react";
import MyModal from "./common/myModal";
import socketIoClient from "socket.io-client";

const FIRST_INNINGS = "FIRST_INNINGS";
const SECOND_INNINGS = "SECOND_INNINGS";

const MATCH_START_FROM_CLIENT = "match_start_from_client";

const socket = socketIoClient(process.env.REACT_APP_API_URL);

class StartButton extends Component {
  state = {
    isStartModalOpen: false
  };

  toggleStartModel = () => {
    this.setState({ isStartModalOpen: !this.state.isStartModalOpen });
  };

  getBody = () => {
    return "This will set the match live. Aru you sure want to continue?";
  };

  getHeader = () => {
    return "Live";
  };

  getAction = () => {
    return "yes";
  };

  getDismiss = () => {
    return "No";
  };

  handleAction = () => {
    this.setState({ isStartModalOpen: !this.state.isStartModalOpen });
    socket.emit(MATCH_START_FROM_CLIENT, localStorage.getItem("match_id"));
  };

  render() {
    const { status } = this.props;
    return (
      <React.Fragment>
        <button
          onClick={this.toggleStartModel}
          className="btn btn-success active btn-sm m-2"
          disabled={status === FIRST_INNINGS || status === SECOND_INNINGS}
        >
          Start
        </button>
        <MyModal
          isOpen={this.state.isStartModalOpen}
          header={this.getHeader()}
          body={this.getBody()}
          key1={this.getAction()}
          key2={this.getDismiss()}
          onKey1={this.handleAction}
          onKey2={this.toggleStartModel}
        />
      </React.Fragment>
    );
  }
}

export default StartButton;
