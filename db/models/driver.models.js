const { Model, DataTypes, Sequelize } = require('sequelize');
const { USER_TABLE } = require('./user.model');

const DRIVER_TABLE = 'drivers';

const DriverSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  licenseNumber: {
    allowNull: false,
    type: DataTypes.STRING,
    field: 'license_number',
    unique: true,
  },

  rating: {
    type: DataTypes.DOUBLE,
  },
  rideCounts: {
    field: 'ride_counts',
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  isAvaible: {
    allowNull: false,
    field: 'is_avaible',
    type: DataTypes.BOOLEAN,
  },
  CreatedAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW,
  },
  UpdatedAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'updated_at',
    defaultValue: Sequelize.NOW,
  },
  userId: {
    field: 'user_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    unique: true,
    references: { model: USER_TABLE, key: 'id' },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  },
};

class Driver extends Model {
  static associate(models) {
    this.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user'
    });
  }
  static config(sequelize) {
    return {
      sequelize,
      tableName: DRIVER_TABLE,
      modelName: 'Driver',
      timestamps: false,
    };
  }
}

module.exports = { DRIVER_TABLE, DriverSchema, Driver };
