import React, { Component } from 'react';
import classNames from 'classnames';
import './App.css';
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
  }

  render() {
    const { currentSession, players: allPlayers, lastSessions } = this.state;
    const { session_started: sessionStarted, players: currentPlayersObject = {} } = currentSession;
    const currentPlayers = Object.values(currentPlayersObject);
    return (
      <div className="App">
        <div
          className={classNames(
            "game-status",
            sessionStarted ? "game-active": "game-waiting"
          )}
        >
          {sessionStarted ?
            "Game in progress" : "Waiting for currentPlayers.."
          }
        </div>
        <div className="player">
          Player 1:
          {
            (currentPlayers &&
            currentPlayers.length > 0) ?
            <span className="player-name">
              <img className="player-avatar" src={currentPlayers[0].slack_avatar_url} /> {currentPlayers[0].slack_first_name}
            </span> :
            "––"
          }
        </div>
        <hr />
        <div className="player">
          Player 2:
          {
            (currentPlayers &&
            currentPlayers.length > 1) ?
            <span className="player-name">
              <img className="player-avatar" src={currentPlayers[1].slack_avatar_url} /> {currentPlayers[1].slack_first_name}
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
      </div>
    );
  }
}

export default App;
