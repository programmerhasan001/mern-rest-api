const { Router } = require('express');
const { signUp, login } = require('../../controllers/authControllers/signUp');
const authRouter = Router();

authRouter.post('/signup', signUp);
authRouter.post('/login', login);


module.exports = authRouter;