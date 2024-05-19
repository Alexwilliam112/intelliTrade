'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Portfolio extends Model {
    
    static associate(models) {
      this.belongsTo(models.User)
      this.belongsTo(models.Stock)
    }

    //methods
  }
  Portfolio.init({
    UserId: DataTypes.INTEGER,
    StockId: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Portfolio',
  });
  return Portfolio;
};