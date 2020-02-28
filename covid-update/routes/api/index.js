const router = require("express").Router();
const statsRoutes = require("./stats")

router.use("/stats", statsRoutes);

module.exports = router;
