const User = require('../models/user');

async function handleUserSignup(req, res) {
    const { fullName, email, password } = req.body;
    await User.create({
        fullName,
        email,
        password,
    });
    const token = await User.matchPasswordAndGenerateToken(email, password);
    return res.cookie("token", token).redirect('/');
};

async function handleUserSignin(req, res) {
    const { email, password } = req.body;
    try{
        const token = await User.matchPasswordAndGenerateToken(email, password);
        return res.cookie("token", token).redirect('/');
    }
    catch(err){
        return res.render('signin', {
            error: "Incorrect Email or Password",
        })
    }
};

module.exports = {
    handleUserSignup,
    handleUserSignin,
}