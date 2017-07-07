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
      context: this
    }).then((player) => {
      console.log("player", player);
      this.setState({player})
    })
  }

  render() {
    return (
      <div>
        {this.props.index+1}. {this.state.player.slack_first_name} - {this.props.rating}
      </div>
    )
  }
}

export default Player;
