export function getGroupMates(players, player) {
  const otherPlayers = _.reject(players, (p) => p._id === player._id)
  return otherPlayers.filter(
    (_p) => _p.get("groupIdTag") === player.get("groupIdTag")
  )
}

export function getGroupTags(players) {
  return [...new Set(players.map((_p) => _p.get("groupIdTag")))]
}
