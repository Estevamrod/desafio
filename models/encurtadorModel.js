const { Sequelize, Model, DataTypes } = require("sequelize");
const sequelize = require('./db')

const Url = sequelize.define("urls", {
    url_origin:DataTypes.TEXT,
    new_url:DataTypes.TEXT,
    validade: DataTypes.TIME
});

module.exports = Url;