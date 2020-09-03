const winston = require("winston");

const printFormat = info => {
  const { timestamp, level, message, ...args } = info;

  return `${timestamp} ${level}: ${message} ${
    Object.keys(args).length ? JSON.stringify(args, null, 2) : ""
  }`;
};

const logger = winston.createLogger({
  transports: [
    new winston.transports.Console({
      handleExceptions: true,

      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.colorize({ all: true }),
        winston.format.simple(),
        winston.format.align(),
        winston.format.printf(info => printFormat(info))
      )
    }),
    new winston.transports.File({
      filename: "logfile.log",
      handleExceptions: true,

      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json(),
        winston.format.simple(),
        winston.format.align(),
        winston.format.printf(info => printFormat(info))
      )
    })
  ],
  exitOnError: false
});

process.on("unhandledRejection", ex => {
  throw ex;
});

module.exports = logger;
