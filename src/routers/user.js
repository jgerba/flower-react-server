const express = require('express');
const User = require('../models/user');
const auth = require('../middleware');
const router = new express.Router();

router.post('/login', async (req, res) => {
    try {
        const user = await User.matchUser(req.body.email, req.body.password);
        const token = await user.generateAuthToken();

        res.send({ user, token });
    } catch (error) {
        res.status(404).send(error.message);
    }
});

router.post('/create_user', async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();

        const token = await user.generateAuthToken();

        res.status(201).send({ user, token });
    } catch (error) {
        res.status(406).send(error.message);
    }
});

router.get('/user_profile', auth, async (req, res) => {
    try {
        res.send(req.user);
    } catch (error) {
        res.status(404).send(error.message);
    }
});

router.patch('/user_profile', auth, async (req, res) => {
    const updates = Object.keys(req.body);
    try {
        updates.forEach(update => (req.user[update] = req.body[update]));
        await req.user.save();

        res.send(req.user);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

router.post('/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter(
            token => token.token !== req.token
        );
        await req.user.save();
        res.send();
    } catch (error) {
        res.status(400).send(error.message);
    }
});

router.post('/logout_all', auth, async (req, res) => {
    try {
        req.user.tokens = [];
        await req.user.save();

        res.send();
    } catch (error) {
        res.status(400).send(error.message);
    }
});

router.delete('/user_profile', auth, async (req, res) => {
    try {
        await req.user.deleteOne();
        res.send();
    } catch (error) {
        res.send(error.message);
    }
});

module.exports = router;
