const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('money_tracker', 'postgres', 'postgres', {
    host: 'localhost', 
    dialect: 'postgres'
});

// Test connection to the database

sequelize.authenticate().then(() => {
    console.log('Database connected!');
  }).catch((error) => {
    console.error('Unable to connect to the database:', error);
  });

module.exports = sequelize;

