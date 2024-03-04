const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');
const sequelize = require('../libs/sequelize');
const { Op } = require('@sequelize/core');
const paymentProvider = require('./paymentsProvider');



class RideService {
  constructor() {}
  async find() {
    const rta = await models.Ride.findAll({
      include: [
        { model: models.Rider, as: 'rider' },
        { model: models.Driver, as: 'driver' },
        { model: models.Payment, as: 'payment' },
      ],
    });
    return rta;
  }

  async findOne(id) {
    const ride = await models.Ride.findByPk(id, {
      include: [
        { model: models.Rider, as: 'rider' },
        { model: models.Driver, as: 'driver' },
      ],
    });
    if (!ride) {
      throw boom.badRequest('ride not found');
    }
    return ride;
  }

  async create(data) {
    // search driver
    const t = await sequelize.transaction();
    try {
      const rider = await models.Rider.findOne(
        { isAvailable: false },
        {
          where: {
            [Op.and]: {
              id: data.riderId,
              isAvailable: true,
            },
          },
        }
      );

      if (!rider) {
        throw new Error('Rider is not available.');
      }
      const availableDriver = await models.Driver.findOne({
        where: { isAvailable: true },
      });
      if (!availableDriver) {
        throw new Error('Drivers are not available.');
      }
      data.driverId = availableDriver.id;
      data.startTime = new Date();
      //calculate distance
      data.distance =
        await this.constructor.distanceInKmBetweenEarthCoordinates(
          data.startLat,
          data.startLong,
          data.endLat,
          data.endLong
        );

      // create ride
      const updateDriver = await models.Driver.update(
        { isAvailable: false },
        {
          where: { id: availableDriver.id },
          transaction: t,
        }
      );

      rider.isAvailable = false;
      rider.save({ transaction: t });

      const newRide = await models.Ride.create(data, { transaction: t });

      await t.commit();

      return newRide;
    } catch (error) {
      // If there is an error, roll back the transaction
      await t.rollback();
      throw error;
    }
  }

  async endRide(data) {
    //console.log(data);
    const t = await sequelize.transaction();
    try {
      const ride = await models.Ride.findOne({
        include: [
          {
            model: models.Rider,
            as: 'rider',
          },
          {
            model: models.Driver,
            as: 'driver',
          },
        ],
        where: {
          [Op.and]: {
            status: 'Started',
            id: data.rideId,
          },
        },
      });

      if (!ride) {
        throw boom.notFound('ride not found');
      }
      //end ride
      if (ride.endLat == data.endLat && ride.endLong == data.endLong) {
        ride.status = 'Ended';
        ride.endTime = new Date();
      } else {
        throw boom.badData('The ride not end yet, invalid coordinates');
      }
      const updateDriver = await models.Driver.update(
        { isAvailable: true },
        {
          where: { id: ride.driverId },
          transaction: t,
        }
      );

      const updateRider = await models.Rider.update(
        { isAvailable: true },
        {
          where: { id: ride.riderId },
          transaction: t,
        }
      );
      await ride.save({ transaction: t });
      //calculate fare
      const fare = this.constructor.calculateFare(
        ride.distance,
        ride.startTime,
        ride.endTime
      );

      const payment = await models.Payment.create(
        {
          userId: ride.rider.userId,
          rideId: ride.id,
          amount: fare,
          status: 'pending',
        },
        { transaction: t }
      );
      //transaction
      // const paymentResult = await paymentProvider.charge(ride.riderId, fare);
      // if (paymentResult.success) {
      //   payment.status = 'processed';
      //   payment.transactionId = paymentResult.transactionId;
      //   await payment.save({ transaction: t });
      // } else {
      //   payment.status = 'failed';
      //   await payment.save({ transaction: t });
      //   await models.PaymentFailure.create(
      //     {
      //       paymentId: payment.id,
      //       failureReason: paymentResult.failureReason,
      //       failureCode: paymentResult.failureCode,
      //       retryCount: 0,
      //     },
      //     { transaction: t }
      //   );
      // }

      await t.commit();
      return ride;
    } catch (error) {
      await t.rollback();
      throw error;
    }
  }

  static degreesToRadians(degrees) {
    return (degrees * Math.PI) / 180;
  }

  //Hervesian formula for calculate distance
  static distanceInKmBetweenEarthCoordinates(
    startLat,
    startLong,
    endLat,
    endLong
  ) {
    var earthRadiusKm = 6371;

    var dLat = this.degreesToRadians(endLat - startLat);
    var dLon = this.degreesToRadians(endLong - startLong);

    startLat = this.degreesToRadians(startLat);
    endLat = this.degreesToRadians(endLat);

    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.sin(dLon / 2) *
        Math.sin(dLon / 2) *
        Math.cos(startLat) *
        Math.cos(endLat);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return earthRadiusKm * c;
  }

  static calculateFare(distance, startDate, endDate) {
    const priceBase = 2500;
    const minutes = (endDate - startDate) / (1000 * 60);
    const fare = distance * 1000 + minutes * 200 + priceBase;
    return fare;
  }
}

module.exports = RideService;
