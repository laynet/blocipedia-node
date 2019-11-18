const express = require("express");
const router = express.Router();
const collaboratorController = require("../controllers/collaboratorController");

// router.post("/wikis/:wikiId/collaborators/add", collaboratorController.add);
router.get("/wikis/:wikiId/collaborators", collaboratorController.add);
module.exports = router;
