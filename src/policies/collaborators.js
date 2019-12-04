const ApplicationPolicy = require("./application");

module.exports = class CollaboratorPolicy extends ApplicationPolicy {
  destroy() {
    return this._isPremium() || this._isAdmin();
  }
};
