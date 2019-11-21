const User = require("./models").User;
const Wiki = require("./models").Wiki;
const Collaborator = require("./models").Collaborators;
const Authorizer = require("../policies/application");

module.exports = {
  add(req, callback) {
    console.log("QUERIES COLLAB ADD RAN");
    if (req.user.username === req.body.collaborator) {
      return callback("You cannot add yourself to collaborators!");
    }
    User.findAll({
      where: {
        username: req.body.collaborator
      }
    });
  }
};
