const { Match } = require("../models/match");
const logger = require("../startup/logging");

const MATCH_START_FROM_CLIENT = "match_start_from_client";
const MATCH_START_FROM_SERVER = "match_start_from_server";
const MATCH_END_FROM_CLIENT = "match_end_from_client";
const MATCH_END_FROM_SERVER = "match_end_from_server";
const MATCH_SECOND_INNINGS_FROM_CLIENT = "MATCH_SECOND_INNINGS_FROM_CLIENT";
const MATCH_SECOND_INNINGS_FROM_SERVER = "MATCH_SECOND_INNINGS_FROM_SERVER";
const TOSS_WON_TEAM_FROM_CLIENT = "TOSS_WON_TEAM_FROM_CLIENT";
const TOSS_WON_TEAM_FROM_SERVER = "TOSS_WON_TEAM_FROM_SERVER";
const FIRST_BATTING_TEAM_FROM_CLIENT = "FIRST_BATTING_TEAM_FROM_CLIENT";
const MATCH_DETAILS_FROM_SERVER = "MATCH_DETAILS_FROM_SERVER";

const FIRST_INNINGS = "FIRST_INNINGS";
const SECOND_INNINGS = "SECOND_INNINGS";
const NOT_STARTED = "NOT_STARTED";
const END = "END";

module.exports.onMatchStartFromClient = (socket, io, matches) => {
  socket.on(MATCH_START_FROM_CLIENT, async matchId => {
    let match = matches.get(matchId);

    if (!match) {
      logger.info(`Calling data base to get match: ${matchId}`);
      match = await Match.findById(matchId);
    }

    match.status = FIRST_INNINGS;
    logger.info(`Match status updated: ${match.status} ${matchId}`);
    matches.set(matchId, match);

    await Match.findByIdAndUpdate(matchId, match);
    logger.info(`Match saved to data base: ${matchId}`);

    io.to(matchId).emit(MATCH_START_FROM_SERVER, match.status);
  });
};

module.exports.onMatchEndFromClient = (socket, io, matches) => {
  socket.on(MATCH_END_FROM_CLIENT, async matchId => {
    let match = matches.get(matchId);

    if (!match) {
      logger.info(`Calling data base to get the match: ${matchId}`);
      match = await Match.findById(matchId);
    }

    match.status = END;

    io.to(matchId).emit(MATCH_END_FROM_SERVER, END);

    matches.delete(matchId);
    logger.info(`Match removed from live list: ${matchId}`);

    match = await Match.findByIdAndUpdate(matchId, match, { new: true });
    logger.info(`Match saved to data base: ${matchId}`);
  });
};

module.exports.onMatchSecondInnigsFromClient = (socket, io, matches) => {
  socket.on(MATCH_SECOND_INNINGS_FROM_CLIENT, async matchId => {
    let match = matches.get(matchId);

    if (!match) {
      logger.info(`Calling database to get match: ${matchId}`);
      match = await Match.findById(matchId);
    }

    if (match.status === SECOND_INNINGS) {
      logger.error("Second innings already started");
      return;
    }

    match.status = SECOND_INNINGS;
    matches.set(matchId, match);
    logger.info(`Match status updated: ${match.status} ${matchId}`);

    io.to(matchId).emit(MATCH_SECOND_INNINGS_FROM_SERVER, SECOND_INNINGS);

    await Match.findByIdAndUpdate(matchId, match);
    logger.info(`Match saved to database: ${matchId}`);
  });
};

module.exports.onBattingTeam = (socket, io, matches) => {
  socket.on(FIRST_BATTING_TEAM_FROM_CLIENT, async ({ matchId, team }) => {
    logger.info(`${FIRST_BATTING_TEAM_FROM_CLIENT}: ${team}, ${matchId}`);

    let match = matches.get(matchId);

    if (!match) {
      logger.info(`Calling data base to get match details: ${matchId}`);
      match = await Match.findById(matchId);
    }

    let team1 = match.team1;
    let team2 = match.team2;

    if (team === team1.name) {
      logger.info(`${team} bats first.`);
      matches.set(matchId, match);
      return;
    }

    const team3 = team1;
    team1 = team2;
    team2 = team3;

    match.team1 = team1;
    match.team2 = team2;
    logger.info(`${team} bats first`);
    await Match.findByIdAndUpdate(matchId, match);

    matches.set(matchId, match);

    io.to(matchId).emit(MATCH_DETAILS_FROM_SERVER, match);
  });
};

module.exports.onTossWonTeam = (socket, io, matches) => {
  socket.on(TOSS_WON_TEAM_FROM_CLIENT, async ({ matchId, team }) => {
    logger.info(`${TOSS_WON_TEAM_FROM_CLIENT}: ${team}, match: ${matchId}`);

    let match = matches.get(matchId);

    if (!match) {
      match = await Match.findById(matchId);
    }

    match.tossWonBy = team;
    matches.set(matchId, match);
    await Match.findByIdAndUpdate(matchId, { tossWonBy: team });

    io.to(matchId).emit(TOSS_WON_TEAM_FROM_SERVER, team);
  });
};
