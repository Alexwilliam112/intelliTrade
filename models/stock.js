'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Stock extends Model {

    static associate(models) {
      this.belongsToMany(models.User, { through: models.Portfolio })
      this.belongsToMany(models.User, { through: models.MarketOrder })
      this.hasOne(models.CompanyProfile)
      this.hasMany(models.StockHistory)
    }

    //methods
  }
  Stock.init({
    stockName: DataTypes.STRING,
    stockCode: DataTypes.STRING,
    dividend: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'Stock',
  });
  return Stock;
};