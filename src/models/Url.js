const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = require("../database/db");

class Url extends Model {}

Url.init(
  {
    urlCode: Sequelize.STRING,
    longUrl: Sequelize.STRING,
    shortUrl: Sequelize.STRING
  },
  { sequelize, modelName: "url" }
);

module.exports = Url;
