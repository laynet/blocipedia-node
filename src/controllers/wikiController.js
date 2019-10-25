const wikiQueries = require("../db/queries.wikis.js");

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
  }
  //   new(req, res, next) {
  //     res.render("wikis/new");
  //   }
};
