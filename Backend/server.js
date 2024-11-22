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
const expenseRoutes = require("./routes/expenses");
const transferRoutes = require("./routes/transfer");
const incomeRoutes = require("./routes/income");
const selectedCurrencyRoutes = require("./routes/selectedCurrency");
const newTransactionRoutes = require("./routes/newTransactions");

//Mildware
const app = express();
app.use(bodyParser.json()); //req.body
app.use(cors());

//Routes
app.use("/currencies",currencyRoutes);
app.use("/accounts",accountRoutes);
app.use("/expenses",expenseRoutes);
app.use("/transfer",transferRoutes);
app.use("/income",incomeRoutes);
app.use("/selectedCurrency",selectedCurrencyRoutes);
app.use("/newTransactions",newTransactionRoutes);

sequelize.sync()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch(error => {
        console.error('Unable to connect to the database:', error);
    });

