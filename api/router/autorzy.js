const express = require("express")
const router = express.Router();

const AutorzyController = require("../controllers/autorzyContr")

//pobieranie danych autorow
router.get("/lista", AutorzyController.autorzy_lista)

// dodaj nowego autora
router.post("/dodaj", AutorzyController.autorzy_dodaj )

//autor po id
router.get("/:autorId", AutorzyController.autorzy_getById)

router.put("/:autorId", AutorzyController.autorzy_update)

router.delete("/:autorId", AutorzyController.autorzy_delete)


module.exports = router