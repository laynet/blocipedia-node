const express = require("express");
const router = express.Router();
const wikiQueries = require("../db/queries.wikis.js");
const collaboratorQueries = require("../db/queries.collaborators.js");
const Authorizer = require("../policies/application");

module.exports = {
  add(req, res, next) {
    // res.render("collaborators/edit");
    // collaboratorQueries.add(req, (err, collaborator) => {
    //   if (err) {
    //     console.log(err);
    //     req.flash("message", err);
    //   }
    //   res.redirect(req.headers.referer);
    // });
  },
  edit(req, res, next) {
    const wiki = wikiQueries.getWiki(req.params.id);
    res.render("collaborators/edit", { wiki });
  }
};
