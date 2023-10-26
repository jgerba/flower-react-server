const express = require('express');
const router = new express.Router();
const Bouquet = require('../models/bouquet');
const auth = require('../middleware');

router.get('/bouquets', async (req, res) => {
    try {
        const bouquets = await Bouquet.find();

        if (bouquets.length === 0) return res.status(204).send();

        res.send(bouquets);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

router.post('/bouquet', auth, async (req, res) => {
    let bouquet = new Bouquet({ ...req.body });

    try {
        await bouquet.save();

        res.status(201).send(bouquet);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

router.patch('/bouquet/:id', auth, async (req, res) => {
    const updates = Object.keys(req.body);

    try {
        let bouquet = await Bouquet.findById(req.params.id);
        if (!bouquet) return res.status(404).send();

        updates.forEach(async update => {
            bouquet[update] = req.body[update];
            return;
        });

        await bouquet.save();

        res.send(bouquet);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

router.delete('/bouquet/:id', auth, async (req, res) => {
    try {
        const bouquet = await Bouquet.findById(req.params.id);

        if (!bouquet) return res.status(404).send();

        await bouquet.remove();

        res.send();
    } catch (error) {
        res.status(400).send(error.message);
    }
});

router.delete('/bouquets', auth, async (req, res) => {
    try {
        await Bouquet.deleteMany();

        res.send();
    } catch (error) {
        res.status(400).send(error.message);
    }
});

module.exports = router;
