import React, { Component } from 'react';
import { Row, Col } from 'react-flexbox-grid';

import './App.css';

import LoadingCircle from './components/LoadingCircle';
import CurrentSession from './components/CurrentSession';
import SessionHistoryList from './components/SessionHistoryList';
import HighscoreList from './components/HighscoreList';

class App extends Component {
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
        this.state.isLoading = false;
      }
    });
  }
  render() {
    const { isLoading, players } = this.state;
    return (
      <div className="App">
        { !isLoading ? (
          <Row style={{ margin: 0 }}>
            <Col xs={6}>
              <CurrentSession rebase={this.props.rebase} />
              <SessionHistoryList rebase={this.props.rebase} players={players} />
            </Col>
            <Col xs={6}>
              <HighscoreList rebase={this.props.rebase} players={players} />
            </Col>
          </Row>
        ) : (
          <LoadingCircle />
        )}
      </div>
    );
  }
}

export default App;
