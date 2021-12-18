const router = require("express").Router();
const {
  AllUsers,
  CreateUser,
  SingleUser,
  UpdateUser,
  DeleteUser,
} = require("../controllers/UserController");

// get all user and create new user
router.route("/").get(AllUsers).post(CreateUser);

// get single user & update & delete user
router.route("/:id").get(SingleUser).put(UpdateUser).delete(DeleteUser);

module.exports = router;
