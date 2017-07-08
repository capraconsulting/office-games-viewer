import React, { Component } from 'react';
import { Row, Col } from 'react-flexbox-grid';

import CircularProgress from 'material-ui/CircularProgress';

import './LoadingCircle.css';

type Props = {
  size: Number
};

class LoadingCircle extends Component {
  props: Props

  static defaultProps = {
    size: 300
  };

  render() {
    const { size } = this.props;
    return (
      <Row middle="xs" center="xs" className="loading-circle">
        <Col><CircularProgress size={size} thickness={15} /></Col>
      </Row>
    );
  }
}

export default LoadingCircle;
