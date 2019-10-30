const ApplicationPolicy = require("./application");

module.exports = class WikiPolicy extends ApplicationPolicy {
  new() {
    this._isStandard();
  }
  create() {
    return this.new();
  }
  edit() {
    return this.create();
  }
  update() {
    return this.edit();
  }
  destroy() {
    return this.update();
  }
};
