import React from 'react';
import classNames from 'classnames';
import CircularProgress from 'material-ui/CircularProgress';

class Highscore extends React.Component {
  constructor() {
    super();
    this.state = {
      lastSessions: []
    };
  }


  componentDidMount() {
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
    const { topTenRating } = this.state;
    return (
        <div>
            <div className="highscore-header">
              {"Highscore"}
            </div>
            <div className="highscore">
              {
                topTenRating ?
                  topTenRating.reverse().map((player, index) => (
                    <Player index={index} id={player.key} key={player.key} rebase={this.props.rebase} />
                  ))
                  : <CircularProgress size={60} thickness={7} />
              }
            </div>
        </div>
    );
  }
}

export default Highscore;
