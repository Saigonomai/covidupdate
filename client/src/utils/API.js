import axios from "axios";

export default {
    getStats: function(){
        return axios.get("/api/stats");
    },
    getCanStats: function(){
        return axios.get("/api/stats/canada");
    },
    getNews: function(){
        return axios.get("/api/stats/news")
    },
    getMapbox: function(){
        return axios.get("/api/stats/mapbox")
    }
}