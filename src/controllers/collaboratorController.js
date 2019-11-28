const express = require("express");
const router = express.Router();
const wikiQueries = require("../db/queries.wikis.js");
const collaboratorQueries = require("../db/queries.collaborators.js");
const Authorizer = require("../policies/application");

module.exports = {
  add(req, res, next) {
    console.log("@@@@@@@@@@@COLLAB ADD RAN - REQ.user ", req.user);
    collaboratorQueries.add(req, (err, collaborator) => {
      if (err) {
        console.log(err);
        req.flash("message", err);
      }
      res.redirect(req.headers.referer);
    });
  },
  edit(req, res, next) {
    console.log("++++++++++++++REQ ", req.params.wikiId);
    wikiQueries.getWiki(req.params.wikiId, (err, wiki) => {
      const collaborators = wiki.collaborators;
      if (err || wiki == null) {
        res.redirect(404, "/");
      } else {
        const authorized = new Authorizer(req.user, wiki, collaborators).edit();
        if (authorized) {
          res.render("collaborators/edit", { wiki, collaborators });
        } else {
          req.flash("You are not authorized to do that.");
          res.redirect(`/wikis/${req.params.wikiId}`);
        }
      }
    });
  }
};
