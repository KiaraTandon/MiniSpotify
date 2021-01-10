import React, { Component } from "react";
import "./App.css";
import Login from "./components/Login/Login";
import Dashboard from "./components/Dashboard/Dashboard";
import Browse from "./components/Search/Browse";
import Playlist from "./components/PlayList/Playlist";
import MyList from "./components/UserPlaylist/MyList";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Route exact path="/" component={Login}></Route>
        <Route exact path="/dashboard" component={Dashboard}></Route>
        <Route exact path="/browse" component={Browse}></Route>
        <Route exact path="/featured" component={Playlist}></Route>
        <Route exact path="/myplaylist" component={MyList}></Route>

        {/* <Login></Login> */}
        {this.props.login && <Redirect to="/dashboard"></Redirect>}
      </div>
    );
  }
}

function mapStatetoProps(state) {
  return {
    accessToken: state.accessToken,
    login: state.login,
  };
}

export default connect(mapStatetoProps)(App);
