const boom = require('@hapi/boom');

const { config } = require('./../config/config');
function checkApiKey(req, res, next) {
  const apikey = req.headers['api'];
  if (apikey === config.apikey) {
    next();
  } else {
    next(boom.unauthorized());
  }
}
//checkRoles
function checkRoles(...roles) {
  return (req, res, next) => {
    const user = req.user;
    const roleP = user.role.replace(',', '');
    if (roles.includes(roleP)) {
      next();
    } else {
      next(boom.unauthorized());
    }
  };
}

module.exports = { checkApiKey, checkRoles };
