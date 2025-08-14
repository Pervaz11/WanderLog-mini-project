const express = require("express");
const router = express.Router();
const travelListController = require("../controllers/travelListController");
const auth = require("../middlewares/authMiddleware");

router.get("/", travelListController.getTravelLists);
router.get("/:id", travelListController.getTravelListById);
router.post("/", auth, travelListController.createTravelList);
router.patch("/:id", auth, travelListController.patchTravelList);
router.delete("/:id", auth, travelListController.deleteTravelList);

module.exports = router;
