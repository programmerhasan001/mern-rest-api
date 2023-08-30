const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

exports.AuthMiddleware = async (req, res, next) => {

    try {
        const token = req.headers.authorization;

        if (!token) {
            return res.status(401).json({
                message: "access not allow"
            })
        }

        const sToken = token.split(" ")[1];
        const decode = jwt.verify(sToken, process.env.PRIVATE_KEY);
        const id = decode._id;

        const user = await User.findOne({ _id: id });
        req.user = user;

        if (!user) {
            return res.status(401).json({
                message: "unauthorize"
            })
        }

        next();

    } catch (error) {
        res.status(401).json({
            message: "authentication failed"
        })
    }

}