import React from "react";
import "./App.css";
import { topics, api } from "./config";
import client from "./events";
import Default from "./components/Default";
import Mission from "./components/Mission";
import Weather from "./components/Weather";
import Move from "./logic/Move";

class App extends React.Component {
  constructor(props) {
    super(props);

    // states
    this.state = {
      last_topic: "default",
      last_message: {},
      positions: [],
      situation: {
        position: {
          x: 5.6,
          y: 3.8
        }
      }
    };

    this.updatePositions = this.updatePositions.bind(this);

    // call component according to event
    client.on("message", (topic, message) => {
      if (topic === topics.objective) {
        alert("Objectif atteint");
        const positions = this.state.positions;
        positions.shift();
        this.setState({ positions: [...positions] });
        if (positions.length > 0) {
          Move.move(this.state.positions[0]);
        }
      } else {
        this.setState({ last_topic: topic, last_message: JSON.parse(message) });
      }
    });
  }

  updatePositions(positions) {
    this.setState({ positions: positions });
  }

  render() {
    this.utils = {
      situation: this.state.situation,
      positions: this.state.positions,
      updatePositions: this.updatePositions
    };
    switch (this.state.last_topic) {
      case topics.mission:
        return <Mission data={this.state.last_message} utils={this.utils} />;
      case topics.weather:
        return <Weather data={this.state.last_message} utils={this.utils} />;
      default:
        return <Default data={this.state.last_message} utils={this.utils} />;
    }
  }
}

export default App;
