const User = require("./models").User;
const Wiki = require("./models").Wiki;
const Collaborator = require("./models").Collaborators;
const Authorizer = require("../policies/application");

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
    console.log("fucking kill me");
    //     console.log("}}}}} queries collaborator is running");
    //     const collaboratorId = req.body.collaborator;
    //     console.log("((((((( COLLaboror ID ", collaboratorId);
    //     let wikiId = req.params.wikiId;
    //     console.log(")))))))))))))))) remove wikiId ", wikiId);
    //     const authorized = new Authorizer(
    //       req.user,
    //       wikiId,
    //       collaboratorId
    //     ).destroy();
    //     console.log("=======Authorized ", authorized);
    //     if (authorized) {
    //       Collaborator.destroy({
    //         where: {
    //           userId: collaboratorId,
    //           wikiId: wikiId
    //         }
    //       })
    //         .then(deletedRecordscount => {
    //           callback(null, deletedRecordscount);
    //         })
    //         .catch(err => {
    //           callback(err);
    //         });
    //     } else {
    //       req.flash("notice", "You are not authorized to do that.");
    //       callback(401);
    //     }
  }
};
