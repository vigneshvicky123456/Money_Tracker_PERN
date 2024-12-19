const express = require("express");
const { Op } = require("sequelize");
const newTransactionModel = require("../../models/newTransactionModal");
const router = express.Router();
const moment = require("moment");
const  accountModel  = require('../../models/accountsModal'); 

router.get("/netWorth", async (req, res) => {
  const { reportsType, year, monthYear, accountId } = req.query;

  if (reportsType === "NetWorth") {
    try {
      let incomeData = [];

      if (year) {
        for (let month = 1; month <= 12; month++) {
          const startDate = moment(`${year}-${month}-01`).startOf("month").format("YYYY-MM-DD");
          const endDate = moment(`${year}-${month}-01`).endOf("month").format("YYYY-MM-DD");

          const NetWorth = (await accountModel.sum("account_balance")) || 0;

          const monthlyIncome = (await newTransactionModel.sum("transaction_to_amount", {
              where: {
                transaction_date: { [Op.between]: [startDate, endDate] },
                transaction_type: "Income",
              },
            })) || 0;

          const monthlyExpense = (await newTransactionModel.sum("transaction_from_amount", {
              where: {
                transaction_date: { [Op.between]: [startDate, endDate] },
                transaction_type: "Expense",
              },
            })) || 0;


          incomeData.push({ month: moment(startDate).format("MMM"), NetWorth });
        }
      }

      else if (monthYear) {
        const monthYearDate = moment(monthYear, "MMM YYYY");
        const startDate = monthYearDate.startOf("month").format("YYYY-MM-DD");
        const endDate = monthYearDate.endOf("month").format("YYYY-MM-DD");

        for (let month = 1; month <= monthYearDate.daysInMonth(); month++) {
          const dayDate = moment(`${monthYearDate.format("YYYY-MM")}-${month}`,"YYYY-MM-DD").format("YYYY-MM-DD");

          const NetWorth = (await accountModel.sum("account_balance")) || 0;
  
          const dailyIncome = await newTransactionModel.sum("transaction_to_amount", {
            where: { 
              transaction_date: dayDate,
              transaction_type: "Income"  
            }
          }) || 0;
    
          const dailyExpense = await newTransactionModel.sum("transaction_from_amount", {
              where: { 
                transaction_date: dayDate,
                transaction_type: "Expense"  
              }
          }) || 0;  

          incomeData.push({ month, NetWorth });
        }
      }


      res.json({ incomeData });
    } catch (error) {
      console.error("Error calculating net income:", error);
      res.status(500).json({ message: "Error calculating net income" });
    }
  } else {
    res.status(400).json({ message: "Invalid report type" });
  }
});

module.exports = router;