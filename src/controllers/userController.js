module.exports = {
  signUp(req, res, next) {
    res.render("users/signup");
  },
  create(req, res, next) {
    let newUser = {
      username: req.body.username,
      emaile: req.body.email,
      password: req.body.password,
      passwordConfirmation: req.body.passwordConfirmation
    };
    userQueries.createUser(newUser, (err, user) => {
      if (err) {
        req.flash("error", err);
        res.redirect("/users/sign_up");
      } else {
        // #3
        passport.authenticate("local")(req, res, () => {
          req.flash("notice", "You've successfully signed in!");
          res.redirect("/");
        });
      }
    });
  }
};
