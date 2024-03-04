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

  payMethod: {
    field: 'pay_method',
    type: DataTypes.STRING,
  },
  payReference: {
    field: 'pay_reference',
    type: DataTypes.STRING,
  },

  status: {
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
  paymentId: {
    field: 'payment_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    unique: true,
    references: { model: 'payments', key: 'id' },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  },
};

class Transaction extends Model {
  static associate(models) {
    this.belongsTo(models.Payment, {
      as: 'payment',
      foreignKey: 'paymentId',
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
