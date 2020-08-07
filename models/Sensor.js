'use strict';
module.exports = (sequelize, DataTypes) => {
  var Sensor = sequelize.define('Sensor', {
    senosorId: {
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
    vechileId: {
      allowNull: false,
      type: DataTypes.UUID,
      references: {
        model: 'Vehicles',
        key: 'vehicleId'
      }
    },
    sensorName: {
      allowNull: false,
      type: DataTypes.STRING
    }
  })
  return Sensor;
}