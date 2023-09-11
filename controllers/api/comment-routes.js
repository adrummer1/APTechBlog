const router = require('express').Router();
const { Comment } = require('../../models');
const wAuth = require('../../utils/auth');

router.post('/', wAuth, (req, res) => {
    Comment.create({ ...req.body, userId: req.session.userId })
    .then(newComment => {
        res.json(newComment);
    })
    .catch(err => {
        res.status(500).json(err);
    });
});

module.exports = router;