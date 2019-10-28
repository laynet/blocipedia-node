module.exports = {
  index(req, res, next) {
    console.log("^^^^^^^^^^^^^^^^^^^^^^^^^REQ USER ", req.user);
    res.render("static/index", { title: "Welcome to Blocipedia" });
  }
};
