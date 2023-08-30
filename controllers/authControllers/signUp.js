const User = require('../../models/userModel');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

exports.signUp = async (req, res) => {
    const salt = 11;
    req.body.password = await bcrypt.hash(req.body.password, salt);

    try {
        const { name, username, email, password, profile } = req.body;
        const user = await User.create({
            name,
            username,
            email,
            password,
            profile
        })

        res.status(201).json({
            message: `Hello ${name} your account is created`,
            user,
        });

    } catch (error) {
        res.status(401).json({
            message: "something went wrong"
        })
    }
}

// Login Controller
exports.login = async (req, res, next) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({
                message: "wrong credentials"
            })
        }

        const validated = await bcrypt.compare(password, user.password);

        if (!validated) {
            return res.status(400).json({
                message: "incorrect password",
            })
        }

        const token = await jwt.sign({ username, _id: user._id }, process.env.PRIVATE_KEY, { expiresIn: "2h" });
        
        res.status(200).json({
            message: "login successfull",
            token,
            user: {
                name: user.name,
                username: user.username
            }
        })

    } catch (error) {
        res.status(404).json({
            message: "not found!!"
        })
    }
}
