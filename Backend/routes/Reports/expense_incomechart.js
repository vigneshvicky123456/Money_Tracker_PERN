const express = require("express");
const { Op } = require("sequelize");
const newTransactionModel = require("../../models/newTransactionModal");
const router = express.Router();
const moment = require("moment");

router.get("/expenseIncome", async (req, res) => {
  const { reportsType, year, monthYear, transaction_tag, accountId } = req.query;

  if (reportsType === "Expense_Income") {
    let incomeData = [];
    let expenseData = [];
    let amountData = [];
    let tagAmountData = [];

// Filter by year and accountId (e.g., "2024") and 1
    if (year && accountId) {
      let totalIncomeAmount = 0;
      let totalExpenseAmount = 0;

      const accountIdArray = accountId
            .split(",")
            .map((id) => parseInt(id.trim()));
      
      for (let month = 1; month <= 12; month++) {
        const startDate = moment(`${year}-${month}-01`).startOf("month").format("YYYY-MM-DD");
        const endDate = moment(`${year}-${month}-01`).endOf("month").format("YYYY-MM-DD");

        let monthlyIncome = await newTransactionModel.sum("transaction_to_amount", {
          where: { 
            transaction_date: { [Op.between]: [startDate, endDate] },
            transaction_type: "Income",  
            transaction_to_name_id: { [Op.in]: accountIdArray }
          }
        });

        let monthlyExpense = await newTransactionModel.sum("transaction_from_amount", {
            where: { 
              transaction_date: { [Op.between]: [startDate, endDate] },
              transaction_type: "Expense",
              transaction_from_name_id: { [Op.in]: accountIdArray }  
            }
        });
       
        totalIncomeAmount += monthlyIncome || 0;
        totalExpenseAmount += monthlyExpense || 0;

        let tagExpenseAmount = 0;
        let tagIncomeAmount = 0;

        if (transaction_tag) {
          const transactionTagsArray = Array.isArray(transaction_tag)
          ? transaction_tag
          : transaction_tag.split(",");
  
          const tagData = await newTransactionModel.findAll({
            where: {
              transaction_date: { [Op.between]: [startDate, endDate] },
              transaction_tag: {[Op.in]: transactionTagsArray},
              [Op.or]: [
                { transaction_from_name_id: { [Op.in]: accountIdArray } },
                { transaction_to_name_id: { [Op.in]: accountIdArray } },
              ],
            },
          });
                  
          tagData.forEach((transaction) => {
            if (transaction.transaction_type === "Expense") {
              totalExpenseAmount -= parseFloat(transaction.transaction_from_amount);
              totalIncomeAmount -= parseFloat(transaction.transaction_from_amount);
              tagExpenseAmount -= parseFloat(transaction.transaction_from_amount);
              monthlyExpense -= parseFloat(transaction.transaction_from_amount);
            } else if (transaction.transaction_type === "Income") {
              totalIncomeAmount -= parseFloat(transaction.transaction_to_amount);
              totalExpenseAmount -= parseFloat(transaction.transaction_to_amount);
              tagIncomeAmount -= parseFloat(transaction.transaction_to_amount);
              monthlyIncome -= parseFloat(transaction.transaction_to_amount);
            }
          });
        }

        incomeData.push({ month: moment(startDate).format("MMM"), totalIncome: monthlyIncome || 0 });
        expenseData.push({ month: moment(startDate).format("MMM"), totalExpense: monthlyExpense || 0 });
        tagAmountData.push({ month: moment(startDate).format("MMM"), tagIncomeAmount, tagExpenseAmount });
      }

      amountData.push({ totalIncomeAmount, totalExpenseAmount });
    }

 // Filter by year (e.g., "2024")
    else if (year) {
      let totalIncomeAmount = 0;
      let totalExpenseAmount = 0;
      
      for (let month = 1; month <= 12; month++) {
        const startDate = moment(`${year}-${month}-01`).startOf("month").format("YYYY-MM-DD");
        const endDate = moment(`${year}-${month}-01`).endOf("month").format("YYYY-MM-DD");

        let monthlyIncome = await newTransactionModel.sum("transaction_to_amount", {
          where: { 
            transaction_date: { [Op.between]: [startDate, endDate] },
            transaction_type: "Income"  
          }
        });

        let monthlyExpense = await newTransactionModel.sum("transaction_from_amount", {
            where: { 
              transaction_date: { [Op.between]: [startDate, endDate] },
              transaction_type: "Expense"  
            }
        });
       
        totalIncomeAmount += monthlyIncome || 0;
        totalExpenseAmount += monthlyExpense || 0;

        let tagExpenseAmount = 0;
        let tagIncomeAmount = 0;

        if (transaction_tag) {
          const transactionTagsArray = Array.isArray(transaction_tag)
          ? transaction_tag
          : transaction_tag.split(",");
  
          const tagData = await newTransactionModel.findAll({
            where: {
              transaction_date: { [Op.between]: [startDate, endDate] },
              transaction_tag: {[Op.in]: transactionTagsArray}
            },
          });
                  
          tagData.forEach((transaction) => {
            if (transaction.transaction_type === "Expense") {
              totalExpenseAmount -= parseFloat(transaction.transaction_from_amount);
              totalIncomeAmount -= parseFloat(transaction.transaction_from_amount);
              tagExpenseAmount -= parseFloat(transaction.transaction_from_amount);
              monthlyExpense -= parseFloat(transaction.transaction_from_amount);
            } else if (transaction.transaction_type === "Income") {
              totalIncomeAmount -= parseFloat(transaction.transaction_to_amount);
              totalExpenseAmount -= parseFloat(transaction.transaction_to_amount);
              tagIncomeAmount -= parseFloat(transaction.transaction_to_amount);
              monthlyIncome -= parseFloat(transaction.transaction_to_amount);
            }
          });
        }

        incomeData.push({ month: moment(startDate).format("MMM"), totalIncome: monthlyIncome || 0 });
        expenseData.push({ month: moment(startDate).format("MMM"), totalExpense: monthlyExpense || 0 });
        tagAmountData.push({ month: moment(startDate).format("MMM"), tagIncomeAmount, tagExpenseAmount });
      }

      amountData.push({ totalIncomeAmount, totalExpenseAmount });
    }

 // Filter by month, year and accountId (e.g., "Nov 2024") and 1
    else if (monthYear && accountId) {
      let totalIncomeAmount = 0;
      let totalExpenseAmount = 0;

      const accountIdArray = accountId
      .split(",")
      .map((id) => parseInt(id.trim()));
      
      const monthYearDate = moment(monthYear, "MMM YYYY");
      const startDate = monthYearDate.startOf("month").format("YYYY-MM-DD");
      const endDate = monthYearDate.endOf("month").format("YYYY-MM-DD");
    
      for (let month = 1; month <= monthYearDate.daysInMonth(); month++) {
        const dayDate = moment(`${monthYearDate.format("YYYY-MM")}-${month}`,"YYYY-MM-DD").format("YYYY-MM-DD");
    
          let dailyIncome = await newTransactionModel.sum("transaction_to_amount", {
            where: { 
              transaction_date: dayDate,
              transaction_type: "Income" ,
              transaction_to_name_id: { [Op.in]: accountIdArray } 
            }
          });
    
          let dailyExpense = await newTransactionModel.sum("transaction_from_amount", {
              where: { 
                transaction_date: dayDate,
                transaction_type: "Expense",
                transaction_from_name_id: { [Op.in]: accountIdArray }    
              }
          });  
    
        totalIncomeAmount += dailyIncome || 0;
        totalExpenseAmount += dailyExpense || 0;

        let tagExpenseAmount = 0;
        let tagIncomeAmount = 0;
    
        if (transaction_tag) {
          const transactionTagsArray = Array.isArray(transaction_tag)
          ? transaction_tag
          : transaction_tag.split(",");
    
          const tagData = await newTransactionModel.findAll({
            where: {
              transaction_date: dayDate,
              transaction_tag: { [Op.in]: transactionTagsArray },
              [Op.or]: [
                { transaction_from_name_id: { [Op.in]: accountIdArray } },
                { transaction_to_name_id: { [Op.in]: accountIdArray } },
              ],
            },
          });
    
          tagData.forEach((transaction) => {
            if (transaction.transaction_type === "Expense") {
              totalExpenseAmount -= parseFloat(transaction.transaction_from_amount);
              totalIncomeAmount -= parseFloat(transaction.transaction_from_amount);
              tagExpenseAmount -= parseFloat(transaction.transaction_from_amount);
              dailyExpense -= parseFloat(transaction.transaction_from_amount);
            } else if (transaction.transaction_type === "Income") {
              totalIncomeAmount -= parseFloat(transaction.transaction_to_amount);
              totalExpenseAmount -= parseFloat(transaction.transaction_to_amount);
              tagIncomeAmount -= parseFloat(transaction.transaction_to_amount);
              dailyIncome -= parseFloat(transaction.transaction_to_amount);
            }
          });
        }
    
        incomeData.push({ month, totalIncome: dailyIncome || 0 });
        expenseData.push({ month, totalExpense: dailyExpense || 0 });
        tagAmountData.push({ month, tagIncomeAmount, tagExpenseAmount });
      }
    
      amountData.push({ totalIncomeAmount, totalExpenseAmount });
    }

    // Filter by month and year (e.g., "Nov 2024")
    else if (monthYear) {
      let totalIncomeAmount = 0;
      let totalExpenseAmount = 0;
      
      const monthYearDate = moment(monthYear, "MMM YYYY");
      const startDate = monthYearDate.startOf("month").format("YYYY-MM-DD");
      const endDate = monthYearDate.endOf("month").format("YYYY-MM-DD");
    
      for (let month = 1; month <= monthYearDate.daysInMonth(); month++) {
        const dayDate = moment(`${monthYearDate.format("YYYY-MM")}-${month}`,"YYYY-MM-DD").format("YYYY-MM-DD");
    
          let dailyIncome = await newTransactionModel.sum("transaction_to_amount", {
            where: { 
              transaction_date: dayDate,
              transaction_type: "Income"  
            }
          });
    
          let dailyExpense = await newTransactionModel.sum("transaction_from_amount", {
              where: { 
                transaction_date: dayDate,
                transaction_type: "Expense"  
              }
          });  
    
        totalIncomeAmount += dailyIncome || 0;
        totalExpenseAmount += dailyExpense || 0;

        let tagExpenseAmount = 0;
        let tagIncomeAmount = 0;
    
        if (transaction_tag) {
          const transactionTagsArray = Array.isArray(transaction_tag)
          ? transaction_tag
          : transaction_tag.split(",");
    
          const tagData = await newTransactionModel.findAll({
            where: {
              transaction_date: dayDate,
              transaction_tag: {[Op.in]: transactionTagsArray}
            },
          });
    
          tagData.forEach((transaction) => {
            if (transaction.transaction_type === "Expense") {
              totalExpenseAmount -= parseFloat(transaction.transaction_from_amount);
              totalIncomeAmount -= parseFloat(transaction.transaction_from_amount);
              tagExpenseAmount -= parseFloat(transaction.transaction_from_amount);
              dailyExpense -= parseFloat(transaction.transaction_from_amount);
            } else if (transaction.transaction_type === "Income") {
              totalIncomeAmount -= parseFloat(transaction.transaction_to_amount);
              totalExpenseAmount -= parseFloat(transaction.transaction_to_amount);
              tagIncomeAmount -= parseFloat(transaction.transaction_to_amount);
              dailyIncome -= parseFloat(transaction.transaction_to_amount);
            }
          });
        }
    
        incomeData.push({ month, totalIncome: dailyIncome || 0 });
        expenseData.push({ month, totalExpense: dailyExpense || 0 });
        tagAmountData.push({ month, tagIncomeAmount, tagExpenseAmount });
      }
    
      amountData.push({ totalIncomeAmount, totalExpenseAmount });
    }
    
    res.json({ incomeData, expenseData, amountData, tagAmountData });
  }
});

module.exports = router;
