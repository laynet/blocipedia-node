module.exports = {
  signup(req, res, next) {
    res.render("/users/signup", userController.signup);
  }
};
