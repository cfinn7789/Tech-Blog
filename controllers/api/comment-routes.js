const router = require('express').Router();
const { Comment } = require('../../models');

const withAuth = require('../utils/auth');

router.get('/comment', async (req, res) => {
    try {
        const comments = await Comment.find();
        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching comments.' });
    }
});

router.post('/comment/:id', withAuth, async (req, res) => {
    try {
        const { content } = req.body; // 

        const newComment = new Comment({ content });
        await newComment.save();

        res.status(201).json(newComment);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while creating a comment.' });
    }
});

router.delete('/comment/:id', withAuth, async (req, res) => {
    try {
        const commentId = req.params.id;

        const deletedComment = await Comment.findByIdAndDelete(commentId);

        if (!deletedComment) {
            res.status(404).json({ error: 'Comment not found.' });
            return;
        }

        res.status(200).json({ message: 'Comment deleted successfully.' });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while deleting the comment.' });
    }
});

module.exports = router;