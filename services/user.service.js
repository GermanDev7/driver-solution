const boom = require('@hapi/boom');
const { models } = require('./../libs/sequelize');

class UserService {
  constructor() {}

  async find() {
    const rta = await models.User.findAll({
      include: [
        { model: models.Driver, as: 'driver' },
        { model: models.Rider, as: 'rider' },
      ],
      attributes: { exclude: ['password'] }
    });
    return rta;
  }

  async findByEmail(email) {
    const rta = await models.User.findOne({
      where: { email },
    });
    return rta;
  }

  async findOne(id) {
    const user = await models.User.findByPk(id, {
      include: [
        { model: models.Driver, as: 'driver' },
        { model: models.Rider, as: 'rider' },
      ],
      attributes: { exclude: ['password'] }
    });
    if (!user) {
      throw boom.notFound('user not found');
    }
    return user;
  }
}

module.exports = UserService;
