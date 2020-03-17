var mongoose = require("mongoose");
const Schema = mongoose.Schema;

var db = mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/budgetfuntimes",
  {
    useNewUrlParser: true
  }
);

const budgetSchema = new Schema({
  income: Number,
  bills: Number,
  savings: Number
});

const Budget = mongoose.model("budget", budgetSchema);

const logSchema = new Schema({
  category: String,
  name: String,
  price: Number,
  date: String
});

const Log = mongoose.model("log", logSchema);

module.exports = { Budget, Log, db };
