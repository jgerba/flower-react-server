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
            type: Number,
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
            min: 1,
            maxlength: 10,
        },

        email: {
            type: String,
            trim: true,
            lowercase: true,
            maxlength: 30,
        },

        unp: {
            type: Number,
            min: 9,
            maxlength: 9,
        },

        account: {
            type: Number,
            min: 28,
            maxlength: 28,
        },

        bank: {
            type: Number,
            min: 9,
            maxlength: 9,
        },

        entries: {
            type: Number,
            min: 1,
        },

        isDone: { type: Boolean, default: false },
    },
    { timestamps: true }
);

const Feedback = mongoose.model('Feedback', feedbackSchema);

module.exports = Feedback;
