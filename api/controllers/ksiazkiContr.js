const mongoose = require("mongoose")
const Ksiazka = require("../models/ksiazka")

// lista ksiazek z info o autorze (populate)
exports.ksiazki_lista = (req,res,next)=>{
    Ksiazka.find()
        .populate("autor")
        .then(ksiazki => res.status(200).json({
            wiadomośc: "lista książek i ich autorzy",
            lista: ksiazki
        }))
        .catch(err=> res.status(500).json({wiadomośc: err.message}))
}

// dodanie nowej ksiazki
exports.ksiazki_dodaj = (req,res,next)=>{
    const ksiazka = new Ksiazka({
        _id: new mongoose.Types.ObjectId(),
        tytul: req.body.tytul,
        autor: req.body.autor,
        rok: req.body.rok

    })

    ksiazka.save()
        .then(nowaKsiazka=>{
            res.status(201).json({
                wiadomośc: "utworzenie nowej książki",
                dane: nowaKsiazka
            })
        })
        .catch(err=> res.status(500).json({wiadomośc: err}))
}

// liczba ksiazek na autora (agregazja, lookup)
exports.ksiazki_autorStats = (req, res, next) => {
    Ksiazka.aggregate([
        {
            $group: {
                _id: "$autor",
                liczba_ksiazek: { $sum: 1 },
                tytuly_ksiazek: { $push: "$tytul" }
            }
        },
        {
            $addFields: {
                autor: { $toObjectId: "$_id" } 
            }
        },
        {
            $lookup: {
                from: "autors",
                localField: "autor", 
                foreignField: "_id",
                as: "autor_dane"
            }
        }
    ])
    .then(stats => {
        res.status(200).json(stats);
    })
    .catch(err => res.status(500).json({ wiadomość: err.message }));
};



exports.ksiazki_getById = (req, res, next) => {
    const ksiazkaId = req.params.ksiazkaId
    Ksiazka.findById(ksiazkaId)
        .populate("ksiazki")
        .then(ksiazka=>{
            if (!ksiazka){
                return res.status(404).json({wiadomośc: "nie znaleziono książki"})
            }
            res.status(200).json(ksiazka)
        })
        .catch(err=> res.status(500).json({wiadomośc: err.message}))
}


exports.ksiazki_update = (req, res, next) => {
    const ksiazkaId = req.params.ksiazkaId;
    Autor.findByIdAndUpdate(
        ksiazkaId,
        {   tytul: req.body.tytul,
            autor: req.body.autor,
            rok: req.body.rok
        },
        { new: true, runValidators: true }
    )
        .then((ksiazka) => {
            if (!ksiazka) {
                return res.status(404).json({ wiadomość: "nie znaleziono książki" });
            }
            res.status(200).json({ wiadomość: `zmiana danych książki o numerze ${ksiazkaId}` });
        })
        .catch((err) => res.status(500).json({ wiadomość: err.message }));
}

exports.ksiazki_delete = (req, res, next) => {
    const ksiazkaId = req.params.ksiazkaId

    Ksiazka.findOneAndDelete(ksiazkaId)
    .then(ksiazka => {
        if (!ksiazka) {
            return res.status(404).json({wiadomosc: `nie znaleziono książki o podanym id`})
        }
        res.status(200).json({wiadomosc: `usunieto ksiazke o podanym ${ksiazkaId}`})
    })
    .catch((err) => res.status(500).json({ wiadomość: err.message }))
}