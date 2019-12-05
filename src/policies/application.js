module.exports = class ApplicationPolicy {
  constructor(user, record) {
    this.user = user;
    this.record = record;
  }
  _hasUser() {
    return this.user != null;
  }
  _isStandard() {
    return this.user && this.user.role == "standard";
  }
  _isOwner() {
    return this.record && this.record.userId == this.user.id;
  }
  _isAdmin() {
    return this.user && this.user.role == "admin";
  }
  _isPremium() {
    return this.user && this.user.role == "premium";
  }
  new() {
    return this.user != null;
  }
  create() {
    return this.new();
  }
  show() {
    return true;
  }
  edit() {
    if (this.record.private == false) {
      return (
        this.new() &&
        this.record &&
        (this._isStandard() || this._isAdmin() || this._isPremium())
      );
    } else if (this.record.private == true) {
      return (
        this.new() && this.record && (this._isAdmin() || this._isPremium())
      );
    }
  }
  update() {
    return this.edit();
  }
  destroy() {
    return this.update();
  }
};
