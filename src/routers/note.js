const express = require('express');
const router = new express.Router();
const Note = require('../models/note');
const auth = require('../middleware');

router.post('/note', auth, async (req, res) => {
    let note = new Note({ ...req.body, owner: req.user._id });

    try {
        await note.save();

        res.status(201).send(note);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

router.get('/notes', auth, async (req, res) => {
    try {
        await req.user.populate({
            path: 'notes',
            match: { archived: false },
            options: { sort: { order: -1 } },
        });

        if (req.user.notes.length === 0) return res.status(204).send();

        res.send(req.user.notes);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

router.get('/notes/archive/', auth, async (req, res) => {
    try {
        await req.user.populate({ path: 'notes', match: { archived: true } });

        if (req.user.notes.length === 0) return res.status(204).send();

        req.user.notes.sort(
            (a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt)
        );
        res.send(req.user.notes);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

router.patch('/note/:id', auth, async (req, res) => {
    const updates = Object.keys(req.body);

    try {
        let note = await Note.findById(req.params.id);
        if (!note) return res.status(404).send();

        updates.forEach(async update => {
            note[update] = req.body[update];
            return;
        });

        await note.save();

        res.send(note);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

router.patch('/notes/order', auth, (req, res) => {
    try {
        req.body.forEach(async item => {
            const note = await Note.findById(item._id);
            note.order = item.order;

            await note.save();
        });

        res.send();
    } catch (error) {
        res.status(400).send(error.message);
    }
});

router.delete('/note/:id', auth, async (req, res) => {
    try {
        const note = await Note.findById(req.params.id);

        if (!note) return res.status(404).send();

        await note.remove();

        res.send();
    } catch (error) {
        res.status(400).send(error.message);
    }
});

router.delete('/notes/archive/', auth, async (req, res) => {
    try {
        await Note.deleteMany({
            owner: req.user._id,
            archived: true,
        });

        res.send();
    } catch (error) {
        res.status(400).send(error.message);
    }
});

module.exports = router;
