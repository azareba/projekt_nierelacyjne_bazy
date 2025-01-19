const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    _id: mongoose.Types.ObjectID,
    imie_nazw: {
        type: String,
        required: [true, "PLS podaj imie i nazwisko"]},
    rok_urodzenia: {
        type: Number,
        required: true},
    wypozyczone_ksiazki: [{ type: mongoose.Schema.Types.ObjectID, ref: "Ksiazka"}] 

})


module.exports= mongoose.model("User", userSchema)