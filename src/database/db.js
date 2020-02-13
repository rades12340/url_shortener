const Sequelize = require("sequelize");
var pg = require("pg");
pg.defaults.ssl = true;

module.exports = new Sequelize(
  "dfa8kv2skc5f7i",
  "djfwhrgiksktpn",
  "61bf3efbc40e1953f6262cf6fb08d38de51221c11e9c9a773d10e80c21d7b38e",
  {
    host: "ec2-46-137-177-160.eu-west-1.compute.amazonaws.com",
    dialect: "postgres"
  }
);
