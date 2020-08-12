'use strict';
module.exports = (sequelize, DataTypes) => {
  var Sensor = sequelize.define('Sensor', {
    sensorId: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    vehicleId: {
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

  Sensor.associate = models => {
    Sensor.hasOne(models.Vehicle,{
      foreignKey: 'vehicleId',
      constraints: false
  });
  };

  return Sensor;
}