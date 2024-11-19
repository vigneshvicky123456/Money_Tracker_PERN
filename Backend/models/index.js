const currencyModel = require("./currenciesModal");
const selectedCurrencyModal = require("./selectedCurrencyModal");

currencyModel.hasMany(selectedCurrencyModal, {
    foreignKey: 'currency_id',
    as:'selectedCurrencyModal',
});

selectedCurrencyModal.belongsTo(currencyModel, {
    foreignKey: 'currency_id',
    as:'currencyModel',
});

module.exports = { currencyModel, selectedCurrencyModal };