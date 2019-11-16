import React from "react";
import "./App.css";
import { topics } from "./config";
import client from "./events";
import Default from "./components/Default";
import Mission from "./components/Mission";
import Weather from "./components/Weather";

class App extends React.Component {
  constructor(props) {
    super(props);

    // states
    this.state = {
      last_topic: "default",
      last_message: {}
    };

    // call component according to event
    client.on("message", (topic, message) => {
      this.setState({ last_topic: topic, last_message: JSON.parse(message) });
    });
  }

  render() {
    switch (this.state.last_topic) {
      case topics.mission:
        return <Mission props={this.state.last_message} />;
      case topics.weather:
        return <Weather props={this.state.last_message} />;
      default:
        return <Default props={this.state.last_message} />;
    }
  }
}

export default App;
