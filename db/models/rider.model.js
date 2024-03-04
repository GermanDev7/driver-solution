const { Model, DataTypes, Sequelize } = require('sequelize');
const { USER_TABLE } = require('./user.model');

const RIDER_TABLE = 'riders';

const RiderSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  preferredPaymentMethod: {
    type: DataTypes.STRING,
    field: 'preferred_payment_method',
  },
  rating: {
    type: DataTypes.DOUBLE,
  },
  rideCounts: {
    field:'ride_counts',
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  isAvailable: {
    allowNull: false,
    field: 'is_available',
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

class Rider extends Model {
  static associate(models) {
    this.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user'
    });
  }
  static config(sequelize) {
    return {
      sequelize,
      tableName: RIDER_TABLE,
      modelName: 'Rider',
      timestamps: false,
    };
  }
}

module.exports = { RIDER_TABLE, RiderSchema, Rider };

