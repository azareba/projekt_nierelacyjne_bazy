const express = require("express")
const router = express.Router();

const AutorzyController = require("../controllers/autorzyContr")

//pobieranie danych autorow
router.get("/", AutorzyController.autorzy_lista)

// dodaj nowego autora
router.post("/", AutorzyController.autorzy_dodaj )

//autor po id
router.get("/:autorId", AutorzyController.autorzy_getById)

module.exports = router