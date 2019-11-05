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
router.get("/users/upgrade", userController.upgrade);
router.post("/users/upgrade", userController.success);
router.post("/users/downgrade", userController.downgrade);

module.exports = router;
