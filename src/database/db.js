const Sequelize = require("sequelize");
var pg = require("pg");
pg.defaults.ssl = true;

module.exports = new Sequelize(process.env.DATABASE_URL);
