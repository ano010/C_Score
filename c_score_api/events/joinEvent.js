const logger = require("../startup/logging");
const { Match } = require("../models/match");

const JOIN_MATCH = "join_room";
const MATCH_DETAILS_FROM_SERVER = "MATCH_DETAILS_FROM_SERVER";
const MATCH_DETAILS_FROM_CLIENT = "MATCH_DETAILS_FROM_CLIENT";

module.exports.onJoinMatch = socket => {
  socket.on(JOIN_MATCH, matchId => {
    socket.join(matchId);
    logger.info(`Client joined to match: ${matchId}, socket id: ${socket.id}`);
  });
};

module.exports.onMatchDetails = (socket, matches) => {
  socket.on(MATCH_DETAILS_FROM_CLIENT, async ({ matchId }) => {
    if (!matches.get(matchId)) {
      logger.info("Calling database to get match details");
      const match = await Match.findById(matchId);

      socket.emit(MATCH_DETAILS_FROM_SERVER, match);
      matches.set(matchId, match);
    } else {
      socket.emit(MATCH_DETAILS_FROM_SERVER, matches.get(matchId));
    }
  });
};
