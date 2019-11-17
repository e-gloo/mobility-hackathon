import React from "react";
import "./App.css";

import { topics } from "./config";
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
      situation: {
        position: {
          x: 5.6,
          y: 3.8
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
      switch (topic) {
        case topics.mission:
          this.setState({
            current_screen: "mission",
            last_topic: topic,
            last_message: JSON.parse(message)
          });
          break;

        case topics.objective:
          this.setState({ current_screen: "objective" });
          const positions = this.state.positions;
          positions.shift();
          this.setState({ positions: [...positions] });
          if (positions.length > 0) {
            //Move.move(this.state.positions[0]);
          }
          break;

        default:
          this.setState({
            last_topic: topic,
            last_message: JSON.parse(message)
          });
          break;
      }
    });
  }

  changeMode(index) {
    if (this.modes[index]) {
      this.setState({ selected_mode: index });
    }
  }

  updatePositions(positions) {
    console.log("in update positions", positions);
    this.setState({ positions: positions });
  }

  startMission() {
    // alert("GO GO GO !!!");
    this.path = new Path(this.modes[this.state.selected_mode].name);
    this.path.findByProfil(this.state.situation, this.state.positions[0]);
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
        <Footer current_screen={this.state.current_screen} utils={this.utils} />
      </React.Fragment>
    );
  }
}

export default App;
