const express = require("express");
const router = express.Router();
const wikiQueries = require("../db/queries.wikis.js");
const collaboratorQueries = require("../db/queries.collaborators.js");
const Authorizer = require("../policies/application");

module.exports = {
  //   add(req, res, next) {
  //     res.render("collaborators/edit");
  //   },
  edit(req, res, next) {
    const wikis = wikiQueries.getWiki(req.params.id);
    console.log("%%%%%%%WIKIS", wikis);
    res.render("collaborators/edit", { wikis });
  }
};
