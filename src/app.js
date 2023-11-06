const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const usersRouter = require('./routers/user');
const bouquetsRouter = require('./routers/bouquet');
const ordersRouter = require('./routers/order');
const feedbackRouter = require('./routers/feedback');

const app = express();
const port = process.env.PORT || 3001;
const publicDir = path.join(__dirname, '../public');

app.use(express.static(publicDir));
app.use(express.json());
app.use(usersRouter);
app.use(bouquetsRouter);
app.use(ordersRouter);
app.use(feedbackRouter);

mongoose.connect(process.env.MONGO_URL);

app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});
