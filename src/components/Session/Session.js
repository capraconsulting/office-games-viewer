import React, { Component } from 'react';
import { Row, Col } from 'react-flexbox-grid';

import { findPlayer } from '../../utils';

import Player from '../Player/Player';

import './Session.css';

type Props = {
  players: Object,
  session: Object
};

class Session extends Component {
  props: Props

  render() {
    const { players, session } = this.props;
    return (
      <Row middle="xs" center="xs">
        <Col xs={5} className="session-winner" style={{ textAlign: 'right' }}>
          <Player
            compact
            fromSession
            rightToLeft
            player={findPlayer(players, session.winner)}
          />
        </Col>
        <Col xs={2} className="versus-winner-text">
          <span >vant mot</span>
        </Col>
        <Col xs={5} className="session-loser">
          <Player
            compact
            fromSession
            player={findPlayer(players, session.loser)}
          />
        </Col>
      </Row>
    );
  }
}

export default Session;
