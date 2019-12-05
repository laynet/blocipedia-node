const User = require("./models").User;
const Wiki = require("./models").Wiki;
const Collaborator = require("./models").Collaborators;
const Authorizer = require("../policies/collaborators");
const wikiQueries = require("../db/queries.wikis.js");

module.exports = {
  add(req, callback) {
    console.log("COLLAB QUERIES REQ USER ");
    if (req.user.username == req.body.collaborator) {
      return callback("Cannot add yourself to collaborators!");
    }
    User.findAll({
      where: {
        username: req.body.collaborator
      }
    })
      .then(users => {
        if (!users[0]) {
          return callback("User not found.");
        }
        Collaborator.findAll({
          where: {
            userId: users[0].id,
            wikiId: req.params.wikiId
          }
        })
          .then(collaborators => {
            if (collaborators.length != 0) {
              return callback(
                `${req.body.collaborator} is already a collaborator on this wiki.`
              );
            }
            let newCollaborator = {
              userId: users[0].id,
              wikiId: req.params.wikiId
            };
            return Collaborator.create(newCollaborator)
              .then(collaborator => {
                callback(null, collaborator);
              })
              .catch(err => {
                callback(err, null);
              });
          })
          .catch(err => {
            callback(err, null);
          });
      })
      .catch(err => {
        callback(err, null);
      });
  },
  getCollaborator(req, callback) {
    Collaborator.findAll({
      where: {
        userId: req.user.id
      }
    })
      .then(collaborators => {
        callback(null, collaborators);
      })
      .catch(err => {
        callback(err, null);
      });
  },
  remove(req, callback) {
    const authorized = new Authorizer(req.user);
    if (authorized) {
      Collaborator.findAll({
        where: {
          userId: req.body.collaborator,
          wikiId: req.params.wikiId
        }
        // Remember that the collaborator model has userId and wikId
        // You need to look up collaborator records where userId is equal to `req.body.collaborator`
        // and wikiId is equal to `req.params.wikiId`
      })
        .destroy()
        .then(() => {
          req.flash("Collaborator was deleted");
          res.redirect(`/wikis/${req.params.wikiId}/collaborators`);
          // flash notice that the collaborator was deleted
          // redirect back to the page they were on
        })
        .catch(err => {
          req.flash("Error");
          console.log(err);
          res.redirect(`/wikis/${req.params.wikiId}/collaborators`);
          // flash notice that there was an error
          // redirect back to the page they were on
        });
    } else {
      req.flash("You are not authorized to do that.");
      res.redirect(`/wikis/${req.params.wikiId}/collaborators`);
    }
  }
};
