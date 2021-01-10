import React, { Component } from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux";
import axios from "axios";
import { Image } from "react-bootstrap";
import "./Artists.css";
import { Redirect } from "react-router-dom";

class Recommender extends Component {
  constructor(props) {
    super();
    this.state = {
      history: [],
      result: <h1> </h1>,
      move: false,
      loading: false,
    };
  }
  componentDidUpdate = () => {
    console.log(this.props);
  };

  getItem = (id, art) => {
    const accessToken = localStorage.getItem("accessToken");
    this.setState({
      loading: true,
    });
    axios({
      method: "get",
      url: `https://musifyback.herokuapp.com/api/dashboard/playlist/?accessToken=${accessToken}&id=${id}`,
    })
      .then((res) => {
        console.log(res);
        this.props.setdata(res.data.items, art);
        this.setState({
          move: true,
          loading: false,
        });
      })
      .catch((err) => console.log(err));
  };

  componentDidMount = () => {
    const accessToken = localStorage.getItem("accessToken");
    this.setState({ loading: true });
    axios({
      method: "get",
      url: `https://musifyback.herokuapp.com/api/dashboard/featured/?accessToken=${accessToken}`,
    })
      .then((res) => {
        console.log(res);
        const result = res.data.playlists.items.map((val, key) => {
          const ele = (
            <div
              key={key}
              className="d-flex row align-content-center click justify-content-center"
              onClick={() => this.getItem(val.id, val.images[0].url)}
            >
              <Image
                src={val.images[0].url}
                height="300px"
                width="300px"
              ></Image>
              <h4>{val.name}</h4>
            </div>
          );
          return ele;
        });
        this.setState({ loading: false });
        ReactDOM.render(result, document.getElementById("featured"));
      })
      .catch((err) => console.log(err));
  };
  render() {
    if (this.state.move) {
      return <Redirect to="/featured"></Redirect>;
    }
    return (
      <div>
        <h1>Featured playlists for you</h1>
        {this.state.loading && <h1>Loading...</h1>}
        <div className="hscroll" id="featured"></div>
      </div>
    );
  }
}
function mapStatetoProps(state) {
  return {
    history: state.history,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setdata: (data, art) => {
      dispatch({ type: "SET_DATA", payload: [data, art] });
    },
  };
}

export default connect(mapStatetoProps, mapDispatchToProps)(Recommender);
