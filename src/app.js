const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const userRouter = require('./routers/user');
const noteRouter = require('./routers/note');

const app = express();
const port = process.env.PORT || 3001;
const publicDir = path.join(__dirname, '../public');

app.use(express.static(publicDir));
app.use(express.json());
app.use(userRouter);
app.use(noteRouter);

mongoose.connect(process.env.MONGO_URL);

app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});
