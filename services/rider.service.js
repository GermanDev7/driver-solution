const boom = require('@hapi/boom');
const { models } = require('./../libs/sequelize');

class RiderService {
  constructor() {}

  async find() {
    const rta = await models.Rider.findAll({
      include: [
        { model: models.User, as: 'user', attributes: { exclude: ['password']},}
      ]

    });
    return rta;
  }


  async findOne(id) {
    const rider = await models.Rider.findByPk(id, {
      include: [
        { model: models.User, as: 'user', attributes: { exclude: ['password']},}
      ],
    });
    if (!rider) {
      throw boom.notFound('rider not found');
    }
    return rider;
  }
}

module.exports = RiderService;
