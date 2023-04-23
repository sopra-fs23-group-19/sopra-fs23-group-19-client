/**
 * Room model
 */
class Turn {
  constructor(data = {}) {
    this.id = null;
    this.drawingPlayerId = null;
    this.players = null;
    this.image = null;
    this.wordsToBeChosen = null;
    this.gameId = null;
    this.gameTurnStatus = null;
    this.gameStatus = null;
    this.drawingPhase = null;
    Object.assign(this, data);
  }
}
export default Turn;
