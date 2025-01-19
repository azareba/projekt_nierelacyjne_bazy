const mongoose = require("mongoose")

const autorSchema = mongoose.Schema({
    _id: mongoose.Types.ObjectID,
    imie_nazw: {
        type: String,
        required: true,
    },
    rok_urodzenia: {
        type: Number,
        required: true,
    },
    ksiazki: [{ type: mongoose.Schema.Types.ObjectID, ref: "Ksiazka"}], // referencje do ksiazaek autora
    // gatunek: [String]

})


module.exports= mongoose.model("Autor", autorSchema)