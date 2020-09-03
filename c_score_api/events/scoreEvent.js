const logger = require("../startup/logging");
const { Match } = require("../models/match");

const SECOND_INNINGS = "SECOND_INNINGS";
const FIRST_INNINGS = "FIRST_INNINGS";
const NOT_STARTED = "NOT_STARTED";
const END = "END";

const SCORE_CHANGE_FROM_SERVER = "SCORE_CHANGE_FROM_SERVER";
const SCORE_CHANGE_FROM_CLIENT = "SCORE_CHANGE_FROM_CLIENT";
const WICKET_CHANGE_FROM_CLIENT = "WICKET_CHANGE_FROM_CLIENT";
const WICKET_CHANGE_FROM_SERVER = "WICKET_CHANGE_FROM_SERVER";
const OVER_CHANGE_FROM_CLIENT = "OVER_CHANGE_FROM_CLIENT";
const OVER_CHANGE_FROM_SERVER = "OVER_CHANGE_FROM_SERVER";

module.exports.onScoreChange = (socket, io, matches) => {
  socket.on(SCORE_CHANGE_FROM_CLIENT, async ({ value, matchId }) => {
    logger.info(`${SCORE_CHANGE_FROM_CLIENT}: ${value}, match: ${matchId}`);
    let match = matches.get(matchId);

    if (!match) {
      logger.info("Calling data base to get match");
      match = await Match.findById(matchId);

      if (match.status === FIRST_INNINGS || match.status === SECOND_INNINGS)
        matches.set(matchId, match);
      else {
        logger.error("Match is not live.", matchId);
        return;
      }
    }

    if (match.status === SECOND_INNINGS) {
      match.team2.run += value;
      matches.set(matchId, match);
      io.to(matchId).emit(SCORE_CHANGE_FROM_SERVER, match.team2.run);
    } else {
      match.team1.run += value;
      matches.set(matchId, match);
      io.to(matchId).emit(SCORE_CHANGE_FROM_SERVER, match.team1.run);
    }
  });
};

module.exports.onOverChange = (socket, io, matches) => {
  socket.on(OVER_CHANGE_FROM_CLIENT, async ({ value, matchId }) => {
    logger.info(`${OVER_CHANGE_FROM_CLIENT}: ${value}, match: ${matchId}`);
    let match = matches.get(matchId);

    if (!match) {
      match = await Match.findById(matchId);

      if (!match) {
        logger.error(`The match with the given ID was not found: ${matchId}`);
        return;
      }

      if (match.status === NOT_STARTED || match.status === END) {
        logger.error(`Match is not live: ${matchId}`);
        return;
      }
    }

    if (match.status === FIRST_INNINGS) {
      match.team1.over = formatOver(match.team1.over, value);
      matches.set(matchId, match);
      io.to(matchId).emit(OVER_CHANGE_FROM_SERVER, match.team1.over);
    } else {
      match.team2.over = formatOver(match.team2.over, value);
      matches.set(matchId, match);
      io.to(matchId).emit(OVER_CHANGE_FROM_SERVER, match.team2.over);
    }
  });
};

module.exports.onWicketChange = (socket, io, matches) => {
  socket.on(WICKET_CHANGE_FROM_CLIENT, async ({ value, matchId }) => {
    logger.info(`${WICKET_CHANGE_FROM_CLIENT}: ${value}, match: ${matchId}`);
    let match = matches.get(matchId);

    if (!match) {
      match = await Match.findById(matchId);

      if (!match) {
        logger.info(`The match with the given ID was not found: ${matchId}`);
      }

      if (match.status === NOT_STARTED || match.status === END) {
        logger.info(`Match is not live: ${matchId}`);
      }
    }

    if (match.status === FIRST_INNINGS) {
      match.team1.wicket += value;
      io.to(matchId).emit(WICKET_CHANGE_FROM_SERVER, match.team1.wicket);
      matches.set(matchId, match);
    } else {
      match.team2.wicket += value;
      console.log(match.team2.wicket);
      io.to(matchId).emit(WICKET_CHANGE_FROM_SERVER, match.team2.wicket);
      matches.set(matchId, match);
    }
  });
};

formatOver = (current, value) => {
  const whole = current.toString().split(".")[0];
  let decimal = current.toString().split(".")[1];

  if (decimal === undefined) decimal = 0;

  const totalBalls = parseInt(whole) * 6 + parseInt(decimal) + value;

  const quotient = Math.floor(totalBalls / 6);
  const remainder = totalBalls % 6;

  const overs = quotient + remainder / 10;

  return overs;
};
