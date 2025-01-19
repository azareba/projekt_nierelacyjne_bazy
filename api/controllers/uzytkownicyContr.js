const mongoose = require("mongoose")
const User = require("../models/user")


exports.wypozycz_ksiazke = (req, res, next) => {
    const { userId, ksiazkaId } = req.body;

    User.findByIdAndUpdate(userId, { $push: { wypozyczone_ksiazki: ksiazkaId } }, { new: true })
        .populate("wypozyczone_ksiazki", "tytul")
        .then(user => {
            if (!user) {
                return res.status(404).json({ wiadomośc: "nie znaleziono użytkownika" });
            }
            res.status(200).json(user);
        })
        .catch(err => res.status(500).json({ wiadomośc: err.message }));
};