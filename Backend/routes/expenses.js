const express = require('express');
const router = express.Router();
//const ExpensesTable = require('../models/expensesModal');


// Create a expense

router.post('/', async (req, res) => {
    try {
        const newExpense = await ExpensesTable.create(req.body);
        res.status(201).json(newExpense);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get all expenses

router.get('/', async (req, res) => {
    try {
        const allExpenses = await ExpensesTable.findAll();
        res.status(200).json(allExpenses);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get a single expense by ID

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const expense = await AccountTable.findOne( id );
        if (expense) {
            res.status(200).json(expense);
        } else {
            res.status(404).json({ error: 'expense not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update a expense by ID

router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const [updated] = await ExpensesTable.update(req.body, { where: { id } });
        if (updated) {
            const updateExpense = await Currency.findOne({ where: { id } });
            res.status(200).json(updateExpense);
        } else {
            res.status(404).json({ message: 'expense not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete a expense by ID
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deleteExpense = await ExpensesTable.destroy({ where: { id } });
        if (deleteExpense) {
            res.status(204).json("expense was Deleted!...");
        } else {
            res.status(404).json({ message: 'expense not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
