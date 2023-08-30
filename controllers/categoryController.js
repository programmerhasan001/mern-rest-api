const Category = require('../models/categoryModel');

exports.createCategory = async (req, res) => {
    const { name } = req.body;

    try {
        const category = await Category.create({
            name
        })

        res.status(200).json({
            message: "created category",
            category
        })

    } catch (error) {
        res.status(401).json({
            message: "something went wrong",
            error
        })
    }
}

// Get all caterogy
exports.getAllCategory = async (req, res) => {

    try {
        const categories = await Category.find();

        if (!categories) {
            return res.status(401).json({
                message: "categories not found"
            })
        }

        res.status(200).json(categories)

    } catch (error) {
        res.status(401).json({
            message: "something went wrong",
            error
        })
    }
}