import React, { Component } from "react";
import Search from "./components/Search";
import Lyrics from "./components/Lyrics";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from "react-router-dom";
import TrackList from "./components/TrackList";
export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      songName: ""
    };
  }
  updateSongName = e => {
    this.setState({
      songName: e.target.value
    });
  };
  defaultSong = () => {
    this.setState({
      songName: ""
    });
  };
  showList = () => {
    this.setState({
      showList: true
    });
  };
  render() {
    return (
      <Router>
        {this.state.showList ? <Redirect to="/list" /> : null}
        <div className="App">
          <Switch>
            <Route exact path="/" render={() => <Redirect to="/home" />} />
            <Route
              path="/home"
              render={() => (
                <Search
                  updateSongName={this.updateSongName}
                  songName={this.state.songName}
                  defaultSong={this.defaultSong}
                  showList={this.showList}
                />
              )}
            />
            <Route
              path="/list"
              render={() => <TrackList songName={this.state.songName} />}
            />
            <Route exact path="/lyrics/:id" component={Lyrics} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
