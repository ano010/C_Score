import React, { Component } from "react";

class Status extends Component {
  render() {
    return (
      <div className="text-right align-items-center">
        <div
          className="spinner-grow spinner-grow-sm text-success"
          role="status"
        ></div>
        <span className="badge badge-pill badge-light m-2">Live</span>
      </div>
    );
  }
}

export default Status;
