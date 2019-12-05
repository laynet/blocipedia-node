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
          const isUserCollaborator = collaborators.find(collaborator => {
            return (
              collaborator.userId === req.user.id &&
              collaborator.wikiId === wiki.id
            );
          });
          if (
            req.user.role == "premium" ||
            req.user.role == "admin" ||
            isUserCollaborator ||
            !wiki.private
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
    wikiQueries.getWiki(req.params.id, (err, wiki) => {
      if (err || wiki == null) {
        res.redirect(404, "/");
      } else {
        const authorized = new Authorizer(req.user, wiki).edit(
          wiki.collaborators
        );

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
