import React, { Component } from "react";
import { connect } from "react-redux";
import { Navbar, Nav, Image, Button } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import Footer from "../Player/Footer";
import "./Playlist.css";
import { store } from "react-notifications-component";
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";

class Playlist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      featured: true,
      data: [],
      curtrack: "",
    };
  }
  componentDidMount = () => {
    // console.log(this.props);
    this.setState({
      data: this.props.data,
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

  handleRequest = () => {
    this.setState({
      featured: false,
    });
  };
  render() {
    const tracks = this.state.data.map((val, key) => {
      const ele = (
        <div key={key} className="row mb-5">
          <div className="col">
            <h5>
              {key + 1}. {val.track.name}
            </h5>
          </div>
          <div className="col h-10"></div>
          <Button onClick={() => this.play(val.track.preview_url)}>Play</Button>
        </div>
      );
      return ele;
    });
    return (
      <div className="text-light">
        <ReactNotification />
        {!localStorage.getItem("accessToken") && <Redirect to="/"></Redirect>}
        {!this.state.featured && (
          <Redirect to="/dashboard" from="/featured"></Redirect>
        )}
        <Navbar bg="dark">
          <Nav.Link className="text-light" onClick={this.handleRequest}>
            Back
          </Nav.Link>
          <Nav.Item className="mx-auto w-80"></Nav.Item>
        </Navbar>
        <div className="d-flex col">
          <div className="leftp d-flex align-items-center justify-content-center">
            <Image
              src={this.props.art}
              height="300px"
              width="300px"
              // className="left"
            ></Image>
          </div>
          <div className="right">
            <h1>{tracks}</h1>
          </div>
        </div>
        <Footer song={this.state.curtrack}></Footer>
      </div>
    );
  }
}
function mapStatetoProps(state) {
  return {
    data: state.data,
    art: state.art,
    login: state.login,
  };
}

export default connect(mapStatetoProps)(Playlist);
