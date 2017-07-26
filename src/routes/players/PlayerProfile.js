import React from 'react';

import { Link } from 'react-router-dom';

import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

import LoadingCircle from '../../components/Misc/LoadingCircle';
import TrueSkillIcon from '../../components/Misc/TrueSkillIcon';
import TableHeaderSortColumn from '../../components/Table/TableHeaderSortColumn';

export default class PlayerProfile extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoadingPlayerInfo: true,
      isLoadingPlayerStatistics: true,
      player: {},
      playerStatistics: {}
    };
  }

  componentDidMount() {
    const { match } = this.props;
    const { slackUserId } = match.params.slackUserId;

    this.props.rebase.bindToState(`/players/${slackUserId}`, {
      context: this,
      state: 'player',
      then: () => {
        this.setState({
          isLoadingPlayer: false
        });
      }
    });

    this.props.rebase.bindToState(`/games/ping-pong/player_statistics/${slackUserId}`, {
      context: this,
      state: 'playerStatistics',
      then: () => {
        this.setState({
          isLoadingPlayerStatistics: false
        });
      }
    });
  }

  render() {
    const { match } = this.props;
    const { slackUserId } = match.params.slackUserId;
    // const { players } = this.props;
    const { isLoadingPlayer, isLoadingPlayerStatistics, player, playerStatistics } = this.state;
    return (
      <div>
        {
        !isLoadingPlayer && !isLoadingPlayerStatistics ?
          <div>
          Hello!
          </div>
          : <LoadingCircle />
        }
      </div>
    );
  }
}
