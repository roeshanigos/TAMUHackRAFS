import React, { Component } from "react";
import "./App.css";
import SimpleMap from "./components/SimpleMap";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import SimpleCard from "./components/SimpleCard";
import axios from "axios";

class App extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      currentLat: 30.628,
      currentLng: -96.3344
    };
  }

  componentDidMount() {
    if (navigator && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(pos => {
        const coords = pos.coords;
        console.log(coords.latitude, coords.longitude);
        this.setState({
          data: [],
          lat: coords.latitude,
          lng: coords.longitude
        });
      });
    }

    axios
      .get("https://localhost:3005/airports/34/67/78/23")
      .then(res => {
        console.log(res);
      })
      .then(users => {
        console.log(users);
        this.setState({ users });
      });
  }

  handlePost = form => {
    console.log(form);
  };

  render() {
    return (
      <div>
        <AppBar position="static" color="primary">
          <Toolbar>
            <Typography variant="h6" color="inherit">
              TAMUHack2019
            </Typography>
          </Toolbar>
        </AppBar>
        <div style={{ display: "flex" }}>
          <div
            style={{
              height: "100%",
              width: "60%",
              padding: "10px",
              backgroundColor: "#FF7D93",
              display: "flex",
              flexDirection: "column"
            }}
          >
            <SimpleMap
              handlePost={this.handlePost}
              lat={this.state.currentLat}
              lng={this.state.currentLng}
              content={this.state.data}
            />
          </div>
          <div
            style={{
              height: "860px",
              overflow: "auto",
              width: "40%",
              padding: "10px",
              backgroundColor: "#FF7D93"
            }}
          >
            {this.state.data.map(function(object, i) {
              let temp = [];
              temp.push(<SimpleCard content={object} key={i} />);
              temp.push(<br />);
              return temp;
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
