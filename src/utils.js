export const findPlayer = (players, searchingPlayer) => {
  if (searchingPlayer.hasOwnProperty('slack_user_id')) {
    return Object.assign(searchingPlayer, players[searchingPlayer.slack_user_id]);
  }
  return Object.assign(searchingPlayer, Object.values(players).find(
    (player) => Object.keys(player.cards || {}).includes(searchingPlayer.card_uid)
  ) || {});
};
