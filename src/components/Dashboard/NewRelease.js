import React, { Component } from "react";
import axios from "axios";
import { Image } from "react-bootstrap";
import "./Artists.css";
import { connect } from "react-redux";
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import InfiniteScroll from "react-infinite-scroll-component";

class NewRelease extends Component {
  constructor() {
    super();
    this.state = {
      data: <div></div>,
      cdata: [],
      offset: 20,
    };
  }

  getdata = (offset = 0) => {
    const accessToken = localStorage.getItem("accessToken");
    axios({
      method: "get",
      url: `https://musifyback.herokuapp.com/api/dashboard/newreleases/?accessToken=${accessToken}&offset=${offset}`,
    })
      .then((res) => {
        console.log(res);
        this.setState({
          cdata: this.state.cdata.concat(res.data.albums.items),
          offset: this.state.offset + 20,
        });
        const data = this.state.cdata.map((val, key) => {
          const ele =
            val.album_type === "single" ? (
              <div
                key={key}
                onClick={() => this.getresult(val)}
                className="click"
              >
                <Image
                  src={val.images[0].url}
                  height="300px"
                  width="300px"
                  alt={val.name}
                ></Image>
                <h4>{val.name}</h4>
              </div>
            ) : (
              <div key={key}></div>
            );
          return ele;
        });
        this.setState({
          data: data,
        });
      })
      .catch((err) => console.log(err));
  };

  getresult = (val) => {
    axios({
      method: "get",
      url: `https://musifyback.herokuapp.com/api/search/albumtrack/?accessToken=${localStorage.getItem(
        "accessToken"
      )}&id=${val.id}`,
    })
      .then((res) => {
        console.log(res);
        const uri = res.data.items[0].preview_url;
        if (uri === null) {
          alert("No preview link");

          return;
        }
        this.props.setsong(uri);
      })
      .catch((err) => console.log(err));

    return;
  };
  componentDidMount = () => {
    this.getdata();
  };

  render() {
    return (
      <div className="text-light">
        <h1>New Releases</h1>
        <InfiniteScroll
          hasMore={true}
          dataLength={this.state.cdata.length}
          next={() => this.getdata(this.state.offset)}
          scrollableTarget={"newrel"}
        >
          <div className="hscroll">{this.state.data}</div>
        </InfiniteScroll>

        <ReactNotification />
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
export default connect(null, mapDispatchToProps)(NewRelease);
