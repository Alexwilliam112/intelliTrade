'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MarketOrder extends Model {

    static associate(models) {
      this.belongsTo(models.User)
      this.belongsTo(models.Stock)
    }

    //methods
  }
  MarketOrder.init({
    UserId: DataTypes.INTEGER,
    StockId: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
    price: DataTypes.INTEGER,
    expiration: DataTypes.INTEGER,
    orderType: DataTypes.ENUM,
    orderStatus: DataTypes.ENUM
  }, {
    sequelize,
    modelName: 'MarketOrder',
  });
  return MarketOrder;
};