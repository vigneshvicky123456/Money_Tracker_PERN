require('dotenv').config(); 
const { Sequelize } = require('sequelize');


// const sequelize = new Sequelize(
//     process.env.DB_NAME,      
//     process.env.DB_USER,      
//     process.env.DB_PASSWORD,  
//     {
//         host: process.env.DB_HOST,  
//         dialect: process.env.DB_DIALECT,  
//     }
// );

const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        require: true, 
        rejectUnauthorized: false
      }
    }
  });

// Test connection to the database
sequelize.authenticate()
    .then(() => {
        console.log('Database connected!');
    })
    .catch((error) => {
        console.error('Unable to connect to the database:', error);
    });

module.exports = sequelize;
