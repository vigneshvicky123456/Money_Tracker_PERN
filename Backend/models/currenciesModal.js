const { Model,DataTypes } = require('sequelize');
const sequelize = require('../database'); 

class currencyModel extends Model {}

currencyModel.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        currency_name: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        currency_code: {
            type: DataTypes.STRING(10),
            allowNull: false
        },
        currency_value: {
            type: DataTypes.DECIMAL,
            allowNull: false
        },
        currency_flag: {
            type: DataTypes.STRING(250),
            allowNull: false
        },
    },
    {
        sequelize,
        modelName: 'currency_tables'
    }
);

module.exports = currencyModel;
