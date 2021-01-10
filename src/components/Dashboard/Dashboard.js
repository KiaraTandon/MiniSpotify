import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { Redirect } from "react-router-dom";
import Artists from "./Artists";
import {
  Navbar,
  Nav,
  NavDropdown,
  OverlayTrigger,
  Image,
} from "react-bootstrap";
import Recommender from "./Recommender";
import Waves from "css-waves/Waves";
import Genre from "./Genre";
import Tracks from "./Tracks";
import Footer from "../Player/Footer";
import NewRelease from "./NewRelease";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: this.props.accessToken,
      user: "",
      browse: false,
      playlist: false,
      style: {},
    };
  }

  componentDidMount = () => {
    const accessToken = localStorage.getItem("accessToken");
    axios({
      method: "get",
      url: "https://api.spotify.com/v1/me/",
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    })
      .then((res) => {
        // console.log(res);
        this.setState({
          user: res.data.display_name,
          profile: res.data.images[0].url,
        });
      })
      .catch((err) => console.log(err));
    this.props.setsong("");
  };

  handleLogout = () => {
    localStorage.setItem("accessToken", "");
    localStorage.setItem("login", "false");
    this.setState({
      user: "",
    });
    this.props.setAcessToken("");
    this.props.setlogin(false);
  };

  browse = () => {
    this.setState({
      browse: true,
    });
  };

  playlist = () => {
    this.setState({
      playlist: true,
    });
  };
  render() {
    const status = localStorage.getItem("login");
    if (status === "false") {
      return <Redirect to="/"></Redirect>;
    }
    return (
      <div className="lead main text-light mb-7">
        {this.state.browse && (
          <Redirect to="/browse" from="/dashboard"></Redirect>
        )}
        {this.state.playlist && (
          <Redirect to="/myplaylist" from="/dashboard"></Redirect>
        )}
        <Navbar className="navbg fixed-top" variant="dark">
          <Navbar.Brand>Musify</Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link onClick={this.browse}>Browse</Nav.Link>
            <Nav.Link onClick={this.playlist}>My Playlists</Nav.Link>
          </Nav>

          <Nav className="ml-auto">
            <NavDropdown
              drop={"left"}
              title="Me"
              id="dropdown-variants-secondary"
            >
              <NavDropdown.Item href="#">Profile</NavDropdown.Item>
              <NavDropdown.Item>
                <Nav.Item onClick={this.handleLogout}>Logout</Nav.Item>
              </NavDropdown.Item>
            </NavDropdown>
            <OverlayTrigger
              trigger="click"
              key="profile"
              placement="bottom"
              overlay={
                <Image
                  src={this.state.profile}
                  className="rounded-circle profile"
                  height="300px"
                  width="300px"
                ></Image>
              }
            >
              <img
                src={this.state.profile}
                alt="user"
                height="40px"
                width="40px"
                className="rounded-circle profile"
              ></img>
            </OverlayTrigger>
          </Nav>
        </Navbar>
        <div className="welcome mb-8">
          <h1 className="wtext">Welcome {this.state.user}</h1>
          <div className="wave">
            <Waves backGroundColor="#000" />
          </div>
        </div>
        <div className="p-8">
          <Artists></Artists>
        </div>
        <div className="p-8">
          <Recommender></Recommender>
        </div>
        <div className="p-8">
          <Tracks></Tracks>
        </div>
        <div className="p-8">{this.props.loaded && <Genre></Genre>}</div>

        <div className="p-8">
          <NewRelease />
        </div>
        <div className="p-8">
          <Footer song={this.props.song}></Footer>
        </div>
      </div>
    );
  }
}

function mapStatetoProps(state) {
  return {
    accessToken: state.accessToken,
    login: state.login,
    song: state.song,
    loaded: state.loaded,
  };
}

function mapDispatchtoProps(dispatch) {
  return {
    setlogin: (status) => {
      dispatch({ type: "LOGIN", payload: status });
    },
    setAcessToken: (data) => {
      dispatch({ type: "SET_ACCESS_TOKEN", payload: data });
    },
    setsong: (url) => {
      dispatch({ type: "SET_SONG", payload: url });
    },
  };
}
export default connect(mapStatetoProps, mapDispatchtoProps)(Dashboard);
