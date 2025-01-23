const express = require("express")
const router = express.Router();

const KlienciController = require("../controllers/klientContr")

router.post("/wypozycz", KlienciController.wypozycz_ksiazke)

router.get("/lista", KlienciController.klienci_lista)

router.post("/dodaj", KlienciController.klienci_dodaj)

router.get("/:klientId", KlienciController.klienci_getById)

router.put("/:klientId", KlienciController.klienci_update)

router.delete("/:klientId", KlienciController.klienci_delete)


module.exports = router