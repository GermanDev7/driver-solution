const UserService = require('../services/user.service');

const service = new UserService();
const findAllUsers = async (req, res,next) => {
  try {
    const users = await service.find();
    res.json(users);
  } catch (error) {
   next(error)
  }
};

const findUserById = async (req, res, next) => {
  try {
    const user = await service.findOne(req.params.id);
    res.json(user);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  findAllUsers,
  findUserById,
};
