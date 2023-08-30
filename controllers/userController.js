const User = require('../models/userModel');
const bcrypt = require('bcrypt');

exports.getAllUsers = async (req, res, next) => {
    console.log(req.user, "user")
    try {
        const users = await User.find();
        res.status(200).json(users)
    } catch (error) {
        res.status(401).json({
            message: "something went wrong"
        })
    }
}


// update user profile
exports.updateUser = async (req, res) => {
    const userId = req.params.userId;
    try {
        const user = await User.findById(userId);

        if (!user) {
            return res.status(400).json({
                message: "wrong user"
            })
        }

        if (req.body.password) {
            req.body.password = await bcrypt.hash(req.body.password, 11);
        }


        // const updatedUser = await User.findByIdAndUpdate(userId, req.body, { new: true });
        const updateUser = await User.updateOne({ _id: userId }, req.body)

        res.status(200).json({
            message: "profile updated successfully"
        })

    } catch (error) {
        res.status(401).json({
            message: "you can update only your account"
        })
    }
}

// delete user
exports.deleteUser = async (req, res) => {
    const { userId } = req.params;

    try {
        const user = User.findById(userId);
        if (!user) {
            return res.status(400).json({
                message: "wrong user"
            })
        }

        const deletedUser = await User.findByIdAndDelete(userId);

        res.status(200).json({
            message: "deleted",
            deletedUser
        })
    } catch (error) {
        res.status(401).json({
            message: "you're not an authenticated user"
        })
    }
}