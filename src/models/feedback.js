const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            lowercase: true,
            trim: true,
            maxlength: 30,
            required: [true, 'Name field is empty'],
        },
        phone: {
            type: String,
            maxlength: 12,
            required: [true, 'Phone field is empty'],
        },
        comment: { type: String, lowercase: true, trim: true, maxlength: 300 },

        corporate: { type: Boolean, default: false },

        organization: {
            type: String,
            lowercase: true,
            trim: true,
            maxlength: 100,
        },
        address: {
            type: String,
            lowercase: true,
            trim: true,
            maxlength: 200,
        },

        price: {
            type: Number,
            min: 0,
            max: 10000,
        },

        email: {
            type: String,
            trim: true,
            lowercase: true,
            maxlength: 30,
        },

        unp: {
            type: Number,
            maxlength: 9,
            default: 0,
        },

        account: {
            type: Number,
            maxlength: 28,
            default: 0,
        },

        bank: {
            type: Number,
            maxlength: 9,
            default: 0,
        },

        entries: {
            type: Number,
            default: 1,
        },

        isDone: { type: Boolean, default: false },
    },
    { timestamps: true }
);

const Feedback = mongoose.model('Feedback', feedbackSchema);

module.exports = Feedback;
