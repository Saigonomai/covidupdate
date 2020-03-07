const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const statSchema = new Schema({
    country: { type: String, required: true },
    region: { type: String },
    countrycn: { type: String },
    regioncn: { type: String },
    cases: { type: Number},
    deaths: {type: Number},
    recovered: {type: Number},
    latitude: {type: String},
    longitude: {type: String}
});

const Stat = mongoose.model("Stat", statSchema);

module.exports = Stat;
