import React, { Component } from 'react';
import classNames from 'classnames';

import Divider from 'material-ui/Divider';
import List from 'material-ui/List/List';
import AppBar from 'material-ui/AppBar';
import CircularProgress from 'material-ui/CircularProgress';

import LoadingCircle from './LoadingCircle';
import Session from './Session';

import './SessionHistoryList.css';

const AMOUNT_OF_SESSIONS = 5;

class SessionHistoryList extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      sessionHistory: []
    };
  }

  componentDidMount() {
    this.props.rebase.bindToState('/games/ping-pong/sessions', {
      context: this,
      asArray: true,
      state: 'sessionHistory',
      queries: {
        orderByChild: 'session_ended',
        limitToLast: 10
      },
      then: () => {
        this.state.isLoading = false;
      }
    });
  }

  render() {
    const { isLoading, sessionHistory } = this.state;
    const { players } = this.props;
    return (
      <div>
        <AppBar
          title={`Siste ${AMOUNT_OF_SESSIONS} Spill`}
          showMenuIconButton={false}
          className={classNames(
            "header",
            "session-history-header"
          )}
        />

        <List>
          {
            !isLoading ?
              sessionHistory.reverse().slice(0, AMOUNT_OF_SESSIONS).map((session, index) => (
                <div key={`SessionHistoryList-${session.key}`}>
                  <div className="highscore-list-item">
                    <Session players={players} session={session} />
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

export default SessionHistoryList;
