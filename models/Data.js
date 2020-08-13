'use strict';
module.exports = (sequelize, DataTypes) => {
  var Data = sequelize.define('Data', {
    dataId: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    macAddress: {
      allowNull: false,
      type: DataTypes.UUID,
      references: {
        model: 'Vehicles',
        key: 'macAddress'
      }
    },
    dataName: {
      allowNull: false,
      type: DataTypes.STRING
    },
    data: {
      allowNull: false,
      type: DataTypes.STRING
    },
    time: {
      allowNull: false,
      type: 'TIMESTAMP'
    }
  }, {
    timestamps: false,
  })

  Data.associate = models => {
    Data.hasOne(models.Vehicle, {
      foreignKey: 'macAddress',
      constraints: false
    });
  }

  return Data;
}