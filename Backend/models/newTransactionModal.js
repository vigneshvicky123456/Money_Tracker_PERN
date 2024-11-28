const { Model,DataTypes } = require('sequelize');
const sequelize = require('../database'); 

class newTransactionModel extends Model {}

newTransactionModel.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        transaction_type: {
                type: DataTypes.STRING,
                allowNull: false,
        },
        transaction_from_name: {
                type: DataTypes.STRING,
                allowNull: false,
        },
        transaction_from_amount: {
                type: DataTypes.DECIMAL,
                allowNull: false,
        },
        transaction_from_code: {
                type: DataTypes.STRING(10),
                allowNull: false,
        },
        transaction_to_name: {
                type: DataTypes.STRING,
                allowNull: false,
        },
        transaction_to_amount: {
            type: DataTypes.DECIMAL,
            allowNull: false,
        },
        transaction_to_code: {
            type: DataTypes.STRING(10),
            allowNull: false,
        },
        transaction_tag: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        transaction_note: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        transaction_date: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'transactions_tables'
    }
);

module.exports = newTransactionModel;