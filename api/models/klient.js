const mongoose = require("mongoose")

const klientSchema = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    imie_nazw: String,
    rok_urodzenia: Date,
    wypozyczone_ksiazki: [{ type: mongoose.Schema.Types.ObjectId, ref: "Ksiazka"}] 
})

module.exports= mongoose.model("Klient", klientSchema)