import React, { Component } from "react";
import { Row, Col } from "reactstrap";

class Match extends Component {
  state = {
    match: this.props._match,
    name: this.props._match.name,
    id: this.props._match._id
  };

  handleGoLive = () => {
    const { id } = this.state;

    localStorage.setItem("match_id", id);

    this.props.history.push(`/scoreboard/${id}`);
  };

  handlEdit = () => {
    this.props.history.push(`/matches/${this.state.id}`);
  };

  render() {
    console.log(this.props.match1);
    const { onDelete } = this.props;
    return (
      <div className="card m-2">
        <div className="card-body">
          <h5 className="card-title">{this.state.name}</h5>

          <p className="card-text text-center">
            <small className="text-muted">Last updated 3 mins ago</small>
          </p>

          <Row>
            <Col className="text-left">
              <button
                onClick={this.handleGoLive}
                className="btn btn-primary m-2"
              >
                Live
              </button>
              <button onClick={this.handlEdit} className="btn btn-primary m-2">
                Edit
              </button>
              <button
                onClick={() => onDelete(this.state.match)}
                className="btn btn-primary m-2"
              >
                Delete
              </button>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default Match;
