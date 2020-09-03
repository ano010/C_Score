import React, { Component } from "react";
import MyModal from "./common/myModal";
import socketIoClient from "socket.io-client";

const END = "END";

const MATCH_END_FROM_CLIENT = "match_end_from_client";

const socket = socketIoClient(process.env.REACT_APP_API_URL);

class EndButton extends Component {
  state = {
    isEndModal: false
  };

  toggleEndModel = () => {
    this.setState({
      isEndModal: !this.state.isEndModal
    });
  };

  getBody = () => {
    return "This will end the match. Aru you sure want to continue?";
  };

  getHeader = () => {
    return "End";
  };

  getAction = () => {
    return "yes";
  };

  getDismiss = () => {
    return "No";
  };

  handleAction = () => {
    this.setState({
      isEndModal: !this.state.isEndModal
    });
    socket.emit(MATCH_END_FROM_CLIENT, localStorage.getItem("match_id"));
  };

  render() {
    const { status } = this.props;
    return (
      <React.Fragment>
        <button
          onClick={this.toggleEndModel}
          className="btn btn-danger active btn-sm m-2"
          disabled={status === END}
        >
          End
        </button>
        <MyModal
          isOpen={this.state.isEndModal}
          header={this.getHeader()}
          body={this.getBody()}
          key1={this.getAction()}
          key2={this.getDismiss()}
          onKey1={this.handleAction}
          onKey2={this.toggleEndModel}
        />
      </React.Fragment>
    );
  }
}

export default EndButton;
