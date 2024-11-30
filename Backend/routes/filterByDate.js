const express = require("express");
const router = express.Router();
const { Op } = require("sequelize");
const newTransactionModel = require("../models/newTransactionModal");
const moment = require("moment");

router.get("/", async (req, res) => {
  try {
    const { filter } = req.query;
    let startDate, endDate;

    switch (filter) {
      case "today":
        startDate = moment().format("YYYY-MM-DD");
        endDate = startDate;
        break;
      case "yesterday":
        startDate = moment().subtract(1, "day").format("YYYY-MM-DD");
        endDate = startDate;
        break;
      case "last7days":
        startDate = moment().subtract(7, "days").format("YYYY-MM-DD");
        endDate = moment().format("YYYY-MM-DD");
        break;
      case "last30days":
        startDate = moment().subtract(30, "days").format("YYYY-MM-DD");
        endDate = moment().format("YYYY-MM-DD");
        break;
      case "thismonth":
        startDate = moment().startOf("month").format("YYYY-MM-DD");
        endDate = moment().endOf("month").format("YYYY-MM-DD");
        break;
      case "all":
      default:
        startDate = "1900-01-01";
        endDate = moment().format("YYYY-MM-DD");
        break;
    }

    console.log(`Fetching transactions from ${startDate} to ${endDate}`);

    // Fetch transactions within the specified date range
    const transactions = await newTransactionModel.findAll({
      where: {
        transaction_date: {
          [Op.gte]: startDate,
          [Op.lte]: endDate,
        },
      },
    });

    let totalIncome = 0;
    let totalExpense = 0;

    transactions.forEach((transaction) => {
      const amount = parseFloat(
        transaction.transaction_from_amount !== "0"
          ? transaction.transaction_from_amount
          : transaction.transaction_to_amount
      );

      if (transaction.transaction_type === "Income") {
        totalIncome += amount;
      } else if (transaction.transaction_type === "Expense") {
        totalExpense += amount;
      }
    });

    const balance = totalIncome - totalExpense;

    res.json({
      filter,
      startDate,
      endDate,
      totalIncome: totalIncome.toFixed(2),
      totalExpense: totalExpense.toFixed(2),
      balance: balance.toFixed(2),
      transactions,
    });
  } catch (error) {
    console.error("Error retrieving transactions:", error);
    res.status(500).json({
      message: "Error retrieving transactions",
      error: error.message || error,
    });
  }
});

module.exports = router;
