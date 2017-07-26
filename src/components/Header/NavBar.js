import React, { Component } from 'react';

import AppBar from 'material-ui/AppBar';
import MenuItem from 'material-ui/MenuItem';
import DropDownMenu from 'material-ui/DropDownMenu';

import NavButton from './NavButton';

import './NavBar.css';

export default class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gameSlug: 1,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event, index, value) {
    // TODO: do more
    this.setState({
      gameSlug: value
    });
  }

  render() {
    return (
      <AppBar
        title={
          <div>
            <span>Kontorspill</span>
            <span className="navbar-buttons">
              <NavButton path="/" label="Dashboard" displayActive={false} />
              <NavButton path="/players" label="Spillere" />
            </span>
          </div>
        }
        showMenuIconButton={false}
        iconElementRight={
          <DropDownMenu labelStyle={{ color: 'white' }} value={this.state.gameSlug} onChange={this.handleChange}>
            <MenuItem value={1} primaryText="Bordtennis" />
            <MenuItem value={2} primaryText="Shuffleboard" />
          </DropDownMenu>
        }
      />
    );
  }
}

