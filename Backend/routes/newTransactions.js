const express = require("express");
const router = express.Router();
const newTransactionModel = require("../models/newTransactionModal");

// Create a new transaction

router.post("/", async (req, res) => {
  try {
    const newTransaction = await newTransactionModel.create(req.body);
    res.status(201).json(newTransaction);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all transactions

router.get("/", async (req, res) => {
  try {
    const allTransactions = await newTransactionModel.findAll({
      order: [["id", "DESC"]],
      limit: 5,
    });
    res.status(200).json(allTransactions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a single transaction by ID

router.get("/:id", async (req, res) => {
  try {
    const transaction = await newTransactionModel.findByPk(req.params.id);
    if (transaction) {
      res.status(200).json(transaction);
    } else {
      res.status(404).json({ error: "Transaction not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update an transaction by ID

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await newTransactionModel.update(req.body, {
      where: { id },
    });
    if (updated) {
      const updateTransaction = await newTransactionModel.findByPk(
        req.params.id
      );
      res.json(updateTransaction);
    } else {
      res.status(404).json({ error: "Transaction not found" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete an transaction by ID

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteTransaction = await newTransactionModel.destroy({
      where: { id },
    });
    if (deleteTransaction) {
      res.status(204).json({ message: "Transaction deleted" });
    } else {
      res.status(404).json({ error: "Transaction not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
