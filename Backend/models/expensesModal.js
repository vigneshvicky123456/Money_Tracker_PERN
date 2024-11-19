// const { DataTypes } = require('sequelize');
// const sequelize = require('../database');


// const ExpensesTable = sequelize.define('expenses_table', {
//     id: {
//         type: DataTypes.INTEGER,
//         primaryKey: true,
//         autoIncrement: true
//     },
//     from_account_name: {
//         type: DataTypes.STRING(100),
//         allowNull: false
//     },
//     expense_amount: {
//         type: DataTypes.DECIMAL,
//         allowNull: false
//     },
//     expense_currency_code: {
//         type: DataTypes.STRING(10),
//         allowNull: false
//     },
//     expense_tags: {
//         type: DataTypes.STRING(100),
//         allowNull: false
//     },
//     expense_date: {
//         type: DataTypes.DATE,
//         allowNull: false
//     },
//     expense_note: {
//         type: DataTypes.STRING(500),
//         allowNull: false
//     }
// }, 
// // {
// //     tableName: 'expenses',
// //     timestamps: false
// // }
// );

// module.exports = ExpensesTable;