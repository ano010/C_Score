import React from "react";
import Form from "./common/form";
import Joi from "joi";
import { getMatch, saveMatch } from "../service/matchService";

class MatchForm extends Form {
  state = {
    data: { team1: "", team2: "", date: "", location: "" },
    errors: {}
  };

  schema = {
    team1: Joi.string()
      .min(2)
      .max(3)
      .required(),
    team2: Joi.string()
      .min(2)
      .max(3)
      .required(),
    date: Joi.date()
      .min("now")
      .required(),
    location: Joi.string().required()
  };

  populateMatch = async () => {
    try {
      const matchId = this.props.match.params.id;
      console.log(matchId);
      if (matchId === "new") return;

      console.log("test");
      const { data: match } = await getMatch(matchId);
      this.setState({ data: this.mapToViewModal(match) });
    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        this.props.history.replace("/not-found");
      }
    }
  };

  async componentDidMount() {
    await this.populateMatch();
  }

  mapToViewModal = match => {
    return {
      team1: match.team1.name,
      team2: match.team2.name,
      date: match.date,
      location: match.location
    };
  };

  doSubmit = async () => {
    const match = this.state.data;
    match._id = this.props.match.params.id;

    await saveMatch(match);

    this.props.history.push("/matches");
  };

  render() {
    return (
      <React.Fragment>
        <h1>Match Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("team1", "Team1")}
          {this.renderInput("team2", "Team2")}
          {this.renderInput("date", "Date", "text", "YYYY/MM/DD hh:mm:ss")}
          {this.renderInput("location", "Location")}
          {this.renderButton("Save")}
        </form>
      </React.Fragment>
    );
  }
}

export default MatchForm;
