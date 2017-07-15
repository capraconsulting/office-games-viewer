import React, { Component } from 'react';

import './WidgetHeader.css';

class WidgetHeader extends Component {
  render() {
    const { title } = this.props;
    return (
      <div className="widget-header">
        <div className="widget-header-title">{title}</div>
      </div>
    );
  }
}

export default WidgetHeader;
