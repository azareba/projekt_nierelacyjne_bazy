const express = require("express")
const router = express.Router();

const KsiazkiController = require("../controllers/ksiazkiContr")

// lista ksiazek z info o autorze (populate)
router.get("/",KsiazkiController.ksiazki_getAll )

// dodanie nowej ksiazki
router.post("/",KsiazkiController.ksiazki_dodaj )

// liczba ksiazek na autora (agregazja, lookup)
router.get("/autor-stats", KsiazkiController.ksiazki_autorStats)

module.exports = router