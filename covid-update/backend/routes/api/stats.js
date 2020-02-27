const router = require("express").Router();
const statsController = require("../../../controllers/statsController");

router.route("/")
    .get(statsController.findAll);

router.route("/canada")
    .get(statsController.findCanada);


module.exports = router;