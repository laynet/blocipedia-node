const wikiQueries = require("../db/queries.wikis.js");
const Authorizer = require("../policies/wiki");
const collaboratorQueries = require("../db/queries.collaborators.js");
const markdown = require("markdown").markdown;

module.exports = {
  index(req, res, next) {
    wikiQueries.getAllWikis((err, allWikis) => {
      if (err) {
        return res.redirect(500, "static/index");
      }
      if (!req.user) {
        return res.render("wikis/index", {
          wikis: allWikis.filter(wiki => {
            return wiki.private != true;
          })
        });
      }

      collaboratorQueries.getCollaborator(req, (err, collaborators) => {
        if (err) {
          return res.redirect(500, "static/index");
        }

        const wikis = allWikis.filter(wiki => {
          const isUserCollaborator = collaborators.find(collaborator => {});
          if (
            user.role == "premium" ||
            user.role == "admin" ||
            isUserCollaborator
          ) {
            return true;
          } else {
            return false;
          }
        });

        return res.render("wikis/index", { wikis });
      });
    });
  },

  //   index(req, res, next) {
  //     collaboratorQueries.getCollaborator((err, collaborators) => {

  //       if (currentUser.role == "premium" || currentUser.role == "admin") {
  //         wikiQueries.getAllWikis((err, wikis) => {
  //           if (err) {
  //             res.redirect(500, "static/index");
  //           } else {
  //             res.render("wikis/index", { wikis });
  //           }
  //         });
  //       } else {
  //         wikiQueries.getAllPublicWikis((err, wikis) => {
  //           if (err) {
  //             res.redirect(500, "static/index");
  //           } else {
  //             res.render("wikis/index", { wikis });
  //           }
  //         });
  //       }
  //     });
  //   },

  //   private(req, res, next) {
  //     wikiQueries.getAllPrivateWikis((err, wikis) => {
  //       if (err) {
  //         res.redirect(500, "static/index");
  //       } else {
  //         res.render("Wikis/private", { wikis });
  //       }
  //     });
  //   },
  new(req, res, next) {
    const authorized = new Authorizer(req.user).new();

    if (authorized) {
      res.render("wikis/new");
    } else {
      req.flash("notice", "You are not authorized to do that.");
      res.redirect("/wikis/index");
    }
  },
  create(req, res, next) {
    const authorized = new Authorizer(req.user).create();
    if (authorized) {
      let newWiki = {
        title: req.body.title,
        body: req.body.body,
        private: req.body.private,
        userId: req.user.id
      };
      wikiQueries.addWiki(newWiki, (err, wiki) => {
        if (err) {
          res.redirect(500, "wikis/new");
        } else {
          res.redirect(303, `/wikis/${wiki.id}`);
        }
      });
    } else {
      req.flash("notice", "You are not authorized to do that.");
      res.redirect("/wikis");
    }
  },
  show(req, res, next) {
    console.log("WIKI SHOW GET WIKI ", req.params.id);
    wikiQueries.getWiki(req.params.id, (err, wiki) => {
      if (err || wiki == null) {
        res.redirect(404, "/");
      } else {
        wiki.body = markdown.toHTML(wiki.body);
        res.render("wikis/show", { wiki });
      }
    });
  },
  destroy(req, res, next) {
    wikiQueries.deleteWiki(req, (err, wiki) => {
      if (err) {
        res.redirect(500, `/wikis/${req.params.id}`);
      } else {
        res.redirect(303, "/wikis/index");
      }
    });
  },
  edit(req, res, next) {
    console.log("WIKI EDIT GET WIKI ", req.params.id);
    wikiQueries.getWiki(req.params.id, (err, wiki) => {
      if (err || wiki == null) {
        res.redirect(404, "/");
      } else {
        const authorized = new Authorizer(req.user, wiki).edit();
        if (authorized) {
          res.render("wikis/edit", { wiki });
        } else {
          req.flash("notice", "You are not authorized to do that.");
          res.redirect(`/wikis/${req.params.id}`);
        }
      }
    });
  },
  update(req, res, next) {
    wikiQueries.updateWiki(req, req.body, (err, wiki) => {
      if (err || wiki == null) {
        res.redirect(401, `/wikis/${req.params.id}/edit`);
      } else {
        res.redirect(`/wikis/${req.params.id}`);
      }
    });
  }
};
