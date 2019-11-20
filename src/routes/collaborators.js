const express = require("express");
const router = express.Router();
const collaboratorController = require("../controllers/collaboratorController");

router.post("/wikis/:wikiId/collaborators/edit", collaboratorController.edit);
router.get("/wikis/:wikiId/collaborators", collaboratorController.edit);
// router.post(
//   "/wikis/:wikiId/collaborators/remove",
//   collaboratorController.remove
// );

module.exports = router;
