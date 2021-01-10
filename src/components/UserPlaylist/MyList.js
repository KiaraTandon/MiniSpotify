import React, { Component } from "react";
import { connect } from "react-redux";
import { Navbar, Nav, Image, Modal, Button } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import axios from "axios";
import Footer from "../Player/Footer";
import "./MyList.css";

class MyList extends Component {
  constructor() {
    super();
    this.state = {
      playlist: true,
      data: <div></div>,
      tracks: <div></div>,
      song: "",
      show: false,
      name: "",
    };
  }

  toggle = () => {
    this.setState({
      show: this.state.show ? false : true,
    });
  };
  play = (url) => {
    if (!url) {
      alert("No preview link");
      return;
    }
    this.setState({
      song: url,
    });
    this.props.setsong(url);
  };

  gettracks = (id, name) => {
    axios({
      method: "get",
      url: `https://musifyback.herokuapp.com/api/dashboard/playlist/?accessToken=${localStorage.getItem(
        "accessToken"
      )}&id=${id}`,
    })
      .then((res) => {
        console.log(res);
        const tracks = res.data.items.map((val, key) => {
          const ele = (
            <div
              key={key}
              onClick={() => this.play(val.track.preview_url)}
              className="mb-3"
              id="tracks"
            >
              <h5>
                {key + 1}. {val.track.name}
              </h5>
            </div>
          );
          return ele;
        });
        this.setState({
          tracks: tracks,
          name: name,
        });
        this.toggle();
      })
      .catch((err) => err);
  };
  componentDidMount = () => {
    axios({
      method: "get",
      url: `https://musifyback.herokuapp.com/api/me/myplaylists/?accessToken=${localStorage.getItem(
        "accessToken"
      )}`,
    })
      .then((res) => {
        console.log(res);
        const data = res.data.items.map((val, key) => {
          const ele = (
            <div
              key={key}
              className="mx-5"
              onClick={() => this.gettracks(val.id, val.name)}
              id="album"
            >
              <Image
                src={val.images[0].url}
                height="300px"
                width="300px"
              ></Image>
              <h1>{val.name}</h1>
            </div>
          );
          return ele;
        });

        this.setState({
          data: data,
        });
      })
      .catch((err) => console.log(err));
  };

  handleRequest = () => {
    this.props.setsong("");
    this.setState({
      playlist: false,
    });
  };
  render() {
    return (
      <div className="text-light" id="list">
        {!localStorage.getItem("accessToken") && <Redirect to="/"></Redirect>}
        <Navbar bg="dark">
          <Nav.Link className="text-light" onClick={this.handleRequest}>
            Back
          </Nav.Link>
        </Navbar>
        {!this.state.playlist && <Redirect to="/dashboard"></Redirect>}
        <h1>My Playlists</h1>
        <div className="d-flex row justify-content-center align-items-center">
          {this.state.data}
        </div>
        <div>
          <div>
            <Modal show={this.state.show} onHide={this.toggle}>
              <Modal.Header closeButton className="bg-dark text-light">
                <Modal.Title className="mx-auto display-4">
                  <h1>{this.state.name}</h1>
                </Modal.Title>
              </Modal.Header>
              <Modal.Body className="bg-dark text-light">
                {this.state.show && <div>{this.state.tracks}</div>}
              </Modal.Body>
              <Modal.Footer className="bg-dark text-light">
                <Button variant="secondary" onClick={this.toggle}>
                  Close
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
          <Footer song={this.state.song}></Footer>
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

export default connect(null, mapDispatchToProps)(MyList);
