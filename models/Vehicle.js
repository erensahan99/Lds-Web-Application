'use strict';
module.exports = (sequelize, DataTypes) => {
  var Vehicle = sequelize.define('Vehicle', {
    macAddress: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.STRING
    },
    alias: {
      allowNull: false,
      type: DataTypes.STRING
    },
    color: {
      allowNull: false,
      type: DataTypes.TINYINT
    }
  })
  return Vehicle;
}