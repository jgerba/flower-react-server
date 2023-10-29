const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        maxlength: 30,
        required: [true, 'Name field is empty'],
    },

    password: {
        type: String,
        trim: true,
        validate(value) {
            if (!validator.isStrongPassword(value))
                throw new Error(
                    'Password must contain: minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1'
                );
        },
    },

    tokens: [{ token: { type: String, required: true } }],
});

// generating auth token
userSchema.methods.generateAuthToken = async function () {
    const user = this;
    const token = jwt.sign(
        { _id: user._id.toString() },
        process.env.JWT_SECRET
    );

    user.tokens = user.tokens.concat({ token });
    await user.save();

    return token;
};

// deleting user private properties before returning
userSchema.methods.toJSON = function () {
    const userObject = this.toObject();

    delete userObject.password;
    delete userObject.tokens;

    return userObject;
};

// match email & password
userSchema.statics.matchUser = async function (email, password) {
    const user = await User.findOne({ email });

    if (!user) throw new Error('Unable to login. Wrong user name or password');

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch)
        throw new Error('Unable to login. Wrong user name or password');

    return user;
};

// hashing password before 'save'
userSchema.pre('save', async function (next) {
    const user = this;

    if (user.isModified('password'))
        user.password = await bcrypt.hash(user.password, 8);

    next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
