const router = require('express').Router();
const { Post, Comment, User } = require('../models');

router.get('/', (req, res) => {
    Post.findAll({
        include: [User],
    })
    .then((dbPostData) => {
        const posts = dbPostData.map((post) => post.get({ plain: true }));
        res.render('all-posts', { posts });
    })
    .catch((err) => {
        res.json(500).json(err);
    });
});

router.get('/post/:id', (req, res) => {
    Post.findByPk(req.params.id, {
        include: [
            User,
            {
                model: Comment,
                include: [User],
            },
        ],
    })
    .then((dbPostData) => {
        if (dbPostData) {
            const post = dbPostData.get({ plain: true });
            res.render('single-posts', { post });
        } else {
            res.status(404).end();
        }
    })
    .catch((err) => {
        res.status(500).json(err);
    });
});

router.get('/signup', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('signup');
});

router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('login');
});

router.get('/layouts/dashboard', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('dashboard');
});

module.exports = router;