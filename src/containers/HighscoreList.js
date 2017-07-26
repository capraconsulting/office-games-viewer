import React, { Component } from 'react';
import { Row, Col } from 'react-flexbox-grid';
import Divider from 'material-ui/Divider';
import List from 'material-ui/List/List';

import LoadingCircle from '../components/Misc/LoadingCircle';
import WidgetHeader from '../components/Widget/WidgetHeader';
import Player from '../components/Player/Player';

import './HighscoreList.css';

const MINIMUM_GAMES = 10;
const AMOUNT_OF_PLAYERS = 10;

class HighscoreList extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      playerStatistics: []
    };
  }


  componentDidMount() {
    this.props.rebase.bindToState('/games/ping-pong/player_statistics', {
      context: this,
      asArray: true,
      state: 'playerStatistics',
      queries: {
        orderByChild: 'elo_rating'
      },
      then: () => {
        this.setState({
          isLoading: false
        });
      }
    });
  }

  render() {
    const { isLoading, playerStatistics } = this.state;
    const { players } = this.props;
    return (
      <div>
        <WidgetHeader title={`Highscore`} />
        <List>
          {
            !isLoading ?
              playerStatistics.filter((playerStatistic, index) => (
                playerStatistic.total_games >= MINIMUM_GAMES
              )).sort((a, b) => {
                return b.trueskill_rating.mu - a.trueskill_rating.mu;
              }).slice(0, AMOUNT_OF_PLAYERS).map((playerStatistic, index) => (
                <div key={`HighscoreList-${playerStatistic.key}`}>
                  <div className="highscore-list-item">
                    <Row middle="xs">
                      <Col xs={1} className="highscore-list-index">
                        <span>#{index + 1}</span>
                      </Col>
                      <Col xs={11}>
                        <Player
                          horizontal
                          compact
                          player={Object.assign(playerStatistic, players[playerStatistic.key])}
                        />
                      </Col>
                    </Row>
                  </div>
                  <Divider />
                </div>
              ))
              : <LoadingCircle />
          }
        </List>
      </div>
    );
  }
}

export default HighscoreList;
