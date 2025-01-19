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
exports.ksiazki_autorStats = (req,res,next)=>{
    Ksiazka.aggregate([
        {
            $group: {
                _id: "$autor",
                liczba_ksiazek: {$sum: 1},
                tytuly_ksiazek: {$push: "$tytul"}
            }
        },
        {
           $lookup: {
                from: "autorzy",
                // {
                //     connectionName: "project1lab01",
                //     db: "biblioteka",
                //     coll: "autorzy"
                // },
                localField: "_id",
                foreignField: "_id",
                as: "autor_dane"

           }
        }
    ])
        .then(stats=>{
            res.status(200).json(stats)
        })
        .catch(err=> res.status(500).json({wiadomośc: err.message}))
}