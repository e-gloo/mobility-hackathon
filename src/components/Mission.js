import React from "react";
import Path from "../logic/Path";
import Move from "../logic/Move";

export default class Mission extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ongoing: false
    };

    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    console.log(this.props);
    if (this.props.data.positions !== this.props.utils.positions) {
      this.props.utils.updatePositions(this.props.data.positions);
    }
  }

  handleClick(e) {
    e.preventDefault();
    this.setState({ ongoing: true });
    // const path = Path.find(
    //   {
    //     x: this.props.utils.situation.position.x,
    //     y: this.props.utils.situation.position.y
    //   },
    //   { x: this.props.data.positions[0].x, y: this.props.data.positions[0].y }
    // );
    Move.move(this.props.utils.positions[0]);
  }
  render() {
    return (
      <>
        <p>Mission</p>

        {this.state.ongoing ? (
          <p>En déplacement</p>
        ) : (
          <button onClick={this.handleClick}>Go</button>
        )}
      </>
    );
  }
}
