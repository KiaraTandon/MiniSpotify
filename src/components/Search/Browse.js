import React, { Component } from "react";
import { connect } from "react-redux";
import ReactDOM from "react-dom";
import "./Browse.css";
import {
  InputGroup,
  FormControl,
  Button,
  Image,
  Dropdown,
  Navbar,
  Nav,
} from "react-bootstrap";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { store } from "react-notifications-component";
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";

import Footer from "../Player/Footer";
class Browse extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: "",
      results: {},
      type: "album",
      browse: true,
      tracks: {},
    };
  }

  handleChange = (e) => {
    this.setState({
      query: e.target.value,
    });
  };

  handleSearch = () => {
    if (!this.state.query) {
      store.addNotification({
        title: "No Query",
        message: "Please enter a search query",
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
    axios({
      method: "get",
      url: `https://musifyback.herokuapp.com/api/search/searchquery/?q=${
        this.state.query
      }&accessToken=${localStorage.getItem("accessToken")}&type=${
        this.state.type
      }`,
    })
      .then((res) => {
        console.log(res);
        this.setState({
          results: res.data,
        });
        const query = {
          q: this.state.query,
          type: this.state.type,
        };
        this.props.setquery(query);
      })
      .catch((err) => console.log(err));
  };

  changeType = (type) => {
    this.setState({
      type: type,
      results: {},
    });
  };
  handleRequest = () => {
    this.props.setsong("");
    this.setState({
      browse: false,
    });
  };

  play = (url) => {
    if (!url) {
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
      curtrack: url,
    });
  };

  getItem = (id, art) => {
    const accessToken = localStorage.getItem("accessToken");
    axios({
      method: "get",
      url: `https://musifyback.herokuapp.com/api/search/albumtrack/?id=${id}&accessToken=${accessToken}`,
    })
      .then((res) => {
        console.log(res);
        const data = res.data.items.map((val, key) => {
          const ele = (
            <div
              key={key}
              className="d-flex row align-items-center justify-content-center mr-5"
            >
              <Image src={art} height="300px" width="300px"></Image>
              <h5 className="w-100">{val.name}</h5>
              <Button
                onClick={() => this.play(val.preview_url)}
                className="rounded-circle btn btn-success"
              >
                <svg
                  width="1em"
                  height="1em"
                  viewBox="0 0 16 16"
                  class="bi bi-play-fill"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M11.596 8.697l-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z" />
                </svg>
              </Button>
            </div>
          );
          return ele;
        });
        console.log(data);
        ReactDOM.render(data, document.getElementById("result"));
      })
      .catch((err) => console.log(err));
  };

  getartist = (id, art) => {
    const accessToken = localStorage.getItem("accessToken");
    axios({
      method: "get",
      url: `https://musifyback.herokuapp.com/api/me/tracks/?accessToken=${accessToken}&artistId=${id}`,
    })
      .then((res) => {
        console.log(res);
        const data = res.data.tracks.map((val, key) => {
          const ele = (
            <div
              key={key}
              className="d-flex row px-5 justify-content-center align-items-center"
            >
              <Image
                src={
                  art
                    ? art.url
                    : "https://cdn4.iconfinder.com/data/icons/users-26/100/user-01-512.png"
                }
                height="300px"
                width="300px"
              ></Image>
              <h6 className="w-100">{val.name}</h6>
              <Button
                onClick={() => this.play(val.preview_url)}
                className="rounded-circle btn btn-success"
              >
                <svg
                  width="1em"
                  height="1em"
                  viewBox="0 0 16 16"
                  class="bi bi-play-fill"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M11.596 8.697l-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z" />
                </svg>
              </Button>
            </div>
          );
          return ele;
        });
        ReactDOM.render(data, document.getElementById("result"));
      })
      .catch((err) => console.log(err));
  };

  render() {
    let result = <div></div>;
    if (
      this.state.type === "album" &&
      Object.keys(this.state.results).length !== 0
    ) {
      result = this.state.results.albums.items.map((val, key) => {
        const ele = (
          <div
            onClick={() => this.getItem(val.id, val.images[0].url)}
            key={key}
            className="d-flex row align-content-center mb-2"
            role="button"
          >
            <Image
              src={val.images[0].url}
              height="80px"
              width="80px"
              className="rounded-circle click"
            ></Image>
            <h6 className="d-flex col click align-items-center w-100">
              {val.name}
            </h6>
          </div>
        );
        return ele;
      });
    }

    if (
      this.state.type === "artist" &&
      Object.keys(this.state.results).length !== 0
    ) {
      result = this.state.results.artists.items.map((val, key) => {
        const ele = (
          <div
            key={key}
            className="d-flex row align-content-center mb-2"
            onClick={() => this.getartist(val.id, val.images[0])}
          >
            <Image
              src={
                val.images[0]
                  ? val.images[0].url
                  : "https://cdn4.iconfinder.com/data/icons/users-26/100/user-01-512.png"
              }
              height="100px"
              width="100px"
              className="rounded-circle click"
            ></Image>
            <h5 className="d-flex col click align-items-center w-100">
              {val.name}
            </h5>
          </div>
        );
        return ele;
      });
    }

    return (
      <div className="d-flex row text-light thide">
        {!localStorage.getItem("accessToken") && <Redirect to="/"></Redirect>}
        <ReactNotification />
        <div className="w-100">
          <Navbar bg="dark">
            <Nav.Link className="text-light" onClick={this.handleRequest}>
              Back
            </Nav.Link>
            <Nav.Item className="mx-auto w-80">
              <InputGroup className="mb-3">
                <FormControl
                  placeholder="Whats on your mind?"
                  aria-label="Search an album"
                  aria-describedby="basic-addon2"
                  onChange={this.handleChange}
                />
                <Dropdown>
                  <Dropdown.Toggle
                    variant="success"
                    id="dropdown-basic"
                  ></Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item onClick={() => this.changeType("album")}>
                      Albums
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => this.changeType("artist")}>
                      Artist
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
                <InputGroup.Append>
                  <Button
                    variant="outline-primary"
                    className="bi bi-search"
                    onClick={this.handleSearch}
                  >
                    <svg
                      width="1em"
                      height="1em"
                      viewBox="0 0 16 16"
                      className="bi bi-search"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M10.442 10.442a1 1 0 0 1 1.415 0l3.85 3.85a1 1 0 0 1-1.414 1.415l-3.85-3.85a1 1 0 0 1 0-1.415z"
                      />
                      <path
                        fill-rule="evenodd"
                        d="M6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11zM13 6.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0z"
                      />
                    </svg>
                  </Button>
                </InputGroup.Append>
              </InputGroup>
            </Nav.Item>
          </Navbar>
        </div>
        <div className="d-flex col content main w-100 h-100">
          <div className="left">
            {!this.state.browse && <Redirect to="/dashboard"></Redirect>}
            <div className="d-flex col"></div>
            <div className="ml-5">{result}</div>
          </div>

          <div id="result" className="hscroll"></div>
        </div>
        <Footer song={this.state.curtrack}></Footer>
      </div>
    );
  }
}

function mapStatetoProps(state) {
  return {
    query: state.query,
  };
}
function mapDispatchtoProps(dispatch) {
  return {
    setquery: (data) => {
      dispatch({ type: "SET_QUERY", payload: data });
    },
    setsong: (data) => {
      dispatch({ type: "SET_SONG", payload: data });
    },
  };
}

export default connect(mapStatetoProps, mapDispatchtoProps)(Browse);
