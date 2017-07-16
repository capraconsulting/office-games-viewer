import React, { Component } from 'react';
import { Switch, Route } from "react-router-dom";
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import './App.css';

import Index from './routes/index';
import Players from './routes/players';

injectTapEventPlugin();

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      players: []
    };
  }

  componentDidMount() {
    this.props.rebase.bindToState('/players', {
      context: this,
      state: 'players',
      then: () => {
        this.setState({
          isLoading: false
        });
      }
    });
  }
  render() {
    const { isLoading, players } = this.state;
    return (
      <MuiThemeProvider>
        <div className="App">
          <Switch>
            <Route
              exact
              path="/"
              render={(props) => (
                <Index {...props} rebase={this.props.rebase} />
              )}
            />
            <Route path="/players" component={Players} />
          </Switch>
        </div>
      </MuiThemeProvider>
    );
  }
}
