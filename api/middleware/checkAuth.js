require('dotenv').config();

const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {

    if (!req.headers.authorization) {
        return res.status(401).json({Message: 'Brak tokenu'})
    }

    const token = req.headers.authorization.split(" ")[1];
    try {
        jwt.verify(token, process.env.JWT_KEY);
        next();
    } catch (err) {
        return res.status(401).json({Message: 'Błąd weryfikacji'});
    }
};
