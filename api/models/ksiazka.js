const mongoose = require("mongoose")

const ksiazkaSchema = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    tytul: {
        type: String,
        required: true,
    },
    autor: { type: mongoose.Schema.Types.ObjectId, ref: "Autor"},
    rok: {
        type: Number,
        required: true,
    }

})


module.exports= mongoose.model("Ksiazka", ksiazkaSchema)