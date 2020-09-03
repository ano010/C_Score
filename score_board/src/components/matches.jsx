import React, { Component } from "react";
import { toast } from "react-toastify";
import Match from "./match";
import { getMatches, deleteMatch } from "../service/matchService";
import { Link } from "react-router-dom";
import SearchBox from "./common/searchBox";
import { Row, Col } from "reactstrap";

class Matches extends Component {
  state = {
    matches: [],
    searchQuery: ""
  };

  async componentDidMount() {
    const { data } = await getMatches();

    console.log(data);

    this.setState({ matches: data });
  }

  handleSearch = query => {
    this.setState({ searchQuery: query });
  };

  handleDelete = async match => {
    const originalMatches = this.state.matches;
    const matches = originalMatches.filter(m => m._id === match._id);
    this.setState({ matches });

    try {
      await deleteMatch(match._id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        toast.error("This match has already been deleted.");
      this.setState({ matches: originalMatches });
    }
  };

  render() {
    const { searchQuery } = this.state;
    const matches = this.state.matches.filter(m =>
      m.name.toLowerCase().startsWith(searchQuery.toLocaleLowerCase())
    );
    return (
      <div className="container">
        <Link to="/matches/new" className="btn btn-primary m-2">
          Create New Match
        </Link>
        <SearchBox value={searchQuery} onChange={this.handleSearch} />

        <div className="row">
          {matches.map(match => (
            <div
              key={match._id}
              className="col-xs-12 col-sm-12 col-md-6 col-lg-6"
            >
              <Match
                _match={match}
                key={match._id}
                onDelete={this.handleDelete}
                {...this.props}
              />
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Matches;
