'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CompanyProfile extends Model {

    static associate(models) {
      this.belongsTo(models.Stock)
    }

    //methods
  }
  CompanyProfile.init({
    StockId: DataTypes.INTEGER,
    about: DataTypes.TEXT,
    logo: DataTypes.TEXT,
    npwp: DataTypes.STRING,
    address: DataTypes.STRING,
    ipoFundRaised: DataTypes.NUMERIC,
    ipoListingDate: DataTypes.DATE,
    ipoOfferingShares: DataTypes.INTEGER,
    ipoPercentage: DataTypes.FLOAT,
    securitiesBureau: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'CompanyProfile',
  });
  return CompanyProfile;
};