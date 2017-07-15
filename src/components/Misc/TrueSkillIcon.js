import React, { Component } from 'react';

import './TrueSkillIcon.css';

type Props = {
  red: boolean,
  orange: boolean,
  green: boolean,
  quality: number
};

class PlayerStats extends Component {
  props: Props

  static defaultProps = {
    red: false,
    orange: false,
    green: false,
    quality: null
  };

  render() {
    const { red, orange, green, quality } = this.props;
    let color = 'primary';

    if (red) {
      color = 'red';
    } else if (orange) {
      color = 'orange_light';
    } else if (green) {
      color = 'green';
    } else if (quality !== null) {
      if (quality < 0.2) {
        color = 'red';
      } else if (quality < 0.5) {
        color = 'orange';
      } else {
        color = 'green';
      }
    }

    if (quality !== null) {
      return (
        <div className="trueskill-wrapper">
          <img className="trueskill-icon" src={`./trueskill_${color}.png`} alt="TrueSkill icon" />
          <span className="trueskill-icon-quality">{Math.round(quality * 100 * 100) / 100}%</span>
        </div>
      );
    }

    return (
      <img className="trueskill-icon" src={`./trueskill_${color}.png`} alt="TrueSkill icon" />
    );
  }
}

export default PlayerStats;
