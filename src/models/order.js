const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            lowercase: true,
            trim: true,
            maxlength: 30,
            required: [true, 'Name field is empty'],
        },
        phone: {
            type: Number,
            maxlength: 12,
            required: [true, 'Phone field is empty'],
        },
        email: {
            type: String,
            trim: true,
            lowercase: true,
            maxlength: 30,
        },
        recieverName: {
            type: String,
            lowercase: true,
            trim: true,
            maxlength: 30,
        },
        recieverPhone: { type: Number, maxlength: 12 },
        comment: { type: String, lowercase: true, trim: true, maxlength: 300 },
        delivery: { type: Boolean, default: false },
        address: {
            city: { type: String, lowercase: true, trim: true },
            street: { type: String, lowercase: true, trim: true },
            building: { type: String, lowercase: true, trim: true },
            house: { type: Number },
            flat: { type: Number },
            deliverTime: { type: String },
        },

        order: [Object],
        promo: { type: String, lowercase: true, trim: true, maxlength: 15 },
        totalPrice: { type: Number },
        done: { type: Boolean, default: false },
    },
    { timestamps: true }
);

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
