class TurnRankModel {
  constructor(data = {}) {
    // this.image = null; // drawing display or save
    this.userScore = 0;
    this.targetWord = null; //
    this.score1 = "0";
    this.score2 = "0";
    this.score3 = "0";
    this.score4 = "0";
    //player usernames
    this.username1 = "";
    this.username2 = "";
    this.username3 = "";
    this.username4 = "";
    // player numbers
    this.playerNum = 2;
    this.Object.assign(this, data);
  }
}
export default TurnRankModel;
