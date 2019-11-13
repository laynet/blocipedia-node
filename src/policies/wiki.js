const ApplicationPolicy = require("./application");

module.exports = class WikiPolicy extends ApplicationPolicy {
  new() {
    return this._isStandard() || this._isPremium();
  }
  create() {
    return this.new();
  }
  edit() {
    return this._isStandard() || this._isPremium();
  }
  update() {
    return this.edit();
  }
  destroy() {
    return this.update();
  }
};
