const boom = require('@hapi/boom');
const { models } = require('./../libs/sequelize');

class DriverService {
  constructor() {}

  async find() {
    const rta = await models.Driver.findAll({
      include: [
        { model: models.User, as: 'user', attributes: { exclude: ['password']},}
      ]

    });
    return rta;
  }


  async findOne(id) {
    const driver = await models.Driver.findByPk(id, {
      include: [
        { model: models.User, as: 'user', attributes: { exclude: ['password']},}
      ],
    });
    if (!driver) {
      throw boom.notFound('driver not found');
    }
    return driver;
  }
}

module.exports = DriverService;
