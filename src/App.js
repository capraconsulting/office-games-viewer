import React, { Component } from 'react';
import { Grid, Row } from 'react-flexbox-grid';
import { Switch, Route } from "react-router-dom";
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import './App.css';

import NavBar from './components/Header/NavBar';
import Index from './routes/index';
import Players from './routes/players';

injectTapEventPlugin();

export default class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <div className="App">
          <Grid fluid>
            <Row xs={12}>
              <NavBar />
            </Row>
            <Row xs={12}>
              <Switch>
                <Route
                  exact
                  path="/"
                  render={(props) => (
                    <Index {...props} rebase={this.props.rebase} />
                  )}
                />
                <Route
                  path="/players"
                  render={(props) => (
                    <Players {...props} rebase={this.props.rebase} />
                  )}
                />
              </Switch>
            </Row>
          </Grid>
        </div>
      </MuiThemeProvider>
    );
  }
}
