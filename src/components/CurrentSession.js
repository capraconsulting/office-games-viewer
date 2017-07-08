import React from 'react';
import classNames from 'classnames';

class CurrentSession extends React.Component {
  constructor() {
    super();
    this.state = {
      currentSession: {
          sessionPlayers: {}
      }
    };
  }

  componentDidMount() {
    this.props.rebase.bindToState('/games/ping-pong/current_session', {
      context: this,
      state: 'currentSession'
    });
   }

  render() {
    const { currentSession } = this.state;
    if (currentSession) {
        const { session_started: sessionStarted, sessionPlayers: sessionPlayersObject = {} } = currentSession;
    } else {
        // TODO
    }
    const sessionStarted = false;
    const sessionPlayers = false;
    console.log(this.state);
    return (
        <div>
            <div
                className={classNames(
                "game-status",
                sessionStarted ? "game-active": "game-waiting"
                )}
            >
                {sessionStarted ?
                "Game in progress" : "Waiting for players..."
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
        </div>
    );
  }
}

export default CurrentSession;
