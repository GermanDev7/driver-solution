const { User, UserSchema } = require('./user.model');
const { Driver, DriverSchema } = require('./driver.model');
const { Rider, RiderSchema } = require('./rider.model');
const { Ride, RideSchema } = require('./ride.model');
const { Payment, PaymentSchema } = require('./payment.model');
const { Transaction, TransactionSchema } = require('./transaction.model');
function setupModels(sequelize) {
  User.init(UserSchema, User.config(sequelize));
  Driver.init(DriverSchema, Driver.config(sequelize));
  Rider.init(RiderSchema, Rider.config(sequelize));
  Ride.init(RideSchema, Ride.config(sequelize));
  Transaction.init(TransactionSchema, Transaction.config(sequelize));
  Payment.init(PaymentSchema, Payment.config(sequelize));
  //relationships
  User.associate(sequelize.models);
  Driver.associate(sequelize.models);
  Rider.associate(sequelize.models);
  Ride.associate(sequelize.models);
  Transaction.associate(sequelize.models);
  Payment.associate(sequelize.models);
}

module.exports = { setupModels };
