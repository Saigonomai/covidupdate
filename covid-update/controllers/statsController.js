const db = require("../models");

// Defining methods for the statsController
module.exports = {
  findAll: function(req, res) {
    db.Stat
      .find(req.query)
      .sort({ date: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  update: function(req, res) {
    db.Stat
      .update({country: req.body.entry.country, region: req.body.entry.region},
        { $set: { cases: req.body.entry.cases, deaths: req.body.entry.deaths, recovered:req.body.entry.recovered}})
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  remove: function(req, res) {
    db.Stat
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findCanada: function(req, res){
      db.Stat
      .find({country:"Canada"})
      .sort({ date: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }

};
