export function startMatch() {
  socket.emit(JOIN_MATCH, matchId);

  socket.emit(MATCH_START_FROM_CLIENT, matchId);
}

export function endMatch() {
  socket.emit(JOIN_MATCH, matchId);

  socket.emit(MATCH_END_FROM_CLIENT, matchId);
}

export function startSecondInnings() {
  socket.emit(JOIN_MATCH, matchId);

  socket.emit(MATCH_SECOND_INNINGS_FROM_CLIENT, matchId);
}

export function sendFirstBattingTeam(team) {
  socket.emit(FIRST_BATTING_TEAM_FROM_CLIENT, {
    matchId,
    team
  });
}
