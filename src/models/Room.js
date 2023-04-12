/**
 * Room model
 */
class Room {
  constructor(data = {}) {
    this.id = null;
    this.ownerId = null;
    this.mode = null;
    this.name = null;
    this.players = null;
    Object.assign(this, data);
  }
}
export default Room;
