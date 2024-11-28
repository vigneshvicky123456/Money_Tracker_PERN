const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const sequelize = require('./database');
const PORT = 3003;

// import models
const { currencyModel, selectedCurrencyModal } = require("./models/index")


// sync models
sequelize.sync({ alter: true }) // Use { alter: true } to update tables without dropping them
  .then(() => {
    console.log('Models synchronized!');
  }).catch((error) => {
    console.error('Error syncing models:', error);
  });

// import routes
const currencyRoutes = require("./routes/currencies");
const accountRoutes = require("./routes/accounts");
const selectedCurrencyRoutes = require("./routes/selectedCurrency");
const newTransactionRoutes = require("./routes/newTransactions");
const filterByDateRoutes = require("./routes/filterByDate");

//Mildware
const app = express();
app.use(bodyParser.json()); //req.body
app.use(cors());

//Routes
app.use("/currencies",currencyRoutes);
app.use("/accounts",accountRoutes);
app.use("/selectedCurrency",selectedCurrencyRoutes);
app.use("/newTransactions",newTransactionRoutes);
app.use("/filterByDate",filterByDateRoutes);

sequelize.sync()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch(error => {
        console.error('Unable to connect to the database:', error);
    });

