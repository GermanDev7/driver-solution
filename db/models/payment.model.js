const { Model, DataTypes, Sequelize } = require('sequelize');

const PAYMENT_TABLE = 'payments';

const PaymentSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
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
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'user_id',
    references: {
      model: 'users',
      key: 'id',
    },
  },
  rideId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'ride_id',
    references: {
      model: 'rides',
      key: 'id',
    },
  },
};
class Payment extends Model {
  static associate(models) {
    this.belongsTo(models.Ride, {
      foreignKey: 'rideId',
      as: 'ride'
    });
    this.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user'
    });
    this.hasOne(models.Transaction, {
      foreignKey: 'paymentId',
      as: 'transaction'
    });
  }
  static config(sequelize) {
    return {
      sequelize,
      tableName: PAYMENT_TABLE,
      modelName: 'Payment',
      timestamps: false,
    };
  }
}

module.exports = { PAYMENT_TABLE, PaymentSchema, Payment };
