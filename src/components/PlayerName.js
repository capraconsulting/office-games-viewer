import React, { Component } from 'react';
import classNames from 'classnames';

import './PlayerName.css';

type Props = {
  horizontal: boolean,
  compact: boolean,
  player: Object
};

class PlayerName extends Component {
  props: Props

  render() {
    const { horizontal, compact, player } = this.props;
    return (
      <div
        className={classNames(
          "player-name",
          horizontal ? "display-horizontal" : "display-vertical",
          compact ? "compact" : ""
        )}
      >
        {player.slack_first_name} (@{player.slack_username})
      </div>
    );
  }
}

export default PlayerName;
