import React, { Component } from 'react';
import classNames from 'classnames';
import FontAwesome from 'react-fontawesome';

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

    let muDelta = null;
    if (fromSession) {
      muDelta = Math.floor(player.trueskill_rating.mu.after * 10) - Math.floor(player.trueskill_rating.mu.before * 10);
    }

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
            <span className="player-rating">{Math.floor(player.trueskill_rating.mu.after * 10)} </span>
            {muDelta !== 0 &&
              <span
                className={classNames(
                  "player-rating-delta",
                  muDelta > 0 ? "positive" : "negative"
                )}
              >
                <FontAwesome name={muDelta > 0 ? 'caret-up' : 'caret-down'} />
                <span> {muDelta}</span>
              </span>
            }
          </span>
        ) : (
          <span>
            <span className="player-rating-icon"><TrueSkillIcon /></span>
            <span className="player-rating">{Math.floor(player.trueskill_rating.mu * 10)} </span>
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
