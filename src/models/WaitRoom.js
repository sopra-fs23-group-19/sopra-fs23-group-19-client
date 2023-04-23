/**
 * Public Room model
 */
class WaitRoom {
  constructor(data = {}) {
    this.id = null;
    //added for swiching to correct game.
    this.gameId = null;
    this.gameTurnId = null;
    this.roomName = null;
    this.roomSeats = null;
    this.ownerId = null;
    this.players = null;
    this.status = null;
    this.numberOfPlayers = null;
    Object.assign(this, data);
  }
}
export default WaitRoom;
