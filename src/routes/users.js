const express = require("express");
const router = express.Router();
const validation = require("./validation");
const userController = require("../controllers/userController");

router.get("/users/sign_up", userController.signUp);
router.post(
  "/users/sign_up",
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
router.get("/users/upgrade_downgrade", userController.upgradeForm);
router.post("/users/:id/upgrade", userController.upgrade);

module.exports = router;
