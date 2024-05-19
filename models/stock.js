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

    static async readStockDetails() {
      try {
        const stocks = await Stock.findAll({
          attributes: [
            'id',
            'stockName',
            'stockCode',
            'dividend',
            'createdAt',
            [sequelize.literal('"CompanyProfile"."about"'), 'about'],
            [sequelize.literal('"CompanyProfile"."logo"'), 'logo'],
            [sequelize.literal('"CompanyProfile"."npwp"'), 'npwp'],
            [sequelize.literal('"CompanyProfile"."address"'), 'address'],
            [sequelize.literal('"CompanyProfile"."ipoFundRaised"'), 'ipoFundRaised'],
            [sequelize.literal('"CompanyProfile"."ipoListingDate"'), 'ipoListingDate'],
            [sequelize.literal('"CompanyProfile"."ipoOfferingShares"'), 'ipoOfferingShares'],
            [sequelize.literal('"CompanyProfile"."ipoPercentage"'), 'ipoPercentage'],
            [sequelize.literal('"CompanyProfile"."securitiesBureau"'), 'securitiesBureau'],
            [sequelize.literal('"StockHistories"."volume"'), 'volume']
          ],
          include: [
            {
              model: sequelize.models.CompanyProfile,
              attributes: []
            },
            {
              model: sequelize.models.StockHistory,
              attributes: [],
              required: true,
              separate: true,
              limit: 1,
              order: [['date', 'DESC']]
            }
          ]
        });

        return stocks;

      } catch (error) {
        throw errror
      }
    }
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
          if (value > 100) throw new Error('Invalid dividend yield.')
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Stock',
  });
  return Stock;
};