import React, { Component } from 'react';
import classNames from 'classnames';
import { Row, Col } from 'react-flexbox-grid';
import './App.css';
import CurrentSession from './components/CurrentSession';
import LastSession from './components/LastSession';
import Highscore from './components/LastSession';
import Player from './components/Player';

class App extends Component {
  constructor() {
    super();
    this.state = {
      players: []
    };
  }

  componentDidMount() {
    this.props.rebase.bindToState('/players', {
      context: this,
      state: 'players',
      asArray: true
    });
  }
  render() {
    const { players: players } = this.state;
    return (
      <div className="App">
        <Row>
          <Col xs={6}>
            <CurrentSession rebase={this.props.rebase} />
            <hr/>
            <LastSession rebase={this.props.rebase} />
          </Col>
          <Col xs={6}>
            <Highscore rebase={this.props.rebase} players={players} />
          </Col>
        </Row>
      </div>
    );
  }
}

export default App;
