const express = require('express');
const router = express.Router();
const  accountModel  = require('../models/accountsModal'); 


// Create a new account

router.post('/', async (req, res) => {
  try {
      const newAccount = await accountModel.create(req.body);
      res.status(201).json(newAccount);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
});

// Get all accounts

router.get('/', async (req, res) => {
    try {
        const allAccounts = await accountModel.findAll({
            order: [['id', 'ASC']], // Order by `id` in ascending order
          });
        res.status(200).json(allAccounts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get a single account by ID

router.get('/:id', async (req, res) => {
    try {
        const account = await accountModel.findByPk(req.params.id);
        if (account) {
            res.status(200).json(account);
        } else {
            res.status(404).json({ error: 'Account not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update an account by ID

router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const [updated] = await accountModel.update(req.body, { where: { id } });
        if (updated) {
            const updateAccount = await accountModel.findByPk(req.params.id);
            res.json(updateAccount);
        } else {
            res.status(404).json({ error: 'Account not found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Delete an account by ID

router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deleteAccount = await accountModel.destroy({ where: { id } });
        if (deleteAccount) {
            res.status(204).json({ message: 'Account deleted' });
        } else {
            res.status(404).json({ error: 'Account not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;

