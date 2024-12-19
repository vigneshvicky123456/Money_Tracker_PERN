const express = require("express");
const { Op } = require("sequelize");
const newTransactionModel = require("../../models/newTransactionModal");
const router = express.Router();
const moment = require("moment");

router.get("/netIncome", async (req, res) => {
  const { reportsType, year, monthYear, accountId } = req.query;

  if (reportsType === "NetIncome") {
    try {
      let incomeData = [];
      let amountData = []; 
      let totalIncomeAmount = 0; 
      let totalExpenseAmount = 0; 
      let activeMonths = 0; 

      if (year && accountId) {
        const accountIdArray = accountId
            .split(",")
            .map((id) => parseInt(id.trim()));

        for (let month = 1; month <= 12; month++) {
          const startDate = moment(`${year}-${month}-01`).startOf("month").format("YYYY-MM-DD");
          const endDate = moment(`${year}-${month}-01`).endOf("month").format("YYYY-MM-DD");

          const monthlyIncome = (await newTransactionModel.sum("transaction_to_amount", {
              where: {
                transaction_date: { [Op.between]: [startDate, endDate] },
                transaction_type: "Income",
                transaction_to_name_id: { [Op.in]: accountIdArray }
              },
            })) || 0;

          const monthlyExpense = (await newTransactionModel.sum("transaction_from_amount", {
              where: {
                transaction_date: { [Op.between]: [startDate, endDate] },
                transaction_type: "Expense",
                transaction_from_name_id: { [Op.in]: accountIdArray } 
              },
            })) || 0;

          // Calculate net income for the month
          const NetIncome = parseFloat(monthlyIncome) - parseFloat(monthlyExpense);

          if (monthlyIncome > 0 || monthlyExpense > 0) {
            activeMonths++;
            totalIncomeAmount += monthlyIncome;
            totalExpenseAmount += monthlyExpense;
          }

          incomeData.push({ month: moment(startDate).format("MMM"), NetIncome });
        }

        // Calculate total and average net income
        const totalNetIncome = totalIncomeAmount - totalExpenseAmount;
        const averageNetIncome = activeMonths > 0 ? totalNetIncome / activeMonths : 0;

        amountData.push({ totalNetIncome, averageNetIncome });
      }

      else if (year) {
        for (let month = 1; month <= 12; month++) {
          const startDate = moment(`${year}-${month}-01`).startOf("month").format("YYYY-MM-DD");
          const endDate = moment(`${year}-${month}-01`).endOf("month").format("YYYY-MM-DD");

          const monthlyIncome = (await newTransactionModel.sum("transaction_to_amount", {
              where: {
                transaction_date: { [Op.between]: [startDate, endDate] },
                transaction_type: "Income",
              },
            })) || 0;

          const monthlyExpense = (await newTransactionModel.sum("transaction_from_amount", {
              where: {
                transaction_date: { [Op.between]: [startDate, endDate] },
                transaction_type: "Expense",
              },
            })) || 0;

          // Calculate net income for the month
          const NetIncome = parseFloat(monthlyIncome) - parseFloat(monthlyExpense);

          if (monthlyIncome > 0 || monthlyExpense > 0) {
            activeMonths++;
            totalIncomeAmount += monthlyIncome;
            totalExpenseAmount += monthlyExpense;
          }

          incomeData.push({ month: moment(startDate).format("MMM"), NetIncome });
        }

      // Calculate total and average net income
        const totalNetIncome = totalIncomeAmount - totalExpenseAmount;
        const averageNetIncome = activeMonths > 0 ? totalNetIncome / activeMonths : 0;

        amountData.push({ totalNetIncome, averageNetIncome });
      }

      else if (monthYear && accountId) {
        const accountIdArray = accountId
        .split(",")
        .map((id) => parseInt(id.trim()));

        const monthYearDate = moment(monthYear, "MMM YYYY");
        const startDate = monthYearDate.startOf("month").format("YYYY-MM-DD");
        const endDate = monthYearDate.endOf("month").format("YYYY-MM-DD");

        for (let month = 1; month <= monthYearDate.daysInMonth(); month++) {
          const dayDate = moment(`${monthYearDate.format("YYYY-MM")}-${month}`,"YYYY-MM-DD").format("YYYY-MM-DD");
  
          const dailyIncome = await newTransactionModel.sum("transaction_to_amount", {
            where: { 
              transaction_date: dayDate,
              transaction_type: "Income",
              transaction_to_name_id: { [Op.in]: accountIdArray }  
            }
          }) || 0;
    
          const dailyExpense = await newTransactionModel.sum("transaction_from_amount", {
              where: { 
                transaction_date: dayDate,
                transaction_type: "Expense",
                transaction_from_name_id: { [Op.in]: accountIdArray }   
              }
          }) || 0;  

          // Calculate net income for day
        const NetIncome = parseFloat(dailyIncome) - parseFloat(dailyExpense);

         if (dailyIncome > 0 || dailyExpense > 0) {
          activeMonths++;
          totalIncomeAmount += dailyIncome;
          totalExpenseAmount += dailyExpense;
        }

          incomeData.push({ month, NetIncome });
        }

        const totalNetIncome = totalIncomeAmount - totalExpenseAmount;
        const averageNetIncome = activeMonths > 0 ? totalNetIncome / activeMonths : 0;

        amountData.push({ totalNetIncome, averageNetIncome });
      }

      else if (monthYear) {
          const monthYearDate = moment(monthYear, "MMM YYYY");
          const startDate = monthYearDate.startOf("month").format("YYYY-MM-DD");
          const endDate = monthYearDate.endOf("month").format("YYYY-MM-DD");

          for (let month = 1; month <= monthYearDate.daysInMonth(); month++) {
            const dayDate = moment(`${monthYearDate.format("YYYY-MM")}-${month}`,"YYYY-MM-DD").format("YYYY-MM-DD");
    
            const dailyIncome = await newTransactionModel.sum("transaction_to_amount", {
              where: { 
                transaction_date: dayDate,
                transaction_type: "Income"  
              }
            }) || 0;
      
            const dailyExpense = await newTransactionModel.sum("transaction_from_amount", {
                where: { 
                  transaction_date: dayDate,
                  transaction_type: "Expense"  
                }
            }) || 0;  

            // Calculate net income for the day
          const NetIncome = parseFloat(dailyIncome) - parseFloat(dailyExpense);

           if (dailyIncome > 0 || dailyExpense > 0) {
            activeMonths++;
            totalIncomeAmount += dailyIncome;
            totalExpenseAmount += dailyExpense;
          }

            incomeData.push({ month, NetIncome });
          }

          const totalNetIncome = totalIncomeAmount - totalExpenseAmount;
          const averageNetIncome = activeMonths > 0 ? totalNetIncome / activeMonths : 0;

          amountData.push({ totalNetIncome, averageNetIncome });
        }

      res.json({ incomeData, amountData });
    } catch (error) {
      console.error("Error calculating net income:", error);
      res.status(500).json({ message: "Error calculating net income" });
    }
 } else {
    res.status(400).json({ message: "Invalid report type" });
 }
});

module.exports = router;
