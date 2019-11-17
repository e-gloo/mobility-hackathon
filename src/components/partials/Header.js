import React from 'react'

class Header extends React.Component {
  render () {
    switch (this.props.current_screen) {
      case 'mission':
      return (
        <header>
          <h1 id='headline'>Agent, choisissez un mode pour votre mission.</h1>
        </header>
      )
      case 'objective':
      return (
        <header>
          <h1 id='headline'>Objectif atteint !</h1>
        </header>
      )
      default:
      return <header style={{ backgroundColor: '#292929' }}></header>
    }
  }
}

export default Header;
