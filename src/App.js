import React from "react";
import "./App.css";

import axios from "axios";

import { topics, api } from "./config";
import client from "./events";

import Move from "./logic/Move";
import Path from "./logic/Path";

import Header from "./components/partials/Header";
import Footer from "./components/partials/Footer";

import StandBy from "./components/StandBy";
import Mission from "./components/Mission";

class App extends React.Component {
  constructor(props) {
    super(props);

    // states
    this.state = {
      selected_mode: 0,
      last_topic: null,
      last_message: {},
      current_screen: "standby",
      positions: [],
      path_queue: [],
      total_queue: [],
      situation: {
        position: {
          x: 0.2,
          y: 0.2
        }
      }
    };

    this.modes = [
      {
        name: "Rapide",
        img: "/img/modes/fast.png"
      },
      {
        name: "Ecologie",
        img: "/img/modes/eco.png"
      },
      {
        name: "Confort",
        img: "/img/modes/comfort.png"
      }
    ];
    this.updatePositions = this.updatePositions.bind(this);
    this.changeMode = this.changeMode.bind(this);
    this.startMission = this.startMission.bind(this);

    // call component according to event
    client.on("message", (topic, message) => {
      message = JSON.parse(message);
      switch (topic) {
        case topics.status:
          if (message.status === "stopped") {
            axios.get(api.last).then(response => {
              this.setState({ situation: response.data });
            });
            if (this.state.path_queue.length > 0) {
              let path_queue = this.state.path_queue;
              Move.move(path_queue.shift());
              this.setState({ path_queue: [...path_queue] });
            }
          }
          break;
        case topics.situation:
          this.setState({ situation: message });
          break;
        case topics.road:
        case topics.lines:
        case topics.traffic:
          this.setState({ path_queue: [], total_queue: [] });
          this.startMission();

          break;
        case topics.mission:
          this.setState({
            current_screen: "mission",
            last_topic: topic,
            last_message: message
          });
          break;

        case topics.objective:
          const positions = this.state.positions;
          positions.shift();
          this.setState({
            positions: [...positions],
            total_queue: [],
            current_screen: !positions.length ? "finished" : "mission"
          });
          break;

        case topics.carState:
          if (
            this.state.path_queue.length > 0 &&
            Math.abs(message.position.x - this.state.situation.position.x) <
              0.6 &&
            Math.abs(message.position.y - this.state.situation.position.y) < 0.6
          ) {
            setTimeout(() => {
              if (this.state.path_queue.length > 0) {
                let path_queue = this.state.path_queue;
                Move.move(path_queue.shift());
                this.setState({ path_queue: path_queue });
              }
            }, 5000);
          }

        default:
          this.setState({
            last_topic: topic,
            last_message: message
          });
          break;
      }
    });
  }

  componentDidMount() {
    axios.get(api.last).then(response => {
      this.setState({ situation: response.data });
    });
  }

  changeMode(index) {
    if (this.modes[index]) {
      this.setState({ selected_mode: index });
    }
  }

  updatePositions(positions) {
    console.log("in update positions", positions);
    this.setState({ positions: [...positions] });
  }

  startMission() {
    // alert("GO GO GO !!!");
    client.publish(topics.stop, null);
    this.path = new Path(this.modes[this.state.selected_mode].name);
    this.path
      .findByProfil(this.state.situation, this.state.positions[0])
      .then(path_queue => {
        console.log(path_queue);
        this.setState({ total_queue: [...path_queue] });
        if (path_queue.length) {
          Move.move(path_queue.shift());
        }
        this.setState({ path_queue: [...path_queue] });
      });
  }

  render() {
    this.utils = {
      situation: this.state.situation,
      positions: this.state.positions,
      updatePositions: this.updatePositions,
      changeMode: this.changeMode,
      startMission: this.startMission
    };
    let cpnt = "";
    switch (this.state.current_screen) {
      case "mission":
        cpnt = (
          <Mission
            data={this.state.last_message}
            utils={this.utils}
            modes={this.modes}
            selected_mode={this.state.selected_mode}
          />
        );
        break;
      default:
        cpnt = <StandBy data={this.state.last_message} utils={this.utils} />;
        break;
    }

    return (
      <React.Fragment>
        <Header current_screen={this.state.current_screen} utils={this.utils} />
        {cpnt}
        <Footer
          current_screen={this.state.current_screen}
          selected_mode={this.state.selected_mode}
          queue={this.state.total_queue}
          utils={this.utils}
        />
      </React.Fragment>
    );
  }
}

export default App;
