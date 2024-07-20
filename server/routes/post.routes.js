const router = require("express").Router();
const postController = require("../controllers/post.controller.js")

router.get("/", postController.allPosts)
router.post("/", postController.addPosts)

router.get("/:id", postController.onePost)
router.get("/search/:query", postController.searchPost)

router.delete("/:id", postController.deletedPost);
router.put("/:id", postController.editPost);

module.exports = router;