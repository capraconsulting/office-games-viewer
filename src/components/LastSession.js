import React from 'react';
import classNames from 'classnames';
import moment from 'moment';
import CircularProgress from 'material-ui/CircularProgress';
var utils = require('../utils');

class LastSession extends React.Component {
  constructor() {
    super();
    this.state = {
      lastSessions: []
    };
  }

  componentDidMount() {
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
    const { lastSessions } = this.state;
    const { players } = this.props;
    return (
      <div className="last-games">
        {
          players ?
            lastSessions.slice().reverse().map((session) => (
              <div className="game" key={session.key}>
                  <span className="winner">
                  {utils.findPlayer(players, session.winner.card_uid).slack_first_name}
                  </span>
                  {" won against "}
                  <span className="loser">
                  {utils.findPlayer(players, session.loser.card_uid).slack_first_name}
                  </span>
                  {" "}({moment.utc(session.session_ended).fromNow()})
              </div>
            ))
          : <CircularProgress size={60} thickness={7} />
        }
        </div>
    );
  }
}

export default LastSession;
