module.exports = {
  index(req, res, next) {
    if (req.user) {
      console.log("!!!!!!!!!!!!!!USER:", req.user);
    }
    res.render("static/index", { title: "Welcome to Blocipedia" });
  }
};
