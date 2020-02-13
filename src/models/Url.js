const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = require("../database/db");

class Url extends Model {}

Url.init(
  {
    urlCode: Sequelize.STRING,
    original_link: Sequelize.STRING(1234),
    short_link: Sequelize.STRING
  },
  { sequelize, modelName: "url" }
);

module.exports = Url;
