
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database');

class selectedCurrencyModal extends Model {}

selectedCurrencyModal.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    currency_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'currency_tables', 
        key: 'id',
      },
  },
  },
  {
    sequelize,
    modelName:'selected_currency_tables'
  }
);

module.exports = selectedCurrencyModal;
