const express = require('express');
const router = express.Router();
const selectedCurrencyModal = require('../models/selectedCurrencyModal');
const currencyModel = require('../models/currenciesModal');

// Get the selected currency

router.get('/', async (req, res) => {
  try {
    const selectedCurrency = await selectedCurrencyModal.findOne({ order: [['id', 'DESC']],
      include:'currencyModel'
    });
    if (selectedCurrency) {
      res.json(selectedCurrency);
    } else {
        res.status(404).json({ message: 'Entry not found' });
    }
  } catch (error) {
    console.error("Error details:", error.stack);
    res.status(500).json({ message: 'Error retrieving entry', error: error.stack || "Unknow error" });
  }
});

// Set the selected currency

router.post('/', async (req, res) => {
  const { currency_id } = req.body;
  try {
    const newSelectedCurrency = await selectedCurrencyModal.create({ currency_id });
    res.status(201).json(newSelectedCurrency);
  } catch (error) {
    res.status(500).json({ message: 'Error saving selected ID', error });
  }
});

module.exports = router;
