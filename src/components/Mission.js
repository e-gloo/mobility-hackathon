import React from "react";
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
    // Move.move(this.props.data.positions[0]);
  }

  render() {
    let ordered = -1;
    return (
      <React.Fragment>
        {this.state.ongoing ? (
          <p>Vroum Vroum</p>
        ) : (
          <React.Fragment>
            <div className="modes">
              {this.props.modes.map((m, i) => (
                <a
                  key={i}
                  href="#"
                  className={
                    `mode ${m.name}` +
                    (i === this.props.selected_mode ? " selected" : "")
                  }
                  style={{
                    order: i !== this.props.selected_mode && ordered++ ? 1 : -1
                  }}
                  onClick={e => {
                    e.preventDefault();
                    this.props.utils.changeMode(i);
                  }}
                >
                  <img src={m.img} alt={m.name} />
                  {m.name}
                </a>
              ))}
            </div>
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}
