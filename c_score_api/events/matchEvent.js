const { onJoinMatch, onMatchDetails } = require("../events/joinEvent");
const {
  onScoreChange,
  onOverChange,
  onWicketChange
} = require("../events/scoreEvent");
const {
  onMatchStartFromClient,
  onMatchEndFromClient,
  onMatchSecondInnigsFromClient,
  onTossWonTeam,
  onBattingTeam
} = require("../events/statusEvent");

// Live matches
const matches = new Map();

function listenEvents(socket, io) {
  onJoinMatch(socket, matches);

  onTossWonTeam(socket, io, matches);

  onBattingTeam(socket, io, matches);

  onMatchDetails(socket, matches);

  onMatchStartFromClient(socket, io, matches);

  onMatchEndFromClient(socket, io, matches);

  onMatchSecondInnigsFromClient(socket, io, matches);

  onScoreChange(socket, io, matches);

  onOverChange(socket, io, matches);

  onWicketChange(socket, io, matches);
}

module.exports.listenEvents = listenEvents;
