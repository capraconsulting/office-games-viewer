import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      cards: [],
      currentSession: {}
    };
  }

  componentDidMount() {
    this.props.rebase.bindToState('cards', {
      context: this,
      state: 'cards',
      asArray: true
    });
    this.props.rebase.bindToState('current_session', {
      context: this,
      state: 'currentSession'
    })
  }

  render() {
    console.log(this.state.cards);
    console.log(this.state.currentSession);
    return (
      <div className="App">
        <div>
          {this.state.currentSession.session_started ?
            "Game in progress" : "Waiting for players.."
          }
        </div>
        <div>
          Player 1: {
            (this.state.currentSession.players &&
            this.state.currentSession.players.length > 0) ?
            this.state.currentSession.players[0].slack_first_name :
            "Not registered"
          }
        </div>
        <div>
          Player 2: {
            (this.state.currentSession.players &&
            this.state.currentSession.players.length > 1) ?
            this.state.currentSession.players[1].slack_first_name :
            "Not registered"
          }
        </div>
      </div>
    );
  }
}

export default App;
