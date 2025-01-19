const mongoose = require("mongoose")
const Autor = require("../models/autor")


//pobieranie danych autorow
exports.autorzy_lista = (req,res,next)=>{
    Autor.find()
        .populate("ksiazki", "rok")
        .then(autorzy=> res.status(200).json(autorzy))
        .catch(err=> res.status(500).json({wiadomośc: err.message}))
}

// nowy autor
exports.autorzy_dodaj = (req,res,next)=>{
    const autor = new Autor({
        _id: new mongoose.Types.ObjectId(),
        imie_nazw: req.body.imie_nazw,
        rok_urodzenia: req.body.rok_urodzenia,
        ksiazki:[]
    })

    autor.save()
        .then(result => res.status(201).json(result))
        .catch(err=> res.status(500).json({wiadomośc: err.message}))
}

// znajdz autora po Id
exports.autorzy_getById = (req, res, next) => {
    Autor.findById(req.params.autorId)
        .populate("ksiazki")
        .then(autor=>{
            if (!autor){
                return res.status(404).json({wiadomośc: "nie znaleziono autora"})
            }
            res.status(200).json(autor)
        })
        .catch(err=> res.status(500).json({wiadomośc: err.message}))
}