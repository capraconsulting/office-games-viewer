import React, { Component } from 'react';
import { Row, Col } from 'react-flexbox-grid';

import LoadingCircle from '../../components/Misc/LoadingCircle';

import CurrentSession from './containers/CurrentSession';
import SessionHistoryList from './containers/SessionHistoryList';
import HighscoreList from './containers/HighscoreList';

class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      players: []
    };
  }

  componentDidMount() {
    this.props.rebase.bindToState('/players', {
      context: this,
      state: 'players',
      then: () => {
        this.setState({
          isLoading: false
        });
      }
    });
  }

  render() {
    const { isLoading, players } = this.state;
    return (
      <div className="dashboard">
        { !isLoading ? (
          <Row style={{ margin: 0 }}>
            <Col xs={12} md={6}>
              <CurrentSession rebase={this.props.rebase} />
              <SessionHistoryList rebase={this.props.rebase} players={players} />
            </Col>
            <Col xs={12} md={6}>
              <HighscoreList rebase={this.props.rebase} players={players} />
            </Col>
          </Row>
        ) : (
          <LoadingCircle />
        )}
      </div>
    );
  }
}

export default Dashboard;
