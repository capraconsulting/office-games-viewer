import React, { Component } from 'react';
import classNames from 'classnames';

import './PlayerStats.css';

type Props = {
  horizontal: boolean;
  compact: boolean,
  fromSession: boolean,
  rightToLeft: boolean,
  player: Object
};

class PlayerStats extends Component {
  props: Props

  static defaultProps = {
    compact: false
  };

  render() {
    const { horizontal, compact, fromSession, rightToLeft, player } = this.props;
    return (
      <div
        className={classNames(
          "player-stats",
          horizontal ? "display-horizontal" : "display-vertical",
          rightToLeft ? "display-right-to-left" : "display-left-to-right",
          compact ? "compact" : ""
        )}
      >
        { fromSession ? (
          <span>
            <span className="player-rating">Rating: {player.rating_after} </span>
            <span
              className={classNames(
                "player-rating-delta",
                player.rating_delta > 0 ? "positive" : "negative"
              )}
            >
            ({player.rating_delta > 0 ? '+' : ''}{player.rating_delta})
            </span>
          </span>
        ) : (
          <span>
            <span className="player-rating">Rating: {player.rating}</span>
            <span> (</span>
            <span className="player-wins">{player.games_won} vinn</span>
            <span> | </span>
            <span className="player-losses"> {player.games_lost} tap</span>
            <span>)</span>
          </span>
        )}
      </div>
    );
  }
}

export default PlayerStats;
