import React from 'react'

class Footer extends React.Component {
  render () {
    switch (this.props.current_screen) {
      case 'mission':
      return (
        <footer>
          <div className="path_queue">
            {this.props.queue.map((q, i) => (
              <div className="path_item" key={i}>
                <img src={`/img/icons/${this.props.selected_mode}-${q.mean}.png`} alt={q.mean} />
              </div>
            ))}
          </div>
        </footer>
      )
      default:
      return (<footer></footer>)
    }

  }
}

export default Footer;
