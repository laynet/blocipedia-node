const Wiki = require("./models").Wiki;
const Authorizer = require("../policies/wiki");
const Collaborators = require("./models").Collaborators;
const User = require("./models").User;

module.exports = {
  getAllPublicWikis(callback) {
    return Wiki.findAll()
      .then(wikis => {
        callback(null, wikis);
      })
      .catch(err => {
        callback(err);
      });
  },
  getAllPrivateWikis(callback) {
    return Wiki.findAll({
      where: { private: true }
    })
      .then(wikis => {
        callback(null, wikis);
      })
      .catch(err => {
        callback(err);
      });
  },
  getWiki(id, callback) {
    return Wiki.findOne({
      where: {
        id: id
      },
      include: [
        {
          model: Collaborators,
          as: "collaborators",
          include: [
            {
              model: Wiki,
              as: "wiki,"
            },
            {
              model: User,
              as: "user"
            }
          ]
        }
      ]
    })
      .then(wiki => {
        callback(null, wiki);
      })
      .catch(err => callback(err));
    // console.log("GET WIKI RANNNNNNNNNNNN, id", id);
    // return Wiki.findById(id)
    //   .then(wiki => {
    //     console.log("!!!!!callback null ", wiki);
    //     callback(null, wiki);
    //   })
    //   .catch(err => {
    //     callback(err);
    //   });

    // var result = {};
    // return Wiki.findById(id).then(wiki => {
    //   if (!wiki) {
    //     // callback(404);
    //     console.log("&&&&&&&&&&&&&&CALLBACK WIKI ", wiki);
    //   } else {
    //     console.log("^^^^^^^^^^ ELSE CALLBACK WIKI ", wiki);
    //     result["wiki"] = wiki;
    //     Collaborators.scope({ method: ["collaboratorsFor", id] })
    //       .findAll()
    //       .then(collaborators => {
    //         result["collaborators"] = collaborators;
    //         callback(null, result);
    //       })
    //       .catch(err => {
    //         callback(err);
    //       });
    //   }
    // });
  },
  addWiki(newWiki, callback) {
    return Wiki.create({
      title: newWiki.title,
      body: newWiki.body,
      private: newWiki.private,
      userId: newWiki.userId
    })
      .then(wiki => {
        callback(null, wiki);
      })
      .catch(err => {
        callback(err);
      });
  },

  deleteWiki(req, callback) {
    return Wiki.findById(req.params.id)

      .then(wiki => {
        const authorized = new Authorizer(req.user, wiki).destroy();

        if (authorized) {
          wiki.destroy().then(res => {
            callback(null, wiki);
          });
        } else {
          req.flash("notice", "You are not authorized to do that.");

          callback(401);
        }
      })
      .catch(err => {
        console.log("error in delete wiki:", err);
      });
  },
  updateWiki(req, updatedWiki, callback) {
    return Wiki.findById(req.params.id).then(wiki => {
      if (!wiki) {
        return callback("Wiki not found");
      }
      const authorized = new Authorizer(req.user, wiki).update();
      if (authorized) {
        wiki
          .update(updatedWiki, {
            fields: Object.keys(updatedWiki)
          })
          .then(() => {
            callback(null, wiki);
          })
          .catch(err => {
            callback(err);
          });
      } else {
        req.flash("notice", "You are not authorized to do that.");
        callback("Forbidden");
      }
    });
  },
  privateToPublic(id) {
    return Wiki.findAll()
      .then(wikis => {
        wikis.forEach(wiki => {
          if (wiki.userId == id && wiki.private == true) {
            wiki.update({ private: false }).then(() => {
              console.log("wiki downgraded");
            });
          }
        });
      })
      .catch(err => {
        console.log(err);
      });
  }
};
