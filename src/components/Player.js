import React, { Component } from 'react';
import { Row, Col } from 'react-flexbox-grid';

import PlayerAvatar from './PlayerAvatar';
import PlayerName from './PlayerName';
import PlayerStats from './PlayerStats';

import './Player.css';

type Props = {
  horizontal: boolean,
  compact: boolean,
  fromSession: boolean,
  rightToLeft: boolean, 
  player: Object,
};

class Player extends Component {
  props: Props

  static defaultProps = {
    horizontal: false,
    compact: false,
    fromSession: false,
    rightToLeft: false
  };

  render() {
    const { horizontal, rightToLeft } = this.props;

    if (horizontal) {
      return (
        <Row middle="xs">
          {!rightToLeft && (
            <Col xs={1}>
              <PlayerAvatar {...this.props} />
            </Col>
          )}
          <Col xs={5}>
            <PlayerName {...this.props} />
          </Col>
          <Col xs={6}>
            <PlayerStats {...this.props} />
          </Col>
          {rightToLeft && (
            <Col xs={1}>
              <PlayerAvatar {...this.props} />
            </Col>
          )}
        </Row>
      );
    }
    return (
      <Row middle="xs">
        {!rightToLeft && (
          <Col xs={2}>
            <PlayerAvatar {...this.props} />
          </Col>
        )}
        <Col xs={10}>
          <Row middle="xs">
            <Col xs={12}>
              <PlayerName {...this.props} />
            </Col>
          </Row>
          <Row middle="xs">
            <Col xs={12}>
              <PlayerStats {...this.props} />
            </Col>
          </Row>
        </Col>
        {rightToLeft && (
          <Col xs={2}>
            <PlayerAvatar {...this.props} />
          </Col>
        )}
      </Row>
    );
  }
}

export default Player;
