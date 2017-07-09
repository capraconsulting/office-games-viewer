import React, { Component } from 'react';
import classNames from 'classnames';

import './PlayerName.css';

type Props = {
  horizontal: boolean,
  compact: boolean,
  rightToLeft: boolean,
  player: Object
};

class PlayerName extends Component {
  props: Props

  render() {
    const { horizontal, compact, rightToLeft, player } = this.props;
    return (
      <div
        className={classNames(
          "player-name",
          horizontal ? "display-horizontal" : "display-vertical",
          rightToLeft ? "display-right-to-left" : "display-left-to-right",
          compact ? "compact" : ""
        )}
      >
        {player.slack_first_name} (@{player.slack_username})
      </div>
    );
  }
}

export default PlayerName;
