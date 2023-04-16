class LoginModel {
  constructor(data = {}) {
    this.id = null;
    this.username = null;
    this.status = null;
    this.creationDate = null;
    this.token = null;
    // this.totalScore = null;
    Object.assign(this, data);
  }
}
export default LoginModel;
