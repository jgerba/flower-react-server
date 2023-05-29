const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Note = require('./note');

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            maxlength: 15,
            required: [true, 'Name field is empty'],
        },
        email: {
            type: String,
            trim: true,
            lowercase: true,
            unique: true,
            validate(value) {
                if (!validator.isEmail(value))
                    throw new Error('Email is invalid');
            },
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
        nightMode: { type: Boolean, default: false },
        customColors: { type: Boolean, default: false },
        colorsProfile: [{ element: { type: String }, color: { type: String } }],
        tokens: [{ token: { type: String, required: true } }],
    },
    { timestamps: true }
);

userSchema.virtual('notes', {
    ref: 'Note',
    foreignField: 'owner',
    localField: '_id',
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
    userObject.colorsProfile.forEach(item => delete item._id);

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

// delete users notes before deleting user
userSchema.pre('remove', async function (next) {
    await Note.deleteMany({ owner: this._id });
    next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
