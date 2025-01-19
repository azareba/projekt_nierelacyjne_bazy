const express = require("express")
const router = express.Router();

const UzytkownicyController = require("../controllers/uzytkownicyContr")

router.post("/wyporzycz",UzytkownicyController.wypozycz_ksiazke)

module.exports = router