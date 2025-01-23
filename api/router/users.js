const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");


router.post("/rejestracja", (req, res, next) => {
    bcrypt.hash(req.body.haslo, 10, (err, hash) => {
        if (err) return res.status(500).json({wiadomość: err})
        const user = new User ({
        _id: new mongoose.Types.ObjectId(),
        mail: req.body.mail,
        haslo: hash
        })
        user
        .save()
        .then(() => {
            res.status(201).json({wiadomość: "dodano użytkownika"})
        })
    })
})

router.post("/logowanie", (req, res, next) => {
    User
    .findOne({mail: req.body.mail})
    .then(user => {
        if (!user) return res.status(401).json({wiadomość: "Błąd autoryzacji"})
            //weryfikuje haslo
        bcrypt.compare(req.body.haslo, user.haslo, (err, result) => {
            if (err) return res.status(500).json({wiadomość: err});
            if (!result) return res.status(401).json({wiadomość: "Błąd autoryzacji"});
                //jak jest ok to komunikat
            const token = jwt.sign(
                {user: user._id, mail: user.mail},
                
                process.env.JWT_KEY, 
                
                {expiresIn: "1d"}
            )
            return res.status(200).json(token);
        })
    })
})


module.exports = router