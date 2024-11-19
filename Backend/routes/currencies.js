const express = require('express');
const router = express.Router();
const currencyModel = require('../models/currenciesModal');


// Create a new currency

router.post('/', async (req, res) => {
    try {
        const newCurrency = await currencyModel.create(req.body);
        res.status(201).json(newCurrency);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get all currencies

router.get('/', async (req, res) => {
    try {
        const allCurrencies = await currencyModel.findAll();
        res.status(200).json(allCurrencies);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get a single currency by ID

router.get('/:id', async (req, res) => {
  try {
      const currency = await currencyModel.findByPk(req.params.id);
      if (currency) {
          res.status(200).json(currency);
      } else {
          res.status(404).json({ error: 'currency not found' });
      }
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
});

// Update a currency by ID

router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const [updated] = await currencyModel.update(req.body, { where: { id } });
        if (updated) {
            const updateCurrency = await currencyModel.findByPk(req.params.id);
            res.status(200).json(updateCurrency);
        } else {
            res.status(404).json({ message: 'Currency not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete a currency by ID

router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deleteCurrency = await currencyModel.destroy({ where: { id } });
        if (deleteCurrency) {
            res.status(204).json({ message: 'Currency deleted' });
        } else {
            res.status(404).json({ message: 'Currency not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;




