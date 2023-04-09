/**
 * Room model
 */
class Room {
  constructor(data = {}) {
    this.mode = null;
    this.id = null;
    this.ownerId = null;
    this.name = null;
    this.players = null;
    Object.assign(this, data);
  }
}
export default Room;
