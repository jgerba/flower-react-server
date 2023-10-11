const mongoose = require('mongoose');

const bouquetSchema = new mongoose.Schema(
    {
        title: { type: String },
        price: { type: Number },
        description: { type: String },
        src: { type: String },
        flags: [{ flag: { type: String }, check: { type: Boolean } }],
        new: { type: Boolean },
        sale: { type: Boolean },
    },
    { timestamps: true }
);

const Bouquet = mongoose.model('Bouquet', bouquetSchema);

module.exports = Bouquet;
