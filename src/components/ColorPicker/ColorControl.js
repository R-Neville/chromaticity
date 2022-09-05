import React from 'react';

class ColorControl extends ReactComponent {
  constructor(props) {
    super(props)
  
    this._initStyles = {
      display: 'flex',
      margin: '0.5em 1em'
    };
  }

  render() {
    return (
      <div style={this._initStyles}>

      </div>
    );
  }
}

export default ColorControl;