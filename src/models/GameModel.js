class GameModel {
  constructor(data = {}) {
    this.id = null;
    this.roomname = null;
    this.role = null; //
    this.status = null; // start? submit?
    this.painting = null; // drawing display or save
    this.ranking = null; //list

    Object.assign(this, data);
  }
}
export default GameModel;
