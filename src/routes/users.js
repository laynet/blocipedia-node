const express = require("express");
const router = express.Router();
const validation = require("./validation");
const userController = require("../controllers/userController");

router.get("/users/signup", userController.signUp);
router.post(
  "/users/signup",
  validation.validateSignUpUsers,
  userController.create
);
router.get("/users/sign_in", userController.signInForm);
router.post(
  "/users/sign_in",
  validation.validateSignInUsers,
  userController.signIn
);
router.get("/users/sign_out", userController.signOut);
router.get("/users/upgrade", userController.upgrade);

router.post("/users/:id/upgrade", userController.success);
router.post("/users/downgrade", userController.downgrade);
router.get("/users/downgrade", userController.downgrade);

module.exports = router;
