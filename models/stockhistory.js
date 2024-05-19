'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class StockHistory extends Model {

    static associate(models) {
      this.belongsTo(models.Stock)
    }

    //methods
  }
  StockHistory.init({
    StockId: DataTypes.INTEGER,
    date: DataTypes.DATE,
    high: DataTypes.INTEGER,
    low: DataTypes.INTEGER,
    open: DataTypes.INTEGER,
    close: DataTypes.INTEGER,
    volume: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'StockHistory',
  });
  return StockHistory;
};