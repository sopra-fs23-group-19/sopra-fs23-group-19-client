class GameModel {
  constructor(data = {}) {
    this.drawingPlayerId = null;
    this.drawingPlayerName = null;
    this.role = "";
    // this.image = null; // drawing display or save
    this.targetWord = null; //
    //player usernames
    this.username1 = "";
    this.username2 = "";
    this.username3 = "";
    this.username4 = "";
    // player numbers
    this.playerNum = 2;
    //three words to be choosen
    this.word0 = "";
    this.word1 = "";
    this.word2 = "";
    this.Object.assign(this, data);
  }
}
export default GameModel;
