import React, { Component } from "react";
import Axios from "axios";

class Lyrics extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lyrics: ""
    };
  }
  componentDidMount() {
    const trackId = this.props.match.params.id;
    const proxy = "https://cors-anywhere.herokuapp.com/";
    Axios.get(
      proxy +
        `${process.env.REACT_APP_MM_URL}/track.lyrics.get?track_id=${trackId}&apikey=${process.env.REACT_APP_MM_KEY}`
    )
      .then(res =>
        this.setState({ lyrics: res.data.message.body.lyrics.lyrics_body })
      )
      .catch(err => console.log(err));
  }
  render() {
    return <div>{this.state.lyrics ? <p>{this.state.lyrics}</p> : null}</div>;
  }
}

export default Lyrics;
