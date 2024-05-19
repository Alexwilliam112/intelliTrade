'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MarketOrder extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
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