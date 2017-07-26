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

export default class PlayerList extends React.Component {
  // TODO: tabs, list / graph / etc
  constructor() {
    super();
    this.state = {
      isLoadingPlayers: true,
      isLoadingPlayerStatistics: true,
      players: [],
      playerStatistics: [],
      isAsc: true,
      sortHeader: 'trueskill_level'
    };

    this.sortByColumn = this.sortByColumn.bind(this);
  }

  componentDidMount() {
    this.props.rebase.bindToState('/players', {
      context: this,
      state: 'players',
      asArray: true,
      queries: {
        orderByChild: 'slack_first_name'
      },
      then: () => {
        this.setState({
          isLoadingPlayers: false
        });
      }
    });

    this.props.rebase.bindToState('/games/ping-pong/player_statistics', {
      context: this,
      state: 'playerStatistics',
      then: () => {
        this.setState({
          isLoadingPlayerStatistics: false
        });
      }
    });
  }

  formatPercent(a, b) {
    return `${this.calculatePercentOf(a, b)}%`;
  }

  calculatePercentOf(a, b) {
    if (isNaN(a) || isNaN(b) || b === 0) {
      return 0;
    }
    return Math.round((((a / b) * 100) * 100) / 100);
  }

  sortByColumn(column) {
    const isAsc = this.state.sortHeader === column ? !this.state.isAsc : true;
    const { players, playerStatistics } = this.state;

    console.log(isAsc, this.state.sortHeader);

    const sortedPlayers = players.sort((a, b) => {
      if (column === 'id') {
        return playerStatistics[b.key].games_lost - playerStatistics[a.key].games_lost;
      } else if (column === 'name') { // TODO: add sort on name
        return playerStatistics[b.key].games_lost - playerStatistics[a.key].games_lost;
      } else if (column === 'total_games') {
        return playerStatistics[b.key].total_games - playerStatistics[a.key].total_games;
      } else if (column === 'games_won') {
        return playerStatistics[b.key].games_won - playerStatistics[a.key].games_won;
      } else if (column === 'games_lost') {
        return playerStatistics[b.key].games_lost - playerStatistics[a.key].games_lost;
      } else if (column === 'games_won_percent') {
        return this.calculatePercentOf(playerStatistics[b.key].games_won, playerStatistics[b.key].total_games) - this.calculatePercentOf(playerStatistics[a.key].games_won, playerStatistics[a.key].total_games);
      } else if (column === 'games_lost_percent') {
        return this.calculatePercentOf(playerStatistics[b.key].games_lost, playerStatistics[b.key].total_games) - this.calculatePercentOf(playerStatistics[a.key].games_lost, playerStatistics[a.key].total_games);
      }
      
      return playerStatistics[b.key].trueskill_rating.mu - playerStatistics[a.key].trueskill_rating.mu;
    });

    if (!isAsc) {
      sortedPlayers.reverse();
    }

    this.setState({
      players: sortedPlayers,
      sortHeader: column,
      isAsc
    });
  }

  render() {
    const { isLoadingPlayers, isLoadingPlayerStatistics, players, playerStatistics } = this.state;
    return (
      <div>
        {
        !isLoadingPlayers && !isLoadingPlayerStatistics ?
          <Table
            selectable={false}
          >
            <TableHeader
              displaySelectAll={false}
            >
              <TableRow>
                <TableHeaderColumn>#</TableHeaderColumn>
                <TableHeaderSortColumn id={'id'} label={'ID'} onSort={this.sortByColumn} />
                <TableHeaderSortColumn id={'name'} label={'Navn'} onSort={this.sortByColumn} />
                <TableHeaderSortColumn id={'trueskill_level'} label={'TrueSkill Level'} onSort={this.sortByColumn} />
                <TableHeaderSortColumn id={'total_games'} label={'Antall Spill'} onSort={this.sortByColumn} />
                <TableHeaderSortColumn id={'games_won'} label={'Spill Vunnet'} onSort={this.sortByColumn} />
                <TableHeaderSortColumn id={'games_won_percent'} label={'Spill Vunnet %'} onSort={this.sortByColumn} />
                <TableHeaderSortColumn id={'games_lost'} label={'Spill Tapt'} onSort={this.sortByColumn} />
                <TableHeaderSortColumn id={'games_lost_percent'} label={'Spill Tapt %'} onSort={this.sortByColumn} />
              </TableRow>
            </TableHeader>
            <TableBody
              displayRowCheckbox={false}
              stripedRows
              showRowHover
            >
              {
                players.map((player, index) => (
                  <TableRow key={player.key}>
                    <TableRowColumn>{index + 1}</TableRowColumn>
                    <TableRowColumn><Link to={`/players/${player.key}`}>{player.key}</Link></TableRowColumn>
                    <TableRowColumn><Link to={`/players/${player.key}`}>{player.slack_first_name} (@{player.slack_username})</Link></TableRowColumn>
                    <TableRowColumn><TrueSkillIcon /> {Math.floor(playerStatistics[player.key].trueskill_rating.mu)}</TableRowColumn>
                    <TableRowColumn>{playerStatistics[player.key].total_games}</TableRowColumn>
                    <TableRowColumn>{playerStatistics[player.key].games_won}</TableRowColumn>
                    <TableRowColumn>{this.formatPercent(playerStatistics[player.key].games_won, playerStatistics[player.key].total_games)}</TableRowColumn>
                    <TableRowColumn>{playerStatistics[player.key].games_lost}</TableRowColumn>
                    <TableRowColumn>{this.formatPercent(playerStatistics[player.key].games_lost, playerStatistics[player.key].total_games)}</TableRowColumn>
                  </TableRow>
                ))
            }
            </TableBody>
          </Table>
          : <LoadingCircle />
        }
      </div>
    );
  }
}
