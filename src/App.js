import React, { Component } from 'react';
import classNames from 'classnames';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      cards: [],
      currentSession: {},
      lastSessions: []
    };
  }

  componentDidMount() {
    this.props.rebase.bindToState('cards', {
      context: this,
      state: 'cards',
      asArray: true
    });
    this.props.rebase.bindToState('/games/ping-pong/current_session', {
      context: this,
      state: 'currentSession'
    });
    this.props.rebase.bindToState('/games/ping-pong/sessions', {
      context: this,
      asArray: true,
      state: 'lastSessions',
      queries: {
        orderByChild: 'session_ended',
        limitToLast: 5
      }
    });
  }

  render() {
    const { currentSession, cards, lastSessions } = this.state;
    const { session_started: sessionStarted, players: playersObject = {} } = currentSession;
    const players = Object.values(playersObject);
    console.log(lastSessions);
    return (
      <div className="App">
        <div
          className={classNames(
            "game-status",
            sessionStarted ? "game-active": "game-waiting"
          )}
        >
          {sessionStarted ?
            "Game in progress" : "Waiting for players.."
          }
        </div>
        <div className="player">
          Player 1: <span className="player-name">
            {
              (players &&
              players.length > 0) ?
              players[0].slack_first_name :
              "––"
            }
          </span>
        </div>
        <hr />
        <div className="player">
          Player 2: <span className="player-name">
            {
              (currentSession.players &&
              players.length > 1) ?
              players[1].slack_first_name :
              "––"
            }
          </span>
        </div>
        <hr/>
        <div className="last-games">
          {lastSessions.map((session) => (
            <div className="game" key={session.key}>
              {session.winner.card_uid}
              {" vs. "}
              {session.loser.card_uid}
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default App;
