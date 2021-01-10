import React, { Component } from "react";
import { Image } from "react-bootstrap";
import axios from "axios";
import "./Dashboard.css";
import { store } from "react-notifications-component";
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import { connect } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";

class Tracks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      song: "",
      offset: 20,
    };
  }

  getdata = (offset = 0) => {
    if (offset === null) return;
    const accessToken = localStorage.getItem("accessToken");
    axios({
      method: "get",
      url: `https://musifyback.herokuapp.com/api/me/toptracks/?accessToken=${accessToken}&offset=${offset}`,
    })
      .then((res) => {
        console.log(res);
        this.setState({
          data: this.state.data.concat(res.data.items),
          offset: this.state.offset + 20 > 50 ? 50 : this.state.offset + 20,
        });
      })
      .catch((err) => console.log(err));
  };
  componentDidMount = () => {
    this.getdata();
  };

  play = (url) => {
    if (!url) {
      alert("No Preview link");
      store.addNotification({
        title: "No Preview",
        message: "Preview link not found",
        type: "danger",
        insert: "top",
        container: "top-right",
        animationIn: ["animated", "fadeIn"],
        animationOut: ["animated", "fadeOut"],
        dismiss: {
          duration: 1000,
          onScreen: true,
        },
      });
      return;
    }
    this.props.setsong(url);
    this.setState({
      song: url,
    });
  };

  render() {
    const tracks = this.state.data.map((val, key) => {
      const ele = (
        <div
          key={key}
          className="d-flex row align-content-center click justify-content-center mx-2"
          onClick={() => this.play(val.preview_url)}
        >
          <Image
            src={val.album.images[0].url}
            height="300px"
            width="300px"
          ></Image>
          <h6 className="mt-3">{val.name}</h6>
        </div>
      );
      return ele;
    });
    return (
      <div>
        <ReactNotification />
        <h1>Top Tracks for you</h1>
        <InfiniteScroll
          dataLength={this.state.data.length}
          hasMore={true}
          next={() => this.getdata(this.state.offset)}
          scrollableTarget="trackdiv"
          scrollThreshold={1.0}
        />
        <div className="hscroll" id="trackdiv">
          {tracks}
        </div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setsong: (song) => {
      dispatch({ type: "SET_SONG", payload: song });
    },
  };
}

export default connect(null, mapDispatchToProps)(Tracks);
