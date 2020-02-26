import axios from "axios";

export default {
    getStats: function(){
        return axios.get("http://localhost:3001/api/stats");
    },
    getCanStats: function(){
        return axios.get("http://localhost:3001/api/stats/canada");
    }
}