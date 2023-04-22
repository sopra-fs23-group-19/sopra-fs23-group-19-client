/**
 * Public Room model
 */
class WaitRoom {
  constructor(data = {}) {
    this.id = null;
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
