import React, { Component } from 'react';
import { Row, Col } from 'react-flexbox-grid';
import moment from 'moment';

import { findPlayer } from '../utils';

import Player from './Player';

import './Session.css';

type Props = {
  players: Object,
  session: Object
};

class Session extends Component {
  props: Props

  render() {
    const { players, session } = this.props;
    console.log(findPlayer(players, session.winner));
    return (
      <Row middle="xs">
        <Col xs={5} className="session-winner" style={{ float: 'right' }}>
          <Player
            compact
            fromSession
            rightToLeft
            player={findPlayer(players, session.winner)}
          />
        </Col>
        <Col xs={2}>
          <span className="versus-winner-text">vant mot</span>
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
