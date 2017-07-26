import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';

import { TableHeaderColumn } from 'material-ui/Table';

import './TableHeaderSortColumn.css';

export default class TableHeaderSortColumn extends Component {
  render() {
    const { id, label, onSort } = this.props;
    return (
      <TableHeaderColumn>
        <span>
          <span>{label}</span>
          <span>
            <FontAwesome
              className="table-header-sort-icon"
              name="sort"
              onMouseUp={() => onSort(id)}
            />
          </span>
        </span>
      </TableHeaderColumn>
    );
  }
}
