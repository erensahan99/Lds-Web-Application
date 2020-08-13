'use strict';
module.exports = (sequelize, DataTypes) => {
  var Data = sequelize.define('Data', {
    dataId: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    sensorId: {
      allowNull: false,
      type: DataTypes.UUID,
      references: {
        model: 'Sensors',
        key: 'sensorId'
      }
    },
    data: {
      allowNull: false,
      type: DataTypes.STRING
    },
    time: {
      allowNull: false,
      type: 'TIMESTAMP'
    }
  })

  Data.associate = models => {
    Data.hasOne(models.Sensor, {
      foreignKey: 'sensorId',
      constraints: false
    });
  }

  return Data;
}