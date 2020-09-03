const config = require("config");
const mongoose = require("mongoose");
const logger = require("../startup/logging");

module.exports = () => {
  const db = config.get("db");
  mongoose
    .set("useNewUrlParser", true)
    .set("useFindAndModify", false)
    .set("useUnifiedTopology", true)
    .connect(db)
    .then(() => logger.info(`Connected to ${db}...`));
};
