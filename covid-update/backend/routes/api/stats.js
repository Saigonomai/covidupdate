const router = require("express").Router();
const axios = require("axios");
const Stat = require("../../../models/stats");
const statsController = require("../../../controllers/statsController");

var url = "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/02-24-2020.csv"

//matches with "/api/stats"
router.get("/", function(req, res){
    axios.get(url).then(function (response) {
        // console.log(response.data);
        var responseList = response.data.split(/\r?\n/);
        for (i = 0; i < responseList.length; i++) {
            responseList[i] = responseList[i].split(",");
            if (responseList[i].length === 7) {
                var temp = responseList[i][0] + "," + responseList[i][1]
                responseList[i].shift();
                responseList[i][0] = temp;
            }
            
        }
        responseList.shift();
        responseList.pop();
        let promises = [];
        for (let i = 0; i < responseList.length; i++) {
            var statBlock = {};
            statBlock.region = responseList[i][0];
            statBlock.country = responseList[i][1];
            statBlock.cases = responseList[i][3];
            statBlock.deaths = responseList[i][4];
            statBlock.recovered = responseList[i][5];
            const promise = Stat.findOneAndUpdate(statBlock, statBlock, {upsert:true, new:true})
            promises.push(promise);
        }
        Promise.all(promises).then((data) => {
            res.json(data);
        });
    });
});


router.route("/canada")
    .get(statsController.findCanada);


module.exports = router;