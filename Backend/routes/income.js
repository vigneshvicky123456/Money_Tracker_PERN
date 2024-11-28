// const pool = require("../database");
// const express = require("express");
// const router = express.Router();


// //Create a income

// router.post("/", async (req, res) => {
//     try {
//       const { to_account_name, income_amount, to_currency_code, income_tags, income_date, income_note } = req.body;
//       const newIncome = await pool.query(
//         "INSERT INTO income ( to_account_name, income_amount, to_currency_code, income_tags, income_date, income_note) VALUES($1, $2, $3, $4, $5, $6) RETURNING *",
//         [ to_account_name, income_amount, to_currency_code, income_tags, income_date, income_note ]
//       );
//       res.json(newIncome.rows[0]);
//     } catch (err) {
//       console.error(err.message);
//     }
//   });

// //Get all incomes

// router.get("/", async (req, res) => {
//     try {
//       const allIncome = await pool.query("SELECT * FROM income ORDER BY id");
//       res.json(allIncome.rows); 
//     } catch (err) {
//       console.error(err.message);
//     }
//   });

// //Get a single income

// router.get("/:id", async (req, res) => {
//     try {
//       const { id } = req.params;
//       const income = await pool.query("SELECT * FROM income WHERE id = $1", [id]);
//       res.json(income.rows[0]);
//     } catch (err) {
//       console.error(err.message);
//     }
//   });
  
  
// //Update a income

// router.put("/:id", async (req, res) => {
//     try {
//       const { id } = req.params;
//       const { to_account_name, income_amount, to_currency_code, income_tags, income_date, income_note } = req.body;
//       const updateIncome = await pool.query(
//         "UPDATE income SET to_account_name = $1, income_amount = $2, to_currency_code = $3, income_tags = $4, income_date = $5, income_note = $6 WHERE id = $7 RETURNING *",
//         [ to_account_name, income_amount, to_currency_code, income_tags, income_date, income_note, id ]
//       );
//       res.json("income was Updated!...");
//     } catch (err) {
//       console.error(err.message);
//     }
//   });
  
// //Delete a income
  
// router.delete("/:id", async (req, res) => {
//     try {
//       const { id } = req.params;
//       const deleteIncome = await pool.query("DELETE FROM income WHERE id = $1", [
//         id
//       ]);
//       res.json("income was Deleted!...");
//     } catch (err) {
//       console.error(err.message);
//     }
//   });
  
// module.exports = router;