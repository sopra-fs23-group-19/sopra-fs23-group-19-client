/**
 * Room model
 */
class Room {
  constructor(data = {}) {
    this.id = null;
    this.ownerId = null;
    this.roomName = null;
    this.roomSeats = null;
    this.status= null;
    this.numberOfPlayers = null;
    this.players = null;
    Object.assign(this, data);
  }
}
export default Room;
