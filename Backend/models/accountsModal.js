const { Model,DataTypes } = require('sequelize');
const sequelize = require('../database'); 

class accountModel extends Model {}

accountModel.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        account_name: {
                type: DataTypes.STRING,
                allowNull: false,
        },
        account_type: {
                type: DataTypes.STRING,
                allowNull: false,
        },
        account_balance: {
                type: DataTypes.DECIMAL,
                allowNull: false,
        },
        account_currency_code: {
                type: DataTypes.STRING(10),
                allowNull: false,
        },
        account_currency_name: {
                type: DataTypes.STRING,
                allowNull: false,
        },
        account_currency_name_check: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
        },
        show_on_dashboard: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
        },
    },
    {
        sequelize,
        modelName: 'accounts_tables'
    }
);

module.exports = accountModel;
