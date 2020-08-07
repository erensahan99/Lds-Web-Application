'use strict';
module.exports = (sequelize, DataTypes) => {
  var Vehicle = sequelize.define('Vehicle', {
    vehicleId: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    alias: {
      allowNull: false,
      type: DataTypes.STRING
    },
    macAddress: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true
    },
    color: {
      allowNull: false,
      type: DataTypes.TINYINT
    }
  })
  return Vehicle;
}