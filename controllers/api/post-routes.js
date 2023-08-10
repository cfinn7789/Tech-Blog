const router = require('express').Router();
const { Post } = require('../../models');

const withAuth = require('../utils/auth');

router.get('/post', async (req, res) => {
    try {
        const posts = await Post.find();
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching comments.' });
    }
});

router.post('/post/:id', withAuth, async (req, res) => {
    try {
        const { content } = req.body; // 

        const newPost = new Post({ content });
        await newPost.save();

        res.status(201).json(newPost);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while creating a post.' });
    }
});

router.delete('/post/:id', withAuth, async (req, res) => {
    try {
        const postId = req.params.id;

        const deletedPost = await Post.findByIdAndDelete(commentId);

        if (!deletedPost) {
            res.status(404).json({ error: 'Post not found.' });
            return;
        }

        res.status(200).json({ message: 'Post deleted successfully.' });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while deleting the post.' });
    }
});

module.exports = router;