const mongoose = require("mongoose")
const Autor = require("../models/autor")


//pobieranie danych autorow (populate)
exports.autorzy_lista = (req,res,next)=>{
    Autor.find()
        .populate("ksiazki", "rok")
        .then(autorzy=> res.status(200).json(autorzy))
        .catch(err=> res.status(500).json({wiadomośc: err.message}))
}

// nowy autor
exports.autorzy_dodaj = (req, res, next) => {
    const { imie_nazw, rok_urodzenia } = req.body
    if (!imie_nazw || !rok_urodzenia) {
        return res.status(400).json({ wiadomość: "Brak wymaganych pól: imie_nazwisko lub rok_urodzenia" })
    }

    const autor = new Autor({
        _id: new mongoose.Types.ObjectId(),
        imie_nazw,
        rok_urodzenia,
        ksiazki: [],
    });

    autor.save()
        .then(result=>{
            res.status(201).json({
            wiadomość: "uwtorzenie nowego autora",
            dane: result
            })    
        })
        .catch(err=> res.status(500).json({wiadomośc: err.message}))
}

// znajdz autora po Id
exports.autorzy_getById = (req, res, next) => {
    const autorId = req.params.autorId
    Autor.findById(autorId)
        .populate("ksiazki")
        .then(autor=>{
            if (!autor){
                return res.status(404).json({wiadomośc: "nie znaleziono autora"})
            }
            res.status(200).json(autor)
        })
        .catch(err=> res.status(500).json({wiadomośc: err.message}))
}

// update autora
exports.autorzy_update = (req, res, next) => {
    const autorId = req.params.autorId;
    Autor.findByIdAndUpdate(
        autorId,
        {   imie_nazw: req.body.imie_nazw, 
            rok_urodzenia: req.body.rok_urodzenia, 
            ksiazki: req.body.ksiazki 
        },
        { new: true, runValidators: true }
    )
        .then((autor) => {
            if (!autor) {
                return res.status(404).json({ wiadomość: "nie znaleziono autora" });
            }
            res.status(200).json({ wiadomość: `zmiana danych autora o numerze ${autorId}` });
        })
        .catch((err) => res.status(500).json({ wiadomość: err.message }));
}

// usuwanie autora
exports.autorzy_delete = (req, res, next) => {
    const autorId = req.params.autorId;
    Autor.findOneAndDelete({ _id: autorId }) // Poprawione
        .then(autor => {
            if (!autor) {
                return res.status(404).json({ wiadomosc: `Nie znaleziono autora o podanym id` });
            }
            res.status(200).json({ wiadomosc: `usunięto autora o id: ${autorId}` });
        })
        .catch(err => res.status(500).json({ wiadomosc: err.message }));
};