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
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Error processing order. Please contact administrator.'
        },
        notEmpty: {
          msg: 'Error processing order. Please contact administrator.'
        }
      }
    },
    StockId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please choose a stock to buy.'
        },
        notEmpty: {
          msg: 'Please choose a stock to buy.'
        }
      }
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Quantity is required.'
        },
        notEmpty: {
          msg: 'Quantity is required.'
        },
        isInt: {
          msg: 'Invalid quantity'
        },
        isValid(qty) {
          if(qty < 1) throw new Error('Invalid quantity.')
        }
      }
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Price is required.'
        },
        notEmpty: {
          msg: 'Price is required.'
        },
        isValid(price) {
          if(price < 1) throw new Error('Invalid price.')
        }
      }
    },
    expiration: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Expiration date is required.'
        },
        notEmpty: {
          msg: 'Expiration date is required.'
        },
        isValid(date) {
          if(date) throw new Error(`Earliest expiration is today`)
        }
      }
    },
    orderType: {
      type: DataTypes.ENUM('Buy_Order', 'Sell_Order'),
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please elect order type.'
        },
        notEmpty: {
          msg: 'Please elect order type.'
        }
      }
    },
    orderStatus: {
      type: DataTypes.ENUM('Open', 'Processed', 'Completed'),
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'MarketOrder',
  });
  return MarketOrder;
};