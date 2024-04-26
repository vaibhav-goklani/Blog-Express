const User = require('../models/user');

async function handleUserSignup(req, res) {
    const { fullName, email, password } = req.body;
    await User.create({
        fullName,
        email,
        password,
    });
    return res.redirect('/');
}

async function handleUserSignin(req, res) {
    const { email, password } = req.body;
    const user = await User.matchPassword(email, password);
    
    console.log("User: ", user);

    return res.redirect('/');
}

module.exports = {
    handleUserSignup,
    handleUserSignin,
}