import React, { Component } from "react";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";

export default class AppFooter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      curtrack: this.props.song,
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.song !== this.props.song) {
      this.setState({
        curtrack: this.props.song,
      });
    }
  }
  render() {
    return (
      <div className="fixed-bottom">
        <div className="d-flex w-96">
          <AudioPlayer autoPlay src={this.state.curtrack}></AudioPlayer>
        </div>
      </div>
    );
  }
}
