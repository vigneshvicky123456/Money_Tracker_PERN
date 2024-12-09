const express = require('express');
const { Op } = require('sequelize');
const newTransactionModel = require('../../models/newTransactionModal');
const  accountModel  = require('../../models/accountsModal'); 
const router = express.Router();
const moment = require("moment");

router.get('/expenseIncome', async (req, res) => {
    const { reportsType, year, monthYear } = req.query;
  
    if (reportsType === 'Expense_Income') {
      let incomeData = [];
      let expenseData = [];
      let amountData = [];

      // Filter by year (e.g., "2024")
      if (year) {
        let totalIncomeAmount = 0;
        let totalExpenseAmount = 0;

        for (let month = 1; month <= 12; month++) {
          const startDate = moment(`${year}-${month}-01`).startOf('month').format('YYYY-MM-DD');
          const endDate = moment(`${year}-${month}-01`).endOf('month').format('YYYY-MM-DD');
  
          
          const monthlyIncome = await newTransactionModel.sum('transaction_to_amount', {
            where: { transaction_date: { [Op.between]: [startDate, endDate] } },
          });
          const monthlyExpense = await newTransactionModel.sum('transaction_from_amount', {
            where: { transaction_date: { [Op.between]: [startDate, endDate] } },
          });
  
          totalIncomeAmount += monthlyIncome;
          totalExpenseAmount += monthlyExpense;

          incomeData.push({ month, totalIncome: monthlyIncome || 0 });
          expenseData.push({ month, totalExpense: monthlyExpense || 0 });
        }

        amountData.push({totalIncomeAmount,totalExpenseAmount});
      }
  
      // Filter by month and year (e.g., "Nov 2024")
      else if (monthYear) {
        let totalIncomeAmount = 0;
        let totalExpenseAmount = 0;

        const monthYearDate = moment(monthYear, 'MMM YYYY');
        const startDate = monthYearDate.startOf('month').format('YYYY-MM-DD');
        const endDate = monthYearDate.endOf('month').format('YYYY-MM-DD');
  
        for (let month = 1; month <= monthYearDate.daysInMonth(); month++) {
          const dayDate = moment(`${monthYearDate.format('YYYY-MM')}-${month}`).format('YYYY-MM-DD');
  
          const dailyIncome = await newTransactionModel.sum('transaction_to_amount', {
            where: { transaction_date: dayDate },
          });
          const dailyExpense = await newTransactionModel.sum('transaction_from_amount', {
            where: { transaction_date: dayDate },
          });

          totalIncomeAmount += dailyIncome;
          totalExpenseAmount += dailyExpense;
  
          incomeData.push({ month, totalIncome: dailyIncome || 0 });
          expenseData.push({ month, totalExpense: dailyExpense || 0 });
        }
        amountData.push({totalIncomeAmount,totalExpenseAmount});
      }
      
      res.json({ incomeData, expenseData, amountData});
    }
  });
  
  module.exports = router;