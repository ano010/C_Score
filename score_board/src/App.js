import React, { Component } from "react";
import { ToastContainer } from "react-toastify";
import { Route, Redirect, Switch } from "react-router-dom";
import Matches from "./components/matches";
import ScoreInputer from "./components/scoreInputer";
import NotFound from "./components/notFound";
import NavBar from "./components/common/navBar";
import MatchForm from "./components/matchForm";
import LoginForm from "./components/loginForm";
import "react-toastify/dist/ReactToastify.css";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <ToastContainer />
        <NavBar />
        <main className="container">
          <Switch>
            <Route path="/login" component={LoginForm}></Route>
            <Route path="/matches/:id" component={MatchForm} />
            <Route path="/matches" component={Matches} />
            <Route path="/scoreboard/:id" component={ScoreInputer} />
            <Route path="/not-found" component={NotFound} />
            <Redirect from="/" exact to="matches" />
            <Redirect to="/not-found" />
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
