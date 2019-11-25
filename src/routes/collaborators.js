const express = require("express");
const router = express.Router();
const collaboratorController = require("../controllers/collaboratorController");

router.post("/wikis/:id/collaborators/add", collaboratorController.add);
router.get("/wikis/:id/collaborators", collaboratorController.edit);
// router.post(
//   "/wikis/:wikiId/collaborators/remove",
//   collaboratorController.remove
// );

module.exports = router;
