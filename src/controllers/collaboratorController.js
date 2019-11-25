const express = require("express");
const router = express.Router();
const wikiQueries = require("../db/queries.wikis.js");
const collaboratorQueries = require("../db/queries.collaborators.js");
const Authorizer = require("../policies/application");

module.exports = {
  add(req, res, next) {
    collaboratorQueries.add(req, (err, collaborator) => {
      if (err) {
        console.log(err);
        req.flash("message", err);
      }

      res.redirect(req.headers.referer);
    });
  },
  edit(req, res, next) {
    console.log("COLLAB GET WIKI &&&&& RESULT ", result);
    wikiQueries.getWiki(req.params.id, (err, result) => {
      wiki = result["wiki"];
      collaborators = result["collaborators"];
      if (err) {
        console.log("Error", err);
      }
      res.render("collaborators/edit", { wiki, collaborators });
    });
  }
};
