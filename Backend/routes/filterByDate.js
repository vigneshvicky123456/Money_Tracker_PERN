const express = require("express");
const router = express.Router();
const { Op } = require("sequelize");
const newTransactionModel = require("../models/newTransactionModal");
const accountModel = require("../models/accountsModal"); 
const moment = require("moment");

router.get("/", async (req, res) => {
  try {
    const { filter, accountId, transaction_tag } = req.query;
    let startDate, endDate;

    // Set date ranges based on the filter
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

    // Default run this filter
    const queryOptions = {
      where: {
        transaction_date: {
          [Op.gte]: startDate,
          [Op.lte]: endDate,
        },
      },
    };

    // Add filter by accountId if provided
    if (accountId) {
      queryOptions.where.account_id = accountId;
    }

    // Add filter by transaction_tag if provided
    if (transaction_tag) {
      queryOptions.where.transaction_tag = transaction_tag;
    }

    const transactions = await newTransactionModel.findAll(queryOptions);

    let totalIncome = 0;
    let totalExpense = 0;

    // Calculate totalIncome and totalExpense
    transactions.forEach((transaction) => {
      const toAmount = parseFloat(transaction.transaction_to_amount) || 0;
      const fromAmount = parseFloat(transaction.transaction_from_amount) || 0;

      totalIncome += toAmount;
      totalExpense += fromAmount;
    });

    const balance = totalIncome - totalExpense;

    // Fetch account details if accountId is provided
    let accountDetails = null;
    if (accountId) {
      accountDetails = await accountModel.findOne({
        where: { id: accountId },
        attributes: ["id", "account_name", "account_type"],
      });
    }

    res.json({
      filter,
      startDate,
      endDate,
      totalIncome: totalIncome.toFixed(2),
      totalExpense: totalExpense.toFixed(2),
      balance: balance.toFixed(2),
      transactions,
      accountDetails,
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

