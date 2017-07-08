export const findPlayer = (players, card_uid) => {
  return players.find(
    (player) => Object.keys(player.cards || {}).includes(card_uid)
  ) || {};
};