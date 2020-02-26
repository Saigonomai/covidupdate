import axios from "axios";

export default {
    getStats: function(){
        return axios.get("/api/stats");
    }
}