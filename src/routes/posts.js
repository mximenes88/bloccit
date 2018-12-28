const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController")
const validation = require("./validation");

router.get("/topics/:topicId/posts/new", postController.new);
router.post("/topics/:topicId/posts/create", validation.validatePosts, postController.create);
router.get("/topics/:topicId/posts/:id", postController.show);
router.get("/topics/:topicId/posts/:id/edit", postController.edit);
router.post("/topics/:topicId/posts/:id/update", postController.update);
router.post("/topics/:topicId/posts/:id/destroy", postController.destroy);

module.exports = router;