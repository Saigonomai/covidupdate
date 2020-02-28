const router = require("express").Router();
const statsRoutes = require("./stats")

router.use("/stats", statsRoutes);
router.get("/port", function(req, res){
    let port = (process.env.PORT || 3001);
    res.json(port);
});

module.exports = router;
