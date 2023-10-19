const mongoose = require('mongoose');

const bouquetSchema = new mongoose.Schema(
    {
        title: { type: String },
        price: { type: Number },
        description: { type: String },
        src: { type: String },
        flags: [String],
        new: { type: Boolean },
        sale: { type: Boolean },
        inCart: { type: Number },
    },
    { timestamps: true }
);

const Bouquet = mongoose.model('Bouquet', bouquetSchema);

module.exports = Bouquet;
