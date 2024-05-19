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
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Error processing portfolio'
        },
        notEmpty: {
          msg: 'Error processing portfolio'
        }
      }
    },
    StockId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Error processing portfolio. Please contact administrator.'
        },
        notEmpty: {
          msg: 'Error processing portfolio. Please contact administrator.'
        }
      }
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Error processing portfolio. Please contact administrator.'
        },
        notEmpty: {
          msg: 'Error processing portfolio. Please contact administrator.'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Portfolio',
  });
  return Portfolio;
};