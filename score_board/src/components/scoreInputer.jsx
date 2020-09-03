import React, { Component } from "react";
import ScoreBoard from "./scoreBoard";
import ScoreKeyBoard from "./scoreKeyBoard";
import MyModal from "./common/myModal";
import socketIOClient from "socket.io-client";
import {
  InitializeMatch,
  startMatch,
  endMatch,
  sendFirstBattingTeam
} from "../events/matchEvent";
import { startSecondInnings } from "../events/matchEvent";
import {
  sendScore,
  sendWicket,
  sendOver,
  listenScoreChange
} from "../events/scoreEvent";
import StatusKey from "./statusKey";

const apiEndpoint = process.env.REACT_APP_API_URL;

const NOT_STARTED = "NOT_STARTED";

const TOSS_WON_TEAM_FROM_CLIENT = "TOSS_WON_TEAM_FROM_CLIENT";

class ScoreInputer extends Component {
  state = {
    matchId: localStorage.getItem("match_id"),
    status: NOT_STARTED,
    isTossWonTeamSelectionModalOpen: true,
    isFirstBattingSelectionModalOpen: false,
    socket: socketIOClient(apiEndpoint)
  };

  async componentDidMount() {
    const matchId = localStorage.getItem("match_id");

    // Initialize match
    InitializeMatch(matchId, this, this.state.socket);

    // Listen for score change
    listenScoreChange(this, this.state.socket);
  }

  componentWillUnmount() {
    this.state.socket.disconnect();
  }

  handleIncrement = () => {
    sendScore(1, this.state.socket);
  };

  handle2 = () => {
    sendScore(2, this.state.socket);
  };

  handle3 = () => {
    sendScore(3, this.state.socket);
  };

  handle4 = () => {
    sendScore(4, this.state.socket);
  };

  handle5 = () => {
    sendScore(5, this.state.socket);
  };

  handle6 = () => {
    sendScore(6, this.state.socket);
  };

  handleDecrement = () => {
    sendScore(-1, this.state.socket);
  };

  handleStart = () => {
    startMatch(this.state.socket);
  };

  handleEnd = () => {
    endMatch(this.state.socket);
  };

  handle2ndInnings = () => {
    startSecondInnings(this.state.socket);
  };

  handleTossModalKey1 = () => {
    this.setState({
      isTossWonTeamSelectionModalOpen: !this.state
        .isTossWonTeamSelectionModalOpen
    });
    this.setState({
      isFirstBattingSelectionModalOpen: !this.state
        .isFirstBattingSelectionModalOpen
    });

    this.state.socket.emit(TOSS_WON_TEAM_FROM_CLIENT, {
      matchId: this.state.matchId,
      team: this.state.team1Name
    });
  };

  handleTossModalKey2 = () => {
    this.setState({
      isTossWonTeamSelectionModalOpen: !this.state
        .isTossWonTeamSelectionModalOpen
    });
    this.setState({
      isFirstBattingSelectionModalOpen: !this.state
        .isFirstBattingSelectionModalOpen
    });

    this.state.socket.emit(TOSS_WON_TEAM_FROM_CLIENT, {
      matchId: this.state.matchId,
      team: this.state.team2Name
    });
  };

  handleFirstBattingModalKey1 = () => {
    this.setState({
      isFirstBattingSelectionModalOpen: !this.state
        .isFirstBattingSelectionModalOpen
    });

    sendFirstBattingTeam(this.state.team1Name, this.state.socket);
  };

  handleFirstBattingModalKey2 = () => {
    this.setState({
      isFirstBattingSelectionModalOpen: !this.state
        .isFirstBattingSelectionModalOpen
    });

    sendFirstBattingTeam(this.state.team2Name, this.state.socket);
  };

  handleWicketIncreament = () => {
    sendWicket(1, this.state.socket);
  };

  handleWicketDecreament = () => {
    sendWicket(-1, this.state.socket);
  };

  hanleOverIncrement = () => {
    sendOver(1, this.state.socket);
  };

  handleOverDecrement = () => {
    sendOver(-1, this.state.socket);
  };

  handleOver;

  render() {
    const {
      matchName,
      status,
      tossWonBy,
      team1Name,
      team2Name,
      team1Run,
      team2Run,
      team1Wicket,
      team2Wicket,
      team1Over,
      team2Over
    } = this.state;
    return (
      <main>
        <MyModal
          isOpen={
            this.state.isTossWonTeamSelectionModalOpen && status === NOT_STARTED
          }
          header={"Toss"}
          body={"Select which team won the toss."}
          key1={team1Name}
          key2={team2Name}
          onKey1={this.handleTossModalKey1}
          onKey2={this.handleTossModalKey2}
        ></MyModal>

        <MyModal
          isOpen={
            this.state.isFirstBattingSelectionModalOpen &&
            status === NOT_STARTED
          }
          header={"First Batting Team Selcection"}
          body={"Select which team bats first."}
          key1={team1Name}
          key2={team2Name}
          onKey1={this.handleFirstBattingModalKey1}
          onKey2={this.handleFirstBattingModalKey2}
        />

        <ScoreBoard
          matchName={matchName}
          status={status}
          tossWonBy={tossWonBy}
          team1Name={team1Name}
          team2Name={team2Name}
          team1Run={team1Run}
          team2Run={team2Run}
          team1Wicket={team1Wicket}
          team2Wicket={team2Wicket}
          team1Over={team1Over}
          team2Over={team2Over}
        />
        <ScoreKeyBoard
          status={status}
          team1Run={team1Run}
          team2Run={team2Run}
          team1Wicket={team1Wicket}
          team2Wicket={team2Wicket}
          team1Over={team1Over}
          team2Over={team2Over}
          onIncrement={this.handleIncrement}
          on2={this.handle2}
          on3={this.handle3}
          on4={this.handle4}
          on5={this.handle5}
          on6={this.handle6}
          onDecrement={this.handleDecrement}
          onWicketIncrease={this.handleWicketIncreament}
          onWicketDecrease={this.handleWicketDecreament}
          onOverIncrease={this.hanleOverIncrement}
          onOverDecrease={this.handleOverDecrement}
        />

        <StatusKey
          onStart={this.handleStart}
          onSecondInnings={this.handle2ndInnings}
          status={status}
          onEnd={this.handleEnd}
        />
      </main>
    );
  }
}

export default ScoreInputer;
