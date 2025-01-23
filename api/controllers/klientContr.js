const mongoose = require("mongoose")
const Klient = require("../models/klient")


exports.wypozycz_ksiazke = (req, res, next) => {
    const { klientId, ksiazkaId } = req.body;

    Klient.findByIdAndUpdate(klientId, { $push: { wypozyczone_ksiazki: ksiazkaId } }, { new: true })
        .populate("wypozyczone_ksiazki", "tytul")
        .then(klient => {
            if (!klient) {
                return res.status(404).json({ wiadomośc: "nie znaleziono użytkownika" });
            }
            res.status(200).json(klient);
        })
        .catch(err => res.status(500).json({ wiadomośc: err.message }));
};


//pobieranie danych Klientow
exports.klienci_lista = (req,res,next)=>{
    Klient.find()
    .then(klient => {
        if (!klient) {
            return res.status(404).json({wiadomosc: `nie znaleziono klientów w bazie`})
        }
        res.status(200).json({wiadomosc: `lista klientów`, list: klient})
    })
    .catch(err => res.status(500).json({ wiadomośc: err.message }));
}

// nowy Klient

exports.klienci_dodaj = (req, res, next) => {
    const { imie_nazw, rok_urodzenia } = req.body
    if (!imie_nazw || !rok_urodzenia) {
        return res.status(400).json({ wiadomość: "Brak wymaganych pól: imie_nazw lub rok_urodzenia" })
    }

    const klient = new Klient({
        _id: new mongoose.Types.ObjectId(),
        imie_nazw,
        rok_urodzenia
    });

    klient.save()
        .then(result=>{
            res.status(200).json({
            wiadomość: "uwtorzenie nowego klienta",
            dane: result
            })    
        })
        .catch(err=> res.status(500).json({wiadomośc: err.message}))
}

// znajdz Klienta po Id
exports.klienci_getById = (req, res, next) => {
    const klientId = req.params.klientId
    Klient.findById(klientId)
        .then(klient=>{
            if (!klient){
                return res.status(404).json({wiadomośc: "nie znaleziono klienta"})
            }
            res.status(200).json(klient)
        })
        .catch(err=> res.status(500).json({wiadomośc: err.message}))
}

// update Klienta
exports.klienci_update = (req, res, next) => {
    const klientId = req.params.klientId;
    Klient.findByIdAndUpdate(
        klientId,
        {   imie_nazw: req.body.imie_nazw, 
            rok_urodzenia: req.body.rok_urodzenia
        },
        { new: true, runValidators: true }
    )
        .then(klient => {
            if (!klient) {
                return res.status(404).json({ wiadomość: "nie znaleziono klienta" });
            }
            res.status(200).json({ wiadomość: `zmiana danych klienta o numerze ${klientId}` });
        })
        .catch((err) => res.status(500).json({ wiadomość: err.message }));
}

exports.klienci_delete = (req, res, next) => {
    const klientId = req.params.klientId

    Klient.findOneAndDelete(klientId)
    .then(klient => {
        if (!klient) {
            return res.status(404).json({wiadomosc: `nie znaleziono klienta o podanym id`})
        }
        res.status(200).json({wiadomosc: `usunieto klienta o podanym ${klientId}`})
    })
    .catch((err) => res.status(500).json({ wiadomość: err.message }))
}