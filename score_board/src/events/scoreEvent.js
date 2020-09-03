const SECOND_INNINGS = "SECOND_INNINGS";

const JOIN_MATCH = "join_room";
const SCORE_CHANGE_FROM_SERVER = "SCORE_CHANGE_FROM_SERVER";
const SCORE_CHANGE_FROM_CLIENT = "SCORE_CHANGE_FROM_CLIENT";
const WICKET_CHANGE_FROM_CLIENT = "WICKET_CHANGE_FROM_CLIENT";
const WICKET_CHANGE_FROM_SERVER = "WICKET_CHANGE_FROM_SERVER";
const OVER_CHANGE_FROM_CLIENT = "OVER_CHANGE_FROM_CLIENT";
const OVER_CHANGE_FROM_SERVER = "OVER_CHANGE_FROM_SERVER";

const matchId = localStorage.getItem("match_id");

export function sendScore(value, socket) {
  socket.emit(JOIN_MATCH, matchId);

  socket.emit(SCORE_CHANGE_FROM_CLIENT, {
    value,
    matchId
  });
}

export function sendWicket(value, socket) {
  socket.emit(JOIN_MATCH, matchId);
  socket.emit(WICKET_CHANGE_FROM_CLIENT, { value, matchId });
}

export function sendOver(value, socket) {
  socket.emit(JOIN_MATCH, matchId);
  socket.emit(OVER_CHANGE_FROM_CLIENT, { value, matchId });
}

export function listenScoreChange(component, socket) {
  socket.emit(JOIN_MATCH, matchId);

  socket.on(SCORE_CHANGE_FROM_SERVER, value => {
    console.log(`${SCORE_CHANGE_FROM_SERVER}: ${value}`);

    if (component.state.status === SECOND_INNINGS) {
      component.setState({ team2Run: value });
    } else {
      component.setState({ team1Run: value });
    }
  });

  socket.on(OVER_CHANGE_FROM_SERVER, value => {
    console.log(`${OVER_CHANGE_FROM_SERVER}: ${value}`);

    if (component.state.status === SECOND_INNINGS) {
      component.setState({ team2Over: value });
    } else {
      component.setState({ team1Over: value });
    }
  });

  socket.on(WICKET_CHANGE_FROM_SERVER, value => {
    console.log(`${WICKET_CHANGE_FROM_SERVER}: ${value}`);

    if (component.state.status === SECOND_INNINGS) {
      component.setState({ team2Wicket: value });
    } else {
      component.setState({ team1Wicket: value });
    }
  });
}
