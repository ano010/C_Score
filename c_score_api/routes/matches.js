const { Match } = require("../models/match");
const validateObjectId = require("../middleware/validateObjectId");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const matches = await Match.find();

  res.status(200).send(matches);
});

router.get("/:id", validateObjectId, async (req, res) => {
  const match = await Match.findById(req.params.id);

  if (!match) res.send(404).send("The match with the given ID was not found.");

  res.send(match);
});

router.post("/", async (req, res) => {
  console.log(req.body);
  const match = new Match({
    name: req.body.name,
    team1: { name: req.body.team1 },
    team2: { name: req.body.team2 },
    date: req.body.date,
    location: req.body.location
  });

  match.team2.name = req.body.team2;
  await match.save();

  res.send(match);
});

router.put("/:id", validateObjectId, async (req, res) => {
  console.log(req.body);
  const match = await Match.findById(req.params.id);

  if (!match)
    return res.status(404).send("The match with the given ID was not found.");

  const updatedDevice = await Match.findByIdAndUpdate(
    req.params.id,
    {
      team1: { name: req.body.team1 },
      team2: { name: req.body.team2 },
      date: req.body.date,
      location: req.body.location
    },
    {
      new: true
    }
  );

  res.send(updatedDevice);
});

router.delete("/:id", async (req, res) => {
  const match = await Match.findByIdAndRemove(req.params.id);

  if (!match)
    return res.status(404).send("The match with the given ID was not found.");

  return res.status(200).send(match);
});

router.delete("/", async (req, res) => {
  await Match.remove({});

  res.status(200).send("All matches deleted.");
});

module.exports = router;
