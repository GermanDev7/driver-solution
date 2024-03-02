const { Model, DataTypes, Sequelize } = require('sequelize');
const { RIDER_TABLE } = require('./rider.model');
const { DRIVER_TABLE } = require('./driver.model');
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
  },
  startLong: {
    type: DataTypes.DOUBLE,
    field: 'start_long',
  },
  endLat: {
    type: DataTypes.DOUBLE,
    field: 'end_lat',
  },
  endLong: {
    type: DataTypes.DOUBLE,
    field: 'end_long',
  },
  startTime: {
    type: DataTypes.TIME,
    field: 'start_time',
  },
  endTime: {
    type: DataTypes.TIME,
    field: 'end_time',
  },
  distance: {
    type: DataTypes.DOUBLE,
  },
  status: {
    type: DataTypes.BOOLEAN,
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
      model: RIDER_TABLE, // Nombre del modelo 'Rider' definido en Sequelize
      key: 'id',
    },
  },
  driverId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'driver_id',
    references: {
      model: DRIVER_TABLE, // Nombre del modelo 'Driver' definido en Sequelize
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
    this.belongsTo(models.Rider, {
      foreignKey: 'driverId',
      as: 'driver'
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
