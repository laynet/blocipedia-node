const userQueries = require("../db/queries.users.js");
const passport = require("passport");
const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

module.exports = {
  signUp(req, res, next) {
    res.render("users/signup");
  },
  signInForm(req, res, next) {
    res.render("users/sign_in");
  },
  create(req, res, next) {
    let newUser = {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      passwordConfirmation: req.body.passwordConfirmation
    };
    console.log("NEW USER", newUser);
    userQueries.createUser(newUser, (err, user) => {
      if (err) {
        req.flash("error", err);
        res.redirect("/users/signup");
      } else {
        passport.authenticate("local")(req, res, () => {
          req.flash("notice", "You've successfully signed in!");
          res.redirect("/");
        });
        const msg = {
          to: newUser.email,
          from: "test@example.com",
          subject: "Sending with Twilio SendGrid is Fun",
          text: "and easy to do anywhere, even with Node.js",
          html: "<strong>and easy to do anywhere, even with Node.js</strong>"
        };
        sgMail.send(msg);
      }
    });
  },

  signIn(req, res, next) {
    passport.authenticate("local")(req, res, () => {
      if (!req.user) {
        req.flash("notice", "Sign in failed. Please try again.");
        res.redirect("/users/sign_in");
      } else {
        req.flash("notice", "You've successfully signed in!");
        res.redirect("/");
      }
    });
  },
  signOut(req, res, next) {
    req.logout();
    req.flash("notice", "You've successfully signed out!");
    res.redirect("/");
  },

  upgrade(req, res, next) {
    res.render("users/upgrade");
  },
  success(req, res, next) {
    console.log("SUCCESS REQ PARAMS ID", req.params.id);
    userQueries.upgrade(req.params.id, (err, user) => {
      if (err) {
        req.flash("error", err);
        res.redirect("/users/upgrade");
      } else {
        req.flash("notice", "You've succesfully updated your account");
        res.redirect("/");
      }
    });
  },
  downgrade(req, res, next) {
    res.render("users/downgrade");
  },
  confirmDowngrade(req, res, next) {
    userQueries.downgrade(req, (err, user) => {
      if (err) {
        req.flash("error", err);
        res.redirect("/users/downgrade");
      } else {
        req.flash("error", "You are no longer a premium user");
        res.redirect("/");
      }
    });
  }
};
