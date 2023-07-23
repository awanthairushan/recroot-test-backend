const Post = require('../models/postModel');
const addPost = async (req, res) => {
    const {header, body, postedDate, authorName} = req.body;
    if (!header || typeof header !== "string" || header === "") {
        res.status(400).json({message: "Header is invalid", data: null});
    } else if (!body || typeof body !== "string" || body === "") {
        res.status(400).json({message: "Body is invalid", data: null});
    } else if (!postedDate || isNaN(postedDate)) {
        res.status(400).json({message: "Posted date is invalid", data: null});
    } else if (!authorName || typeof authorName !== "string" || authorName === "") {
        res.status(400).json({message: "Author is invalid", data: null});
    } else {
        try {
            const post = await Post.create({
                header: header,
                body: body,
                postedDate: postedDate,
                authorName: authorName
            })
            res.status(200).json({message: "Post saved successfully", data: post});
        } catch (error) {
            res.status(500).json({message: "Post save unsuccessful", data: error});
        }
    }
}

const getPosts = async (req, res) => {
    try {
        const posts = await Post.find();
        res.status(200).json({message: "Posts synced successfully", data: posts});
    } catch (error) {
        res.status(500).json({message: "Posts sync unsuccessful", data: error});
    }
}

const deletePost = async (req, res) => {
    const post = await Post.findById(req.params.id);
    if (post) {
        try {
            await Post.findByIdAndDelete(req.params.id);
            res.status(200).json({message: "Post deleted successfully", data: post});
        } catch (error) {
            res.status(500).json({message: "Post delete unsuccessful", data: error});
        }
    } else {
        res.status(200).json({message: "Post not found", data: null});
    }
}

const updatePost = async (req, res) => {
    const {header, body, postedDate, authorName} = req.body;
    if (!header || typeof header !== "string" || header === "") {
        res.status(400).json({message: "Header is invalid", data: null});
    } else if (!body || typeof body !== "string" || body === "") {
        res.status(400).json({message: "Body is invalid", data: null});
    } else if (!postedDate || isNaN(postedDate)) {
        res.status(400).json({message: "Posted date is invalid", data: null});
    } else if (!authorName || typeof authorName !== "string" || authorName === "") {
        res.status(400).json({message: "Author is invalid", data: null});
    } else {
        const post = await Post.findById(req.params.id);
        if (post) {
            try {
                const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, {new: true});
                res.status(200).json({message: "Post updated successfully", data: updatedPost});
            } catch (error) {
                res.status(500).json({message: "Post update unsuccessful", data: error});
            }
        } else {
            res.status(200).json({message: "Post not found", data: null});
        }
    }
}


module.exports = {addPost: addPost, getPosts: getPosts, deletePost: deletePost, updatePost: updatePost}