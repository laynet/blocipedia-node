const wikiQueries = require("../db/queries.wikis.js");
const Authorizer = require("../policies/wiki");

module.exports = {
  index(req, res, next) {
    wikiQueries.getAllWikis((err, wikis) => {
      if (err) {
        console.log("ERROR ", err);
        res.redirect(500, "static/index");
      } else {
        res.render("wikis/index", { wikis });
      }
    });
  },
  new(req, res, next) {
    const authorized = new Authorizer(req.user).new();
    console.log("!!!!!!!!!!!!!!!!!", authorized);
    console.log("ADD WIKI REQ.USER ", req.user);
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
      console.log("SHOW ERROR ", err);
      if (err || wiki == null) {
        res.redirect(404, "/");
      } else {
        res.render("wikis/show", { wiki });
      }
    });
  },
  destroy(req, res, next) {
    wikiQueries.deleteWiki(req.params.id, (err, wiki) => {
      if (err) {
        res.redirect(500, `/wikis/${wiki.id}`);
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
        const authorized = new Authorizer(req.user).edit();
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
      console.log("UPDATE ERROR ", err);
      if (err || wiki == null) {
        res.redirect(401, `/wikis/${req.params.id}/edit`);
      } else {
        res.redirect(`/wikis/${req.params.id}`);
      }
    });
  }
};
