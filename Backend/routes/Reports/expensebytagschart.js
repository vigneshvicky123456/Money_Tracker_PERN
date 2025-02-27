const express = require("express");
const { Op } = require("sequelize");
const newTransactionModel = require("../../models/newTransactionModal");
const router = express.Router();
const moment = require("moment");

router.get("/expensebytags", async (req, res) => {
  const { reportsType, year, monthYear, transaction_tag, accountId  } = req.query;

  if (reportsType === "ExpensebyTags") {
    try {
      const expenseData = [];
      const tagTotals = {};

      // Filter by year with accountId
      if (year && accountId) {
        const accountIdArray = accountId
            .split(",")
            .map((id) => parseInt(id.trim()));

        for (let month = 1; month <= 12; month++) {
          const startDate = moment(`${year}-${month}-01`).startOf("month").toDate();
          const endDate = moment(`${year}-${month}-01`).endOf("month").toDate();

          // Fetch transactions for month
          const monthlyExpenses = await newTransactionModel.findAll({
            where: {
              transaction_date: { [Op.between]: [startDate, endDate] },
              transaction_type: "Expense", 
              transaction_from_name_id: { [Op.in]: accountIdArray }
            },
          });

          for (const expense of monthlyExpenses) {
            const tagName = expense.transaction_tag;
            const amount = parseFloat(expense.transaction_from_amount || 0);

            const tagsArray = transaction_tag.split(','); 
            if (tagsArray.includes(tagName)) continue;  

            if (!tagTotals[tagName]) {
              tagTotals[tagName] = 0;
            }
            tagTotals[tagName] += amount;
          }
        }

        for (const [tag, total] of Object.entries(tagTotals)) {
          expenseData.push({ tagName: tag, totalExpense: total });
        }
      }

      // Filter by year
      else if (year) {
        for (let month = 1; month <= 12; month++) {
          const startDate = moment(`${year}-${month}-01`).startOf("month").toDate();
          const endDate = moment(`${year}-${month}-01`).endOf("month").toDate();

          // Fetch transactions for month
          const monthlyExpenses = await newTransactionModel.findAll({
            where: {
              transaction_date: { [Op.between]: [startDate, endDate] },
              transaction_type: "Expense", 
            },
          });

          for (const expense of monthlyExpenses) {
            const tagName = expense.transaction_tag;
            const amount = parseFloat(expense.transaction_from_amount || 0);

            const tagsArray = transaction_tag.split(','); 
            if (tagsArray.includes(tagName)) continue;  

            if (!tagTotals[tagName]) {
              tagTotals[tagName] = 0;
            }
            tagTotals[tagName] += amount;
          }
        }

        for (const [tag, total] of Object.entries(tagTotals)) {
          expenseData.push({ tagName: tag, totalExpense: total });
        }
      }

       // Filter by monthYear and accountId
       else if (monthYear && accountId) {
        const accountIdArray = accountId
        .split(",")
        .map((id) => parseInt(id.trim()));

        const monthYearDate = moment(monthYear, "MMM YYYY");
        const startDate = monthYearDate.startOf("month").toDate();
        const endDate = monthYearDate.endOf("month").toDate();

        // Fetch transactions for month
        const monthlyExpenses = await newTransactionModel.findAll({
          where: {
            transaction_date: { [Op.between]: [startDate, endDate] },
            transaction_type: "Expense",
            transaction_from_name_id: { [Op.in]: accountIdArray }
          },
        });

        for (const expense of monthlyExpenses) {
          const tagName = expense.transaction_tag;
          const amount = parseFloat(expense.transaction_from_amount || 0);

          const tagsArray = transaction_tag.split(','); 
          if (tagsArray.includes(tagName)) continue;  

          if (!tagTotals[tagName]) {
            tagTotals[tagName] = 0;
          }
          tagTotals[tagName] += amount;
        }

        for (const [tag, total] of Object.entries(tagTotals)) {
          expenseData.push({ tagName: tag, totalExpense: total });
        }
      }

      // Filter by monthYear
      else if (monthYear) {
        const monthYearDate = moment(monthYear, "MMM YYYY");
        const startDate = monthYearDate.startOf("month").toDate();
        const endDate = monthYearDate.endOf("month").toDate();

        // Fetch transactions for month
        const monthlyExpenses = await newTransactionModel.findAll({
          where: {
            transaction_date: { [Op.between]: [startDate, endDate] },
            transaction_type: "Expense",
          },
        });

        for (const expense of monthlyExpenses) {
          const tagName = expense.transaction_tag;
          const amount = parseFloat(expense.transaction_from_amount || 0);

          const tagsArray = transaction_tag.split(','); 
          if (tagsArray.includes(tagName)) continue;  

          if (!tagTotals[tagName]) {
            tagTotals[tagName] = 0;
          }
          tagTotals[tagName] += amount;
        }

        for (const [tag, total] of Object.entries(tagTotals)) {
          expenseData.push({ tagName: tag, totalExpense: total });
        }
      }

      res.status(200).json({ expenseData });
    } catch (error) {
      console.error("Error fetching expenses:", error);
      res.status(500).json({ error: "An error occurred while fetching data." });
    }
  } else {
    res.status(400).json({ error: "Invalid report type" });
  }
});

module.exports = router;
