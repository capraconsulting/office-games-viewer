import React, { Component } from 'react';
import classNames from 'classnames';

import TrueSkillIcon from '../Misc/TrueSkillIcon';

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
    console.log(player);
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
            <span className="player-rating-icon"><TrueSkillIcon /></span>
            <span className="player-rating">{Math.round(player.trueskill_rating.mu.after * 100) / 100}μ [{Math.round(player.trueskill_rating.sigma.after * 100) / 100}σ] </span>
            <span
              className={classNames(
                "player-rating-delta",
                player.trueskill_rating.mu.delta > 0 ? "positive" : "negative"
              )}
            >
            ({player.trueskill_rating.mu.delta > 0 ? '+' : ''}{Math.round(player.trueskill_rating.mu.delta * 100) / 100}μ)
            </span>
          </span>
        ) : (
          <span>
            <span className="player-rating-icon"><TrueSkillIcon /></span>
            <span className="player-rating">{Math.round(player.trueskill_rating.mu * 100) / 100}μ [{Math.round(player.trueskill_rating.sigma * 100) / 100}σ] </span>
            <span>(</span>
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
