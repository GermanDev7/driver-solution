const { Model, DataTypes, Sequelize } = require('sequelize');

const USER_TABLE = 'users';

const UserSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  fullName: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    field: 'full_name',
  },
  phone: {
    type: DataTypes.STRING,
  },
  birthDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  sex: {
    type: DataTypes.STRING,
  },
  email: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true,
  },
  password: {
    allowNull: false,
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
};

class User extends Model {
  static associate(models) {
    this.hasOne(models.Rider, {
      as: 'rider',
      foreignKey: 'userId',
    });
    this.hasOne(models.Driver, {
      as: 'driver',
      foreignKey: 'userId',
    });
    this.hasOne(models.Payment, {
      as: 'payment',
      foreignKey: 'userId',
    });
  }
  static config(sequelize) {
    return {
      sequelize,
      tableName: USER_TABLE,
      modelName: 'User',
      timestamps: false,
      defaultScope: {
        attributes: ['id', 'username', 'email', 'phone','password','full_name'],
      },
    };
  }
}

module.exports = { USER_TABLE, UserSchema, User };
