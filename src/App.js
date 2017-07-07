import React, { Component } from 'react';
import classNames from 'classnames';
import './App.css';
import { Row, Col } from 'react-flexbox-grid';
import Player from './components/Player';
import moment from 'moment';

const findPlayer = (players, card_uid) => {
  return players.find(
    (player) => Object.keys(player.cards || {}).includes(card_uid)
  ) || {};
};


class App extends Component {
  constructor() {
    super();
    this.state = {
      currentSession: {},
      lastSessions: [],
      players: []
    };
  }

  componentDidMount() {
    this.props.rebase.bindToState('/games/ping-pong/current_session', {
      context: this,
      state: 'currentSession'
    });
    this.props.rebase.bindToState('/players', {
      context: this,
      state: 'players',
      asArray: true
    });
    this.props.rebase.bindToState('/games/ping-pong/sessions', {
      context: this,
      asArray: true,
      state: 'lastSessions',
      queries: {
        orderByChild: 'session_ended',
        limitToLast: 10
      }
    });
    this.props.rebase.bindToState('/games/ping-pong/player_statistics', {
      context: this,
      asArray: true,
      state: 'topTenRating',
      queries: {
        orderByChild: 'rating',
        limitToLast: 10
      }
    });
  }
  render() {
    const { currentSession, players: allPlayers, lastSessions, topTenRating } = this.state;
    const { session_started: sessionStarted, sessionPlayers: sessionPlayersObject = {} } = currentSession;
    const sessionPlayers = Object.values(sessionPlayersObject);
    console.log(lastSessions);
    return (
      <div className="App">
        <Row>
          <Col xs={6}>
            <div
              className={classNames(
                "game-status",
                sessionStarted ? "game-active": "game-waiting"
              )}
            >
              {sessionStarted ?
                "Game in progress" : "Waiting for sessionPlayers.."
              }
            </div>
            <div className="player">
              Player 1:
              {
                (sessionPlayers &&
                sessionPlayers.length > 0) ?
                <span className="player-name">
                  <img className="player-avatar" src={sessionPlayers[0].slack_avatar_url} /> {sessionPlayers[0].slack_first_name}
                </span> :
                "––"
              }
            </div>
            <hr />
            <div className="player">
              Player 2:
              {
                (sessionPlayers &&
                sessionPlayers.length > 1) ?
                <span className="player-name">
                  <img className="player-avatar" src={sessionPlayers[1].slack_avatar_url} /> {sessionPlayers[1].slack_first_name}
                </span> :
                "––"
              }
            </div>
            <hr/>
            <div className="last-games">
              {lastSessions.slice().reverse().map((session) => (
                <div className="game" key={session.key}>
                  <span className="winner">
                    {findPlayer(allPlayers, session.winner.card_uid).slack_first_name}
                  </span>
                  {" won against "}
                  <span className="loser">
                    {findPlayer(allPlayers, session.loser.card_uid).slack_first_name}
                  </span>
                  {" "}({moment.utc(session.session_ended).fromNow()})
                </div>
              ))}
            </div>
          </Col>
          <Col xs={6}>
            <div className="highscore-header">
              {"Highscore"}
            </div>
            <div className="highscore">
              {
                topTenRating ?
                  topTenRating.reverse().map((player, index) => (
                    <Player index={index} id={player.key} key={player.key} rebase={this.props.rebase} />
                  ))
                  : "Loading"
              }
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

export default App;
