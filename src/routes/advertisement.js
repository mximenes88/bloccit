const express = require("express");
const router = express.Router();
const advertisementController = require("../controllers/advertisementController")

router.get("/advertisement", advertisementController.index);
router.get("/advertisement/new", advertisementController.new);
router.post("/advertisement/create", advertisementController.create);
router.get("/advertisement/:id", advertisementController.show);
router.post("/advertisement/:id/destroy", advertisementController.destroy);
router.get("/advertisement/:id/edit", advertisementController.edit);
router.post("/advertisement/:id/update", advertisementController.update);


module.exports = router;