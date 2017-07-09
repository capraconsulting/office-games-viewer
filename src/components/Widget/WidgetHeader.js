import React, { Component } from 'react';

import AppBar from 'material-ui/AppBar';

import './WidgetHeader.css';

class WidgetHeader extends Component {
  render() {
    const { title } = this.props;
    return (
      <AppBar
        title={<div className="widget-header-title">{title}</div>}
        showMenuIconButton={false}
        className="widget-header"
      />
    );
  }
}

export default WidgetHeader;
