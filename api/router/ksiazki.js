const express = require("express")
const router = express.Router();
const ksiazkiController = require("../controllers/ksiazkiContr");

// Przykładowe trasy:
router.get("/autor_stats", ksiazkiController.ksiazki_autorStats)
router.get("/lista", ksiazkiController.ksiazki_lista)
router.post("/dodaj", ksiazkiController.ksiazki_dodaj)
router.get("/:ksiazkaId", ksiazkiController.ksiazki_getById)
router.put("/:ksiazkaId", ksiazkiController.ksiazki_update)
router.delete("/:ksiazkaId", ksiazkiController.ksiazki_delete)

module.exports = router