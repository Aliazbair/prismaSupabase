const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// get all users
const AllUsers = async (req, res, next) => {
  try {
    const users = await prisma.user.findMany();
    return res.status(200).json({data:users});
  } catch (error) {
    res.status(404).json({ error: error });
  }
};

// get single user
const SingleUser = async (req, res, next) => {
  const { id } = req.params;
  const user = await prisma.user.findUnique({
    where: { id: Number(id) },
  });
  return res.status(200).json({ user });
};

// create new user
const CreateUser = async (req, res, next) => {
  const { email } = req.body;
  // const { username, password } = req.body;
  const newUser = await prisma.user.create({
    data: {
      email,
    },
  });

  return res
    .status(201)
    .json({ message: "user created success", data: newUser });
};

// create UpdateUser
const UpdateUser = async (req, res, next) => {
  const { username, password } = req.body;
  const updateUser = await prisma.user.update({
    where: { id: Number(req.params.id) },
    data: { username, password },
  });
  return res.json({ message: "updateUser", data: updateUser });
};

// delete user
const DeleteUser = async (req, res) => {
  const { id } = req.params;
  const deleteUser = await prisma.user.delete({ where: { id: Number(id) } });
  return res.status(200).json({ message: "user deleted successfully" });
};
module.exports = { AllUsers, CreateUser, SingleUser, UpdateUser, DeleteUser };
