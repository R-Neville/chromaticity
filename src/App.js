import React from 'react';
import colors from './colors';
import Header from './components/Header';
import Page from './components/Page';

class App extends React.Component {
  constructor() {
    super();
    
    this._initStyles = {
      display: 'flex',
      flexDirection: 'column',
      padding: 0,
      width: '100%',
      height: '100%',
      boxSizing: 'border-box',
      margin: 0,
      backgroundColor: colors.app.bg,
      fontSize: '1em',
      fontFamily: 'Arial',
      color: colors.app.fg
    };

    this._linkItems = [
      {
        href: '#picker',
        text: 'picker',
        onClick: this._onPickerLinkClick
      },
      {
        href: '#palettes',
        text: 'palettes',
        onClick: this._onPickerLinkClick
      },
      {
        href: '#favorites',
        text: 'favorites',
        onClick: this._onPickerLinkClick
      }
    ];
  }

  render() {
    return (
      <div style={this._initStyles}>
        <Header linkItems={this._linkItems}/>
        <main>
          <Page rootId={'picker'} display={'flex'} children={<h1>picker</h1>}/>
          <Page rootId={'palettes'} display={'none'} children={<h1>palettes</h1>}/>
          <Page rootId={'favorites'} display={'none'} children={<h1>favorites</h1>}/>
        </main>
      </div>
    );
  }

  _onPickerLinkClick(event) {
    const pageId = event.target.href.split('/').pop();
    const page = document.querySelector(pageId);
    if (page.style.display !== 'none') return; 
    const pages = document.querySelectorAll('.page');
    pages.forEach(p => {
      if (p.id !== pageId) {
        p.style.display = 'none';
      }
    });
    page.style.display = 'flex';
  }
}

export default App;
