import React from 'react';

class Player extends React.Component {
  constructor() {
    super();
    this.state = {
      player: {}
    };
  }

  componentWillMount() {
    this.getPlayer(this.props.id)
  }

  getPlayer = (userId) => {
    this.props.rebase.fetch(`/players/${userId}`, {
      context: this,
      asArray: true,
    }).then((player) => {
      console.log("player", player);
      this.setState({player})
    })
  }

  render() {
    return (
      <div>
        {this.props.index}. {this.state.player[2]}
      </div>
    )
  }
}

export default Player;
