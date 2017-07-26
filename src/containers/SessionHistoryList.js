import React, { Component } from 'react';
import { Row, Col } from 'react-flexbox-grid';
import * as moment from 'moment';
import 'moment/locale/nb';

import Divider from 'material-ui/Divider';
import List from 'material-ui/List/List';

import LoadingCircle from '../components/Misc/LoadingCircle';
import TrueSkillIcon from '../components/Misc/TrueSkillIcon';
import WidgetHeader from '../components/Widget/WidgetHeader';
import Session from '../components/Session/Session';

import './SessionHistoryList.css';

moment.locale('nb');
const AMOUNT_OF_SESSIONS = 4;

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
        this.setState({
          isLoading: false,
          sessionHistory: this.state.sessionHistory.reverse().slice(0, AMOUNT_OF_SESSIONS)
        });
      }
    });
  }

  render() {
    const { isLoading, sessionHistory } = this.state;
    const { players } = this.props;
    return (
      <div>
        <WidgetHeader title={`Siste ${AMOUNT_OF_SESSIONS} spill`} />
        <List>
          {
            !isLoading ?
              sessionHistory.map((session, index) => (
                <div key={`SessionHistoryList-${session.key}`}>
                  <div className="session-history-item">
                    <Row middle={'xs'} center={'xs'} className="session-history-date">
                      <Col xs={12}>
                        <span>{moment.utc(session.session_ended).fromNow()}</span>
                      </Col>
                    </Row>
                    <Row middle={'xs'} center={'xs'} className="session-history-quality">
                      <Col xs={12}>
                        <span><TrueSkillIcon quality={session.trueskill_quality} /></span>
                      </Col>
                    </Row>
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
