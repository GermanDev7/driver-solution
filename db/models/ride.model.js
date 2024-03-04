const { Model, DataTypes, Sequelize } = require('sequelize');
const { RIDER_TABLE } = require('./rider.model');
const { DRIVER_TABLE } = require('./driver.model');
const { PAYMENT_TABLE } = require('./payment.model');
const RIDE_TABLE = 'rides';

const RideSchema = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  startLat: {
    type: DataTypes.DOUBLE,
    field: 'start_lat',
    allowNull: false,
  },
  startLong: {
    type: DataTypes.DOUBLE,
    field: 'start_long',
    allowNull: false,
  },
  endLat: {
    type: DataTypes.DOUBLE,
    field: 'end_lat',
    allowNull: false,
  },
  endLong: {
    type: DataTypes.DOUBLE,
    field: 'end_long',
    allowNull: false,
  },
  startTime: {
    type: DataTypes.DATE,
    field: 'start_time',
    allowNull: false,
  },
  endTime: {
    type: DataTypes.DATE,
    field: 'end_time',

  },
  distance: {
    type: DataTypes.DOUBLE,
    allowNull: false,

  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: Sequelize.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: Sequelize.NOW,
  },
  riderId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'rider_id',
    references: {
      model: RIDER_TABLE,
      key: 'id',
    },
  },
  driverId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'driver_id',
    references: {
      model: DRIVER_TABLE,
      key: 'id',
    },
  },

};

class Ride extends Model {
  static associate(models) {
    this.belongsTo(models.Rider, {
      foreignKey: 'riderId',
      as: 'rider'
    });
    this.belongsTo(models.Driver, {
      foreignKey: 'driverId',
      as: 'driver'
    });
    this.hasOne(models.Payment, {
      foreignKey: 'rideId',
      as: 'payment'
    });
  }
  static config(sequelize) {
    return {
      sequelize,
      tableName: RIDE_TABLE,
      modelName: 'Ride',
      timestamps: false,
    };
  }
}

module.exports = { RIDE_TABLE, RideSchema, Ride };
