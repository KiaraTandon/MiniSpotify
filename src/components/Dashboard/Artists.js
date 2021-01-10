import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { Image, Modal, Button } from "react-bootstrap";
import "./Dashboard.css";
import "./Artists.css";
import { store } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
class Artists extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      show: false,
      cur: {},
      tracks: [],
      song: "",
      loading: false,
    };
  }

  componentDidMount = () => {
    const accessToken = localStorage.getItem("accessToken");
    this.setState({
      loading: true,
    });
    axios({
      method: "get",
      url: `https://musifyback.herokuapp.com/api/me/topartists/?accessToken=${accessToken}`,
    })
      .then((res) => {
        console.log(res);
        this.setState({
          data: res.data.items,
        });
        let genres = [];
        for (let i = 0; i < res.data.items.length; i++) {
          for (let j = 0; j < res.data.items[i].genres.length; j++) {
            genres.push(res.data.items[i].genres[j]);
          }
        }
        const s = new Set(genres);
        this.props.setgenre(s);
        this.props.setloaded(true);
        this.setState({
          loading: false,
        });
      })
      .catch((err) => console.log(err));
    // this.getArtisits();
  };

  gettracks = (id) => {
    const accessToken = localStorage.getItem("accessToken");
    axios({
      method: "get",
      url: `https://musifyback.herokuapp.com/api/me/tracks/?accessToken=${accessToken}&artistId=${id}`,
    })
      .then((res) => {
        console.log(res);
        this.setState({
          tracks: res.data.tracks,
        });
      })
      .catch((err) => console.log(err));
  };

  toggle = (artist) => {
    if (this.state.show === false) {
      this.setState({
        show: true,
        cur: artist,
      });
      console.log(artist);
    } else {
      this.setState({
        show: false,
      });
    }
  };
  play = (url) => {
    if (!url) {
      alert("No preview link");
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
    this.setState({
      song: url,
    });
    this.props.setsong(url);
    this.toggle();
  };

  msToTime = (duration) => {
    var seconds = Math.floor((duration / 1000) % 60),
      minutes = Math.floor((duration / (1000 * 60)) % 60);
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    return minutes + ":" + seconds;
  };

  render() {
    const artists = this.state.data.map((val, key) => {
      const ele = (
        <div
          key={key}
          className="d-flex click row align-content-center justify-content-center"
        >
          <div className="rounded-circle mt-5 gradient view overlay zoom">
            <Image
              src={val.images[0].url}
              className="artist"
              alt={val.name}
              id={"a" + key}
              onClick={() => {
                this.gettracks(val.id);
                this.toggle(val);
              }}
            ></Image>
          </div>
          <h3 className="mt-5">{val.name}</h3>
        </div>
      );
      return ele;
    });

    return (
      <div>
        <h1>Top Artists for you</h1>
        <div className="hscroll">{artists}</div>
        <div>
          <div>
            {this.state.loading && <h1 className="text-light">Loading....</h1>}
          </div>
          <Modal show={this.state.show} onHide={this.toggle}>
            <Modal.Header closeButton className="bg-dark text-light">
              <Modal.Title className="mx-auto display-4">
                {this.state.cur.name}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body className="bg-dark text-light">
              {this.state.show && (
                <div>
                  <Image
                    src={this.state.cur.images[0].url}
                    height="300px"
                    width="300px"
                    className="rounded mx-auto d-block mb-5 justify-content-center align-items-center"
                  ></Image>
                  {this.state.tracks.map((val, key) => {
                    return (
                      <div
                        key={key}
                        className="d-flex col mb-3 click"
                        onClick={() => this.play(val.preview_url)}
                      >
                        <img
                          src={val.album.images[0].url}
                          height="100px"
                          width="100px"
                          className={`mr-4`}
                          alt={val.name}
                        ></img>
                        <div className="d-flex row">
                          <h5 className="lead font-weight-bold w-100 mb-1">
                            {val.name}
                          </h5>
                          <h4 className="lead mt-0">
                            {this.msToTime(val.duration_ms)}
                          </h4>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </Modal.Body>
            <Modal.Footer className="bg-dark text-light">
              <Button variant="secondary" onClick={this.toggle}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
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
    setgenre: (data) => {
      dispatch({ type: "SET_GENRE", payload: data });
    },
    setloaded: (data) => {
      dispatch({ type: "SET_LOADED", payload: data });
    },
  };
}

export default connect(null, mapDispatchToProps)(Artists);
