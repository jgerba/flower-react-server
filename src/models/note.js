const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema(
    {
        header: { type: String },
        text: { type: String },
        list: [{ item: { type: String }, isDone: { type: Boolean } }],
        alert: { type: Number },
        archived: { type: Boolean },
        order: { type: Number },
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
    },
    { timestamps: true }
);

const Note = mongoose.model('Note', noteSchema);

module.exports = Note;
