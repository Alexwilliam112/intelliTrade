'use strict';
const bcrypt = require('bcrypt');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {

    static associate(models) {
      this.belongsToMany(models.Stock, { through: models.Portfolio })
      this.belongsToMany(models.Stock, { through: models.MarketOrder })
    }

  }
  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: 'This username has been used.'
      },
      validate: {
        notNull: {
          msg: 'Username is required.'
        },
        notEmpty: {
          msg: 'Username is required.'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Password is required',
        },
        notEmpty: {
          msg: 'Password is required',
        },
        len: {
          args: [8],
          msg: 'Password must be at least 8 character',
        },
      },
    },
    role: {
      type: DataTypes.ENUM('admin', 'broker', 'user'),
      allowNull: false,
      isIn: {
        args: [['admin', 'broker', 'user']],
        msg: 'Error: invalid role. check model',
      }
    }
  }, {
    sequelize,
    modelName: 'User',
  });

  User.beforeValidate((user) => {
    user.role = 'user'
  })

  User.beforeCreate(async (user) => {
    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(user.password, salt)
  })

  return User;
};