const router = require("express").Router();
const statsController = require("../../../controllers/statsController");
const axios = require("axios");

router.route("/")
    .get(statsController.findAll);

router.route("/canada")
    .get(statsController.findCanada);


router.get("/news", function(req, res){
    let key = process.env.API_KEY;
    axios.get("http://newsapi.org/v2/everything?q=coronavirus&language=en&sortBy=publishedAt&pageSize=10&apiKey="+key).then(function (response) {
        res.json(response.data.articles);
    });


})


module.exports = router;