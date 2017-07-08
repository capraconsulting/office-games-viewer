import React, { Component } from 'react';
import { Row, Col } from 'react-flexbox-grid';
import classNames from 'classnames';

import List from 'material-ui/List/List';
import AppBar from 'material-ui/AppBar';
import CircularProgress from 'material-ui/CircularProgress';

import LoadingCircle from './LoadingCircle';
import Player from './Player';

import './CurrentSession.css';

class CurrentSession extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      currentSession: {
        sessionStarted: false,
        players: []
      }
    };
  }

  componentDidMount() {
    this.props.rebase.bindToState('/games/ping-pong/current_session_2', {
      context: this,
      state: 'currentSession',
      then: () => {
        this.state.isLoading = false;
      }
    });
  }

  render() {
    const { isLoading, currentSession } = this.state;
    const { session_started: sessionStarted, players: playersObject = {} } = currentSession;
    const players = Object.values(playersObject);
    return (
      <div>
        <AppBar
          title={sessionStarted ?
            "Game in progress" : "Waiting for players..."
          }
          showMenuIconButton={false}
          className={classNames(
            "header",
            "game-status",
            sessionStarted ? "game-active": "game-waiting"
          )}
        />
        <List>
          {
            !isLoading ?
              <div>
                <Row center="xs">
                  <Col xs={7}>
                    <Player player={players[0]} />
                  </Col>
                </Row>
                <Row center="xs">
                  <span className="versus-text">───── VS ─────</span>
                </Row>
                <Row center="xs">
                  <Col xs={7}>
                    <Player player={players[1]} />
                  </Col>
                </Row>
              </div>
            : <LoadingCircle />
          }
        </List>
      </div>
    );
  }
}

export default CurrentSession;
