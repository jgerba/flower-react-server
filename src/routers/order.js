const express = require('express');
const router = new express.Router();
const Order = require('../models/order');
const auth = require('../middleware');

router.get('/orders', auth, async (req, res) => {
    try {
        const orders = await Order.find();

        if (orders.length === 0) return res.status(204).send();

        res.send(orders);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

router.post('/order', async (req, res) => {
    const order = new Order({ ...req.body });

    try {
        await order.save();

        res.status(201).send(order);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

router.patch('/order/:id', auth, async (req, res) => {
    const updates = Object.keys(req.body);

    try {
        const order = await Order.findById(req.params.id);
        if (!order) return res.status(404).send();

        updates.forEach(async update => {
            order[update] = req.body[update];
            return;
        });

        await order.save();

        res.send(order);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

router.delete('/order/:id', auth, async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) return res.status(404).send();

        await order.deleteOne();
        res.send();
    } catch (error) {
        res.status(400).send(error.message);
    }
});

router.delete('/orders', auth, async (req, res) => {
    try {
        await Order.deleteMany();

        res.send();
    } catch (error) {
        res.status(400).send(error.message);
    }
});

module.exports = router;
