'use strict';
module.exports = (sequelize, DataTypes) => {
  var Ownership = sequelize.define('Ownership', {
    vechileId: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      references: {
        model: 'Vehicles',
        key: 'vehicleId'
      }
    },
    userId: {
      allowNull: false,
      type: DataTypes.UUID,
      references: {
        model: 'Users',
        key: 'userId'
      }
    }
  })

  Ownership.associate = models => {
    Ownership.hasOne(models.Vehicle, {
      foreignKey: 'vehicleId',
      constraints: false
    });
  }
  Ownership.associate = models => {
    Ownership.hasOne(models.User, {
      foreignKey: 'userId',
      constraints: false
    });
  }

  return Ownership;
}