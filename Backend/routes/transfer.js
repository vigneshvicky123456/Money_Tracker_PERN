// const pool = require("../database");
// const express = require("express");
// const router = express.Router();


// //Create a transfer

// router.post("/", async (req, res) => {
//     try {
//       const { from_account_name, transfer_amount, from_currency_code, to_account_name, income_amount, to_currency_code, transfer_date, transfer_note } = req.body;
//       const newTransfer = await pool.query(
//         "INSERT INTO transfer ( from_account_name, transfer_amount, from_currency_code, to_account_name, income_amount, to_currency_code, transfer_date, transfer_note) VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *",
//         [ from_account_name, transfer_amount, from_currency_code, to_account_name, income_amount, to_currency_code, transfer_date, transfer_note ]
//       );
//       res.json(newTransfer.rows[0]);
//     } catch (err) {
//       console.error(err.message);
//     }
//   });

// //Get all transfers 

// router.get("/", async (req, res) => {
//     try {
//       const allTransfer = await pool.query("SELECT * FROM transfer ORDER BY id");
//       res.json(allTransfer.rows); 
//     } catch (err) {
//       console.error(err.message);
//     }
//   });

// //Get a single transfer

// router.get("/:id", async (req, res) => {
//     try {
//       const { id } = req.params;
//       const transfer = await pool.query("SELECT * FROM transfer WHERE id = $1", [id]);
//       res.json(transfer.rows[0]);
//     } catch (err) {
//       console.error(err.message);
//     }
//   });
  
// //Update a transfer

// router.put("/:id", async (req, res) => {
//     try {
//       const { id } = req.params;
//       const { from_account_name, transfer_amount, from_currency_code, to_account_name, income_amount, to_currency_code, transfer_date, transfer_note } = req.body;
//       const updateTransfer = await pool.query(
//         "UPDATE transfer SET from_account_name = $1, transfer_amount = $2, from_currency_code = $3, to_account_name = $4, income_amount = $5, to_currency_code = $6, transfer_date = $7, transfer_note = $8 WHERE id = $9 RETURNING *",
//         [ from_account_name, transfer_amount, from_currency_code, to_account_name, income_amount, to_currency_code, transfer_date, transfer_note, id ]
//       );
//       res.json("transfer was Updated!...");
//     } catch (err) {
//       console.error(err.message);
//     }
//   });
  
// //Delete a transfer
  
// router.delete("/:id", async (req, res) => {
//     try {
//       const { id } = req.params;
//       const deleteTransfer = await pool.query("DELETE FROM transfer WHERE id = $1", [
//         id
//       ]);
//       res.json("transfer was Deleted!...");
//     } catch (err) {
//       console.error(err.message);
//     }
//   });
  
// module.exports = router;