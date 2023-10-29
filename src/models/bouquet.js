const mongoose = require('mongoose');

const bouquetSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            trim: true,
            maxlength: 25,
            required: [true, 'Title field is empty'],
        },
        price: { type: Number, required: [true, 'Price field is empty'] },
        oldPrice: { type: Number },
        description: { type: String, maxlength: 300 },
        src: { type: String, required: [true, 'Src field is empty'] },
        flags: [String],
        new: { type: Boolean },
        sale: { type: Boolean },
        inCart: { type: Number },
    },
    { timestamps: true }
);

const Bouquet = mongoose.model('Bouquet', bouquetSchema);

module.exports = Bouquet;
