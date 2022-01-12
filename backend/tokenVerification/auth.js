const jwt = require('jsonwebtoken');

const {TOKEN_SECRET } = process.env;

const validateToken = (req, res, next) => {
    const token = req.body.token || req.headers['x-access-token'];

    if (!token) {
        return res.status(403).send('You have to have a token to proceed!')
    }

    try {
        const decoded = jwt.verify(token, TOKEN_SECRET);
        req.user = decoded;
    } catch (e) {
        return res.status(401).send('Token is invalid!');
    }
    return next();
}

module.exports = validateToken;