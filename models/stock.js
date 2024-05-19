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
    stockName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: 'Company name already exists'
      },
      validate: {
        notNull: {
          msg: 'Invalid company name.'
        },
        notEmpty: {
          msg: 'Invalid company name.'
        }
      }
    },
    stockCode: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: 'Company with this ticker already exists.'
      },
      validate: {
        notNull: {
          msg: 'Invalid ticker'
        },
        notEmpty: {
          msg: 'Invalid ticker'
        },
        len: {
          args: [4],
          msg: 'Invalid ticker'
        }
      }
    },
    dividend: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Invalid dividend yield.'
        },
        notEmpty: {
          msg: 'Invalid dividend yield.'
        },
        isValid(value) {
          if(value > 100) throw new Error('Invalid dividend yield.')
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Stock',
  });
  return Stock;
};