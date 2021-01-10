import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { Card } from "react-bootstrap";
import "./Genre.css";

class Recommendations extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      results: <div> </div>,
    };
  }

  componentDidMount = () => {
    console.log(this.props.genre);
    let g = Array.from(this.props.genre);
    const results = g.map((val, key) => {
      const ele = (
        <div key={key} id={"g" + key} className="text-dark">
          <Card style={{ width: "18rem" }}>
            <Card.Body>
              <Card.Title>{val}</Card.Title>
            </Card.Body>
          </Card>
        </div>
      );
      return ele;
    });
    this.setState({
      results: results,
    });
  };
  getGenre = (genre) => {
    const accessToken = localStorage.getItem("accessToken");
    axios({
      method: "get",
      url: `https://musifyback.herokuapp.com/api/me/genre/?accessToken=${accessToken}&genre=${genre}`,
    })
      .then((res) => {
        // console.log(res)
        if (res.data.tracks.length !== 0) {
          console.log(genre);
          this.setState({
            data: this.state.data.concat(res.data.tracks),
          });
        }
      })
      .catch((err) => console.log(err));
  };

  render() {
    console.log(this.state);
    return (
      <div className="mb-7">
        <h1>Popular Genres based on your listening:</h1>
        <div className="d-flex col mb-5 pb-5 flex-wrap align-items-center justify-content-center">
          {this.state.results}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    genre: state.genre,
  };
}

export default connect(mapStateToProps)(Recommendations);
