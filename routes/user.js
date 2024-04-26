const { Router } = require('express');
const { handleUserSignup, handleUserSignin } = require('../controllers/user');

const router = Router();

router.get('/signin', (req, res) => {
    return res.render('signin');
});

router.get('/signup', (req, res) => {
    return res.render('signup');
});

router.post('/signup', handleUserSignup);

router.post('/signin', handleUserSignin);

module.exports = router;