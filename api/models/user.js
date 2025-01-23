const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    mail: String,
    haslo: String
})


module.exports= mongoose.model("User", userSchema)