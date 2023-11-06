const express = require('express');
const router = new express.Router();
const Feedback = require('../models/feedback');
const auth = require('../middleware');

router.get('/feedbacks', auth, async (req, res) => {
    try {
        const feedbacks = await Feedback.find();

        if (feedbacks.length === 0) return res.status(204).send();

        res.send(feedbacks);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

router.post('/feedback', async (req, res) => {
    const feedback = new Feedback({ ...req.body });

    try {
        await feedback.save();

        res.status(201).send(feedback);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

router.patch('/feedback/:id', auth, async (req, res) => {
    const updates = Object.keys(req.body);

    try {
        const feedback = await Feedback.findById(req.params.id);
        if (!feedback) return res.status(404).send();

        updates.forEach(async update => {
            feedback[update] = req.body[update];
            return;
        });

        await feedback.save();

        res.send(feedback);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

router.delete('/feedback/:id', auth, async (req, res) => {
    try {
        const feedback = await Feedback.findById(req.params.id);
        if (!feedback) return res.status(404).send();

        await feedback.deleteOne();
        res.send();
    } catch (error) {
        res.status(400).send(error.message);
    }
});

router.delete('/feedbacks', auth, async (req, res) => {
    try {
        await Feedback.deleteMany();

        res.send();
    } catch (error) {
        res.status(400).send(error.message);
    }
});

module.exports = router;
