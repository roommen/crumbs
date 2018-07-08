import React, { Component } from 'react';
import './header.css';

export default class Header extends Component {
  render() {
    return (
        <header className="App-header">
          <img src="/img/crumbs_logo.png" className="App-logo" alt="CRUMBS" />
          {/* <div className="App-title">CRUMBS</div> */}
        </header>
    )
  }
}
