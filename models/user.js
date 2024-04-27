const { Schema, model } = require('mongoose');
const { createHmac, randomBytes } = require('node:crypto');
const { createTokenForUser } = require('../utils/authentication');

const userSchema = new Schema({
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    salt: {
        type: String,
    },
    profileImageUrl: {
        type: String,
        default: '/images/user_avatar.png',
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: 'user',
    }
}, { timestamps: true });

userSchema.pre("save", function (next) {
    const user = this;

    if(!user.isModified("password")) return;
    
    const salt = randomBytes(16).toString();
    const hash = createHmac("sha256", salt).update(user.password).digest("hex");

    this.salt = salt;
    this.password = hash;

    next();
});

userSchema.static('matchPasswordAndGenerateToken', async function(email, password) {
    const user = await this.findOne({ email });
    if(!user) throw new Error("User not found. Invalid Email");

    const hash = createHmac("sha256", user.salt).update(password).digest("hex");
    if(user.password !== hash) throw new Error("Invalid Password");

    const token = createTokenForUser(user);
    return token;
})

const User = model('user', userSchema);

module.exports = User;