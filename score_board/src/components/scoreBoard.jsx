import React, { Component } from "react";
import Status from "./common/status";
import { Container, Row, Col } from "reactstrap";

const FIRST_INNINGS = "FIRST_INNINGS";
const SECOND_INNINGS = "SECOND_INNINGS";
const NOT_STARTED = "NOT_STARTED";
const END = "END";

class ScoreBoard extends Component {
  state = {
    isFirstBattingSelectionModalOpen: true
  };

  render() {
    const {
      status,
      team1Name,
      team2Name,
      team1Run,
      team1Wicket,
      team1Over
    } = this.props;
    return (
      <Container fluid className="card">
        <Row className="card-header">
          {team1Name} vs {team2Name}
        </Row>
        <Row>
          <Col>
            <small>Fri, 1/31, 12.30</small>
          </Col>
          <Col className="text-right">
            {(status === FIRST_INNINGS || status === SECOND_INNINGS) && (
              <Status />
            )}
          </Col>
        </Row>
        <Row className="card-body no-gutters">
          <Col xs="5" className="text-center">
            <Row className="no-gutters">
              <Col xs="4" className="text-center">
                <span className="badge badge-primary badge-sm">
                  {team1Name}{" "}
                </span>
              </Col>
              <Col xs="8" className="text-center">
                {team1Run}/{team1Wicket} ({team1Over})
              </Col>
            </Row>
          </Col>

          <Col xs="2" className="text-center">
            <small>1st</small>
          </Col>
          <Col xs="5">
            <Row className="no-gutters">
              <Col xs="8" className="text-center">
                {this.formatTeam2()}
              </Col>
              <Col xs="4" className="text-center">
                <span className="badge badge-primary">{team2Name} </span>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row className="card-body">
          <Col xs="12" className="text-center">
            <small>{this.formatDescription()}</small>
          </Col>
        </Row>
      </Container>
    );
  }

  formatTeam2 = () => {
    const { status, team2Run, team2Wicket, team2Over } = this.props;

    if (status === NOT_STARTED || status === FIRST_INNINGS) {
      return <small>Yet to bat</small>;
    }
    return `${team2Run}/${team2Wicket} (${team2Over})`;
  };

  formatDescription = () => {
    const {
      status,
      tossWonBy,
      team1Name,
      team2Name,
      team1Run,
      team2Run,
      team2Wicket
    } = this.props;

    if (
      (status === NOT_STARTED || status === FIRST_INNINGS) &&
      tossWonBy === team1Name
    ) {
      return `${team1Name} chose to bat`;
    }

    if (
      (status === NOT_STARTED || status === FIRST_INNINGS) &&
      tossWonBy === team2Name
    ) {
      return `${team2Name} chose to ball`;
    }

    if (status === END) {
      if (team1Run > team2Run)
        return `${team1Name} won by ${team1Run - team2Run} runs`;
      else if (team1Run === team2Run) return "Tied";
      else return `${team2Name} won by ${10 - team2Wicket} wickets`;
    }
  };
}

export default ScoreBoard;
