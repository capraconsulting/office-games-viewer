import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';

import FlatButton from 'material-ui/FlatButton';

import './NavButton.css';

export default class NavBar extends Component {

  static defaultProps = {
    displayActive: true
  };


  render() {
    const { path, label, displayActive } = this.props;
    if (displayActive) {
      return (
        <NavLink className="navbar-link" activeClassName="navbar-active" to={path}>
          <FlatButton className="navbar-button" primary label={label} />
        </NavLink>
      );
    }
    return (
      <Link className="navbar-link" to={path}>
        <FlatButton className="navbar-button" primary label={label} />
      </Link>
    );
  }
}

