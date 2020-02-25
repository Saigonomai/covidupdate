const router = require("express").Router();
const axios = require("axios");
const cheerio = require("cheerio");

var url = "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/02-24-2020.csv"


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
        console.log(responseList);
    })
});


module.exports = router;