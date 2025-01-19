const mongoose = require("mongoose")

const ksiazkaSchema = mongoose.Schema({
    _id: mongoose.Types.ObjectID,
    tytul: {
        type: String,
        required: true,
    },
    autor: { type: mongoose.Schema.Types.ObjectID, ref: "Autor"},
    rok: {
        type: Number,
        required: true,
    }

})


module.exports= mongoose.model("Ksiazka", ksiazkaSchema)