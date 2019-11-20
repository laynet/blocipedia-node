const express = require("express");
const router = express.Router();
const wikiQueries = require("../db/queries.wikis.js");
const collaboratorQueries = require("../db/queries.collaborators.js");
const Authorizer = require("../policies/application");
const wikis = wikiQueries.getWiki();

module.exports = {
  //   add(req, res, next) {
  //     res.render("collaborators/edit");
  //   },
  edit(req, res, next) {
    res.render("collaborators/edit", { wikis });
  }
};
