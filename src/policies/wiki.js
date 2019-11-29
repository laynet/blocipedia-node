const ApplicationPolicy = require("./application");

module.exports = class WikiPolicy extends ApplicationPolicy {
  new() {
    return this._isStandard() || this._isPremium() || this._isAdmin();
  }
  create() {
    return this.new();
  }
  edit() {
    if (this.record.private == false) {
      return this._hasUser();
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
