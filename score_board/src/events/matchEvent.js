const JOIN_MATCH = "join_room";
const MATCH_START_FROM_CLIENT = "match_start_from_client";
const MATCH_START_FROM_SERVER = "match_start_from_server";
const MATCH_END_FROM_SERVER = "match_end_from_server";
const MATCH_END_FROM_CLIENT = "match_end_from_client";
const MATCH_SECOND_INNINGS_FROM_CLIENT = "MATCH_SECOND_INNINGS_FROM_CLIENT";
const MATCH_SECOND_INNINGS_FROM_SERVER = "MATCH_SECOND_INNINGS_FROM_SERVER";
const TOSS_WON_TEAM_FROM_SERVER = "TOSS_WON_TEAM_FROM_SERVER";
const FIRST_BATTING_TEAM_FROM_CLIENT = "FIRST_BATTING_TEAM_FROM_CLIENT";
const MATCH_DETAILS_FROM_SERVER = "MATCH_DETAILS_FROM_SERVER";
const MATCH_DETAILS_FROM_CLIENT = "MATCH_DETAILS_FROM_CLIENT";

const matchId = localStorage.getItem("match_id");

export function InitializeMatch(roomId, component, socket) {
  socket.emit(JOIN_MATCH, roomId);

  socket.emit(MATCH_DETAILS_FROM_CLIENT, { room: roomId, matchId: roomId });

  socket.on(MATCH_DETAILS_FROM_SERVER, data => {
    console.log(`${MATCH_DETAILS_FROM_SERVER}: ${data._id}`);
    component.setState({
      matchName: data.name,
      status: data.status,
      team1Name: data.team1.name,
      team2Name: data.team2.name,
      team1Run: data.team1.run,
      team2Run: data.team2.run,
      team1Wicket: data.team1.wicket,
      team2Wicket: data.team2.wicket,
      team1Over: data.team1.over,
      team2Over: data.team2.over
    });
  });

  socket.on(MATCH_START_FROM_SERVER, status => {
    component.setState({ status });
    console.log(MATCH_START_FROM_SERVER, status, roomId);
  });

  socket.on(MATCH_SECOND_INNINGS_FROM_SERVER, status => {
    component.setState({ status });
    console.log(MATCH_SECOND_INNINGS_FROM_SERVER, status, roomId);
  });

  socket.on(MATCH_END_FROM_SERVER, status => {
    component.setState({ status });
    console.log(MATCH_END_FROM_SERVER, status, roomId);
  });

  socket.on(TOSS_WON_TEAM_FROM_SERVER, team => {
    component.setState({ tossWonBy: team });
    console.log(TOSS_WON_TEAM_FROM_SERVER, team, roomId);
  });
}

export function startMatch(socket) {
  socket.emit(JOIN_MATCH, matchId);

  socket.emit(MATCH_START_FROM_CLIENT, matchId);
}

export function endMatch(socket) {
  socket.emit(JOIN_MATCH, matchId);

  socket.emit(MATCH_END_FROM_CLIENT, matchId);
}

export function startSecondInnings(socket) {
  socket.emit(JOIN_MATCH, matchId);

  socket.emit(MATCH_SECOND_INNINGS_FROM_CLIENT, matchId);
}

export function sendFirstBattingTeam(team, socket) {
  socket.emit(JOIN_MATCH, matchId);

  socket.emit(FIRST_BATTING_TEAM_FROM_CLIENT, {
    matchId,
    team
  });
}
