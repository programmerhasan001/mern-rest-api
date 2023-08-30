const { Router } = require('express');
const { createPost, updatePost, getAllPost, deletePost, getPost } = require('../controllers/postController');
const { AuthMiddleware } = require('../Middlewares/auth');

const postRoute = Router();

postRoute.post("/", AuthMiddleware, createPost);
postRoute.get("/", getAllPost);
postRoute.get("/:postId", AuthMiddleware, getPost);
postRoute.put("/:postId", AuthMiddleware, updatePost);
postRoute.delete("/:postId", AuthMiddleware, deletePost);

module.exports = postRoute;
