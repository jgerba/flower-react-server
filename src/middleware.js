const jwt = require('jsonwebtoken');
const User = require('./models/user');

const auth = async (req, res, next) => {
    try {
        // get auth key
        const token = req.header('Authorization').replace('Bearer ', '');
        // decode to get user's id
        const decodedToken = jwt.decode(token, process.env.JWT_SECRET);
        const user = await User.findOne({
            _id: decodedToken._id,
            'tokens.token': token,
        });

        if (!user) throw new Error('Please authenticate');
        req.user = user;
        req.token = token;
        next();
    } catch (error) {
        res.status(404).send(error.message);
    }
};

module.exports = auth;
