const { Model, DataTypes, Sequelize } = require('sequelize');
const { RIDE_TABLE } = require('./ride.model');
const { RIDER_TABLE } = require('./rider.model');

const TRANSACTION_TABLE = 'transactions';

const TransactionSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  amount: {
    type: DataTypes.STRING,
    field: 'preferred_payment_method',
  },
  status: {
    type: DataTypes.STRING,
  },
  payReference: {
    field:'pay_reference',
    type: DataTypes.STRING,
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
  rideId: {
    field: 'ride_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    unique: true,
    references: { model: RIDE_TABLE, key: 'id' },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  },
  riderId: {
    field: 'rider_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    unique: true,
    references: { model: RIDER_TABLE, key: 'id' },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  },
};

class Transaction extends Model {
  static associate(models) {
    this.belongsTo(models.Ride, {
      foreignKey: 'rideId',
      as: 'ride'
    });
    this.belongsTo(models.Rider, {
      foreignKey: 'riderId',
      as: 'rider'
    });
  }
  static config(sequelize) {
    return {
      sequelize,
      tableName: TRANSACTION_TABLE,
      modelName: 'Transaction',
      timestamps: false,
    };
  }
}

module.exports = { TRANSACTION_TABLE, TransactionSchema, Transaction };

