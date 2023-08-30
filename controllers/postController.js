const Post = require('../models/postModel');

exports.createPost = async (req, res, next) => {
    const { title, body, username, category, photo } = req.body;

    try {

        const post = await Post.create({
            title,
            body,
            username,
            category,
            photo
        })

        console.log(post)

        res.status(201).json(post)
    } catch (error) {
        res.status(401).json({
            message: "hhh"
        })
    }
}

// get all post
exports.getAllPost = async (req, res) => {
    const { username, category } = req.query;
    try {
        let posts;

        if (username) {
            posts = await Post.find({ username })
        } else if (category) {
            posts = await Post.find({
                category: {
                    $in: [category]
                }
            })
        } else {
            posts = await Post.find();
        }
        // const posts = await Post.find();
        res.status(200).json(posts)

    } catch (error) {
        res.status(4001).json({
            message: "post not found",
            error
        })
    }
}

// update post
exports.updatePost = async (req, res) => {
    const postId = req.params.postId;

    try {
        const post = await Post.findOne({ _id: postId });

        if (!post) {
            return res.status(401).json({
                message: "post not found"
            })
        }

        const updatedPost = await Post.updateOne({ _id: postId }, req.body)
        res.status(201).json({
            message: "post updated",
            updatedPost
        })


    } catch (error) {
        res.status(401).json({
            message: "something went wrong"
        })
    }
}

// delete post
exports.deletePost = async (req, res) => {
    const postId = req.params.postId;

    try {
        const post = await Post.findById(postId);

        if (!post) {
            return res.status(401).json({
                message: "post not found"
            })
        }

        const deletedPost = await Post.findByIdAndDelete(postId);
        res.status(200).json({
            message: "post deleted",
            deletedPost
        })

    } catch (error) {
        res.status(401).json({
            message: "not authorized",
            error
        })
    }
}

// delete post
exports.getPost = async (req, res) => {
    const postId = req.params.postId;

    try {
        const post = await Post.findOne({ _id: postId });

        if (!post) {
            return res.status(401).json({
                message: "post not found"
            })
        }

        res.status(200).json(post);

    } catch (error) {
        res.status(401).json({
            message: "not authorized",
            error
        })
    }
}