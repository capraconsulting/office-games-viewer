import React, { Component } from 'react';
import classNames from 'classnames';

import './PlayerAvatar.css';

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
      <img
        className={classNames(
        "player-avatar",
        horizontal ? "display-horizontal" : "display-vertical",
        compact ? "compact" : ""
        )}
        alt={`${player.slack_first_name} ${player.slack_last_name}`}
        src={player.slack_avatar_url}
      />
    );
  }
}

export default PlayerName;
