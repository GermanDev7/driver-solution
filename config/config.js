require('dotenv').config();

const config = {
  env: process.env.NODE_ENV || 'dev',
  port: process.env.PORT || 3000,
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD,
  dbHost: process.env.DB_HOST,
  dbName: process.env.DB_NAME,
  dbPort: process.env.DB_PORT,
  dialect:process.env.DIALECT,
  apikey:process.env.API_KEY,
  jwtSecret:process.env.JWT_SECRET,
  publickeywompi:process.env.PUBLIC_KEY_WOMPI,
  privatekeywompi:process.env.PRIVATE_KEY_WOMPI
};

module.exports = { config };
