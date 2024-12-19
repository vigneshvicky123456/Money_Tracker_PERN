const express = require("express");
const router = express.Router();
const { Op, Sequelize } = require("sequelize"); 
const newTransactionModel = require("../models/newTransactionModal");
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

    // Default run with date filter
    const queryOptions = {
      order: [["transaction_date", "DESC"]],
      where: {
        transaction_date: {
          [Op.gte]: startDate,
          [Op.lte]: endDate,
        },
      },
    };

    if (accountId) {
      const accountIdArray = accountId
        .split(",")
        .map((id) => parseInt(id.trim()));

      queryOptions.where[Op.or] = [
        { transaction_from_name_id: { [Op.in]: accountIdArray } },
        { transaction_to_name_id: { [Op.in]: accountIdArray } },
      ];
    }

    // Add filter by transaction_tag if provided
    if (transaction_tag) {
      const transactionTagsArray = Array.isArray(transaction_tag)
        ? transaction_tag
        : transaction_tag.split(",");

      queryOptions.where.transaction_tag = {
        [Op.in]: transactionTagsArray,
      };
    }

    // getAll transactions from the database
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
