const { Router } = require('express');
const { getAllUsers, updateUser, deleteUser } = require('../controllers/userController');
const { AuthMiddleware } = require('../Middlewares/auth');

const userRoute = Router();

userRoute.get("/", AuthMiddleware, getAllUsers)
userRoute.put("/:userId", AuthMiddleware, updateUser)
userRoute.delete("/:userId", AuthMiddleware, deleteUser)

module.exports = userRoute;