const { validateToken } = require('../utils/authentication');

function checkForAuthenticationCookie(cookieName) {
    return (req, res, next) => {
        const tokenCookieValue = req.cookies[cookieName];

        const userPayload = validateToken(tokenCookieValue);

        req.user = userPayload;
        next();
    }
}

module.exports = {
    checkForAuthenticationCookie,
}