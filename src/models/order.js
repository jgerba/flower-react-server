const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
    {
        name: {
            type: String,
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
            maxlength: 30,
            required: [true, 'Email field is empty'],
        },
        recieverPhone: { type: Number, maxlength: 12 },
        recieverName: { type: String, trim: true, maxlength: 12 },
        comment: { type: String, trim: true, maxlength: 300 },
        delivery: { type: Boolean },
        address: [
            {
                city: { type: String },
                street: { type: String },
                building: { type: String },
                house: { type: String },
                flat: { type: String },
                deliverTime: { type: Number },
            },
        ],
        order: [Object],
        promo: { type: String, trim: true, maxlength: 15 },
        totalPrice: { type: Number },
    },
    { timestamps: true }
);

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
