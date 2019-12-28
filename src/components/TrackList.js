import React, { Component } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Typography from "@material-ui/core/Typography";
class TrackList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tracks: []
    };
  }
  linkRef = React.createRef();
  componentDidMount() {
    if (this.props.songName) {
      const proxy = "https://cors-anywhere.herokuapp.com/";
      Axios.get(
        proxy +
          `${process.env.REACT_APP_MM_URL}/track.search?q_track=${this.props.songName}&s_track_rating=desc&f_has_lyrics=1&apikey=${process.env.REACT_APP_MM_KEY}`
      )
        .then(res =>
          this.setState({ tracks: res.data.message.body.track_list })
        )
        .catch(err => console.log(err));
    }
  }
  simulateClick = ref => {
    if (ref) {
      ref.click();
    }
  };
  render() {
    const { songName } = this.props;
    let returnData = "";
    {
      !songName
        ? (returnData = (
            <React.Fragment>
              <Link to={`home`} ref={this.simulateClick}></Link>
            </React.Fragment>
          ))
        : (returnData = (
            <React.Fragment>
              {this.state.tracks.map(tracks => (
                <Card
                  key={tracks.track.track_id}
                  style={{
                    display: "inline-block",
                    margin: "auto"
                  }}
                >
                  <CardContent>
                    <Typography component="p">
                      Track : {tracks.track.track_name}
                    </Typography>
                    <Typography component="p">
                      Album : {tracks.track.album_name}
                    </Typography>
                    <Typography component="p">
                      Artist: {tracks.track.artist_name}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Link to={`lyrics/${tracks.track.track_id}`}>
                      View Lyrics
                    </Link>
                  </CardActions>
                </Card>
              ))}
            </React.Fragment>
          ));
    }
    return returnData;
  }
}

export default TrackList;
