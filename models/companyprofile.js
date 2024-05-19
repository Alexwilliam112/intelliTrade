'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CompanyProfile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
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