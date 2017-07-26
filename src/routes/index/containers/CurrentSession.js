import React, { Component } from 'react';
import { Row, Col } from 'react-flexbox-grid';

import List from 'material-ui/List/List';

import LoadingCircle from '../../../components/Misc/LoadingCircle';
import TrueSkillIcon from '../../../components/Misc/TrueSkillIcon';
import Player from '../../../components/Player/Player';

import WidgetHeader from '../components/Widget/WidgetHeader';

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
    this.props.rebase.bindToState('/games/ping-pong/current_session', {
      context: this,
      state: 'currentSession',
      then: () => {
        this.setState({
          isLoading: false
        });
      }
    });
  }

  render() {
    const { isLoading, currentSession } = this.state;
    const { session_started: sessionStarted, players: playersObject = {} } = currentSession;
    const players = Object.values(playersObject);
    return (
      <div className="current-session-widget">
        <WidgetHeader
          title={sessionStarted
            ? <span>Spill pågår · <TrueSkillIcon quality={currentSession.trueskill_quality} /></span>
            : "Venter på spillere..."
          }
        />
        <List>
          {
            !isLoading ?
              <div className="current-session-list">
                <Row center="xs">
                  <Col xs={7}>
                    {
                      players[0] ? (
                        <Player player={players[0]} />
                      ): (
                        <span className="missing-player-text">?</span>
                      )
                    }
                  </Col>
                </Row>
                <Row center="xs">
                  <span className="versus-text">───── VS ───── </span>
                </Row>
                <Row center="xs">
                  <Col xs={7}>
                    {
                      players[1] ? (
                        <Player player={players[1]} />
                      ): (
                        <span className="missing-player-text">?</span>
                      )
                    }
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
