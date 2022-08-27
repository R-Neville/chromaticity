import React from 'react';
import colors from '../colors';
import Nav from './Nav';

class Header extends React.Component {
  constructor() {
    super();

    this._initStyles = {
      display: 'flex',
      alignItems: 'center',
      padding: '1em',
      backgroundColor: colors.header.bg,
      fontSize: 'inherit',
      fontFamily: 'inherit',
      color: colors.header.fg
    };
  }

  render() {
    return (
      <header style={this._initStyles}>
        <h1>Chormaticity</h1>
        <Nav linkItems={this.props.linkItems}/>
      </header>
    );
  }
}

export default Header;
