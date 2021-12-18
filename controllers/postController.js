const { PrismaClient } = require("@prisma/client");

const {post} = new PrismaClient();

// get all users
const AllPosts = async (req, res, next) => {
  try {
    const posts = await post.findMany();
    return res.status(200).json({ data: posts });
  } catch (error) {
    res.status(404).json({ error: error });
  }
};

const CreatePost=async (req, res) => {
    
    try {
        const newPost=await post.create({data:req.body});
         return res
           .status(201)
           .json({ message: "post created success", data: newPost });
    } catch (error) {
         res.status(404).json({ error: error });
    }
}

module.exports = { AllPosts ,CreatePost};