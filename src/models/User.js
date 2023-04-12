/**
 * User model
 * parse response after sending get_user_by_id
 */
class User {
  constructor(data = {}) {
    this.id = null;
    this.username = null;
    this.status = null;
    this.creationDate = null;
    this.bestScore = null;
    this.totalScore = null;
    Object.assign(this, data);
  }
}
export default User;
