const mongoose = require('mongoose');
const { comparePassword } = require('~v1/middleware/userMiddleware');

const userRoles = ['customer', 'admin'];

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        min: 6,
        max: 255,
        trim: true,
    },
    email: {
        type: String,
        min: 6,
        max: 255,
        trim: true,
        validate: {
            validator: function (v) {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
            },
            message: (props) => `${props.value} is not a valid email!`,
        },
    },

    password: {
        type: String,
        min: 8,
        max: 124,
    },

    phone: {
        type: String,
        min: 10,
        max: 10,
        trim: true,
    },

    addresses: [
        {
            street: { type: String, trim: true },
            city: { type: String, trim: true },
            district: { type: String, trim: true },
            postalCode: { type: String, trim: true },
        },
    ],
    points: { type: Number, default: 0 },

    role: { type: String, enum: userRoles, default: 'customer' },
    resetToken: { type: String, default: null },
    resetTokenExpiry: { type: Date, default: null },
    createAt: {
        type: Date,
        default: Date.now,
    },
});

userSchema.methods.comparePassword = comparePassword;

module.exports = mongoose.model('Account', userSchema);
