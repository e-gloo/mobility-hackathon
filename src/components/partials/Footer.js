import React from 'react'

class Footer extends React.Component {
  render () {
    switch (this.props.current_screen) {
      case 'mission':
      return (
        <footer>
          <a href='#' id="confirm-mode" onClick={e => {
              e.preventDefault()
              this.props.utils.startMission()
            }}
            >
            Confirm
          </a>
        </footer>
      )
      default:
      return (<footer></footer>)
    }

  }
}

export default Footer;
