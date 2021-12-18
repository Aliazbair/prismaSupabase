const router = require("express").Router();
const { AllPosts, CreatePost } = require("../controllers/postController");

// get all user and create new user
router.route("/").get(AllPosts).post(CreatePost);

// get single user & update & delete user
// router.route("/:id").get(SingleUser).put(UpdateUser).delete(DeleteUser);

module.exports = router;
