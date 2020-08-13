'use strict';
module.exports = (sequelize, DataTypes) => {
  var Ownership = sequelize.define('Ownership', {
    macAddress: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.STRING,
      references: {
        model: 'Vehicles',
        key: 'macAddress'
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
      foreignKey: 'macAddress',
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