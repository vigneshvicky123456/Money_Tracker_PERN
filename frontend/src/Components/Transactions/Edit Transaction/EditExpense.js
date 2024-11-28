import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allAccounts } from "../../../features/accountsSlice";
import { updateNewTransaction, deleteNewTransaction } from "../../../features/newTransactionsSlice";

const EditExpense = () => {
  const dispatch = useDispatch();
  const { accounts } = useSelector((state) => state.account);
  const selectedNewTransaction = useSelector(
    (state) => state.newTransaction.selectedNewTransaction
  );

  const [showError, setShowError] = useState(false);

  const editExpenseState = {
    id: 0,
    type: "Expense",
    fromName: "",
    fromNameId: "",
    fromAmount: 0,
    fromCode: "",
    tag: "",
    date: new Date().toISOString().slice(0, 10),
    note: "",
  };

  const [editExpense, setEditExpense] = useState(editExpenseState);

  const tagOptions = [
    { id: 1, label: "Food", value: "food" },
    { id: 2, label: "House Rent", value: "House Rent" },
    { id: 3, label: "Groceries", value: "Groceries" },
    { id: 4, label: "Clothes", value: "Clothes" },
    { id: 5, label: "Vacation", value: "Vacation" },
    { id: 6, label: "Income Tax", value: "Income Tax" },
    { id: 7, label: "Service", value: "Service" },
    { id: 8, label: "Gas", value: "Gas" },
    { id: 9, label: "Shopping", value: "Shopping" },
    { id: 10, label: "Restaurant", value: "Restaurant" },
  ];

  useEffect(() => {
    dispatch(allAccounts());
    if (selectedNewTransaction) {
      setEditExpense({
        id: selectedNewTransaction.id,
        type: selectedNewTransaction.transaction_type || "Expense",
        fromName: selectedNewTransaction.transaction_from_name || "",
        fromNameId: accounts.find(
          (acc) =>
            acc.account_name === selectedNewTransaction.transaction_from_name
        )?.id.toString() || "",
        fromAmount: selectedNewTransaction.transaction_from_amount || 0,
        fromCode: selectedNewTransaction.transaction_from_code || "",
        tag: selectedNewTransaction.transaction_tag || "",
        date: selectedNewTransaction.transaction_date,
        note: selectedNewTransaction.transaction_note || "",
      });
    }
  }, [dispatch, selectedNewTransaction, accounts]);

  const editAccountExpenseChange = (e) => {
    const { name, value } = e.target;
    if (name === "fromNameId") {
      const selectedAccount = accounts.find(
        (acc) => acc.id.toString() === value
      );
      setEditExpense((prevData) => ({
        ...prevData,
        [name]: value,
        fromName: selectedAccount ? selectedAccount.account_name : "",
        fromCode: selectedAccount ? selectedAccount.account_currency_code : "",
      }));
    } else {
      setEditExpense((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const saveEditExpense = (e) => {
    e.preventDefault();
    if (!editExpense.fromAmount) {
      setShowError(true);
    } else {
      setShowError(false);
      dispatch(
        updateNewTransaction({
          id: editExpense.id,
          transaction_type: editExpense.type,
          transaction_from_name: editExpense.fromName,
          transaction_from_amount: editExpense.fromAmount,
          transaction_from_code: editExpense.fromCode,
          transaction_to_name: "",
          transaction_to_amount: 0,
          transaction_to_code: "",
          transaction_tag: editExpense.tag,
          transaction_note: editExpense.note,
          transaction_date: editExpense.date,
        })
      );
      setEditExpense(editExpenseState);
    }
  };

  const deleteTransactionById = (id) => {
    dispatch(deleteNewTransaction(id));
  };

  return (
    <div>
      <div className="flex">
        <div className="relative">
          <label className="text-sm font-medium text-black-400">From</label>
          <select
            className="block border flex rounded p-[7px] mt-[5px] w-[367px] text-sm focus:border-blue-400 hover:border-gray-400 focus:outline-none"
            id="dropdown"
            name="fromNameId"
            onChange={editAccountExpenseChange}
            value={editExpense.fromNameId || ""}
          >
            <option value="">Select an account</option>
            {accounts.map((accdata) => (
              <option
                key={accdata.id}
                value={accdata.id}
                className="hover:bg-red-500 text-sm flex justify-between items-center"
              >
                {accdata.account_name}
              </option>
            ))}
          </select>
        </div>
        <div className="relative mt-[28px] ml-[14px] border rounded">
          <input
            className="w-[89px] p-[6px] rounded-l focus:border-blue-400 focus:outline-none"
            type="number"
            name="fromAmount"
            onChange={editAccountExpenseChange}
            value={editExpense.fromAmount}
          />
          {showError && (
            <span className="absolute top-[-30px] left-0 bg-red-500 text-white text-xs px-2 py-1 rounded shadow-md">
              Amount is required
            </span>
          )}
          <span className="p-[7px] pl-[28px]  text-gray-700 text-sm bg-gray-300 rounded-r">
            {editExpense.fromCode}
          </span>
        </div>
      </div>
      <div className="mt-2 flex">
        <div className="relative">
          <label className="text-sm font-medium text-black-400">Tags</label>
          <select
            className="block border flex mt-[5px] rounded p-[7px] w-[367px] text-sm focus:border-blue-400 hover:border-gray-400 focus:outline-none"
            id="vik"
            name="tag"
            onChange={editAccountExpenseChange}
            value={editExpense.tag || ""}
          >
            <option value="">Choose existing tags</option>
            {tagOptions.map((option) => (
              <option
                key={option.id}
                value={option.value}
                className="hover:bg-red-500 text-sm focus:bg-green-500"
              >
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <div className="relative mt-[28px] ml-[14px] border focus:border-blue-400 rounded">
          <input
            className="w-[151px] p-[7px] text-sm rounded focus:outline-none"
            type="date"
            name="date"
            value={editExpense.date}
            onChange={editAccountExpenseChange}
          />
        </div>
      </div>
      <div className="mt-2 flex pb-3">
        <div className="relative">
          <input
            className="block border flex mt-[5px] rounded p-[7px] w-[367px] text-sm focus:border-blue-400 hover:border-gray-400 focus:outline-none"
            type="text"
            placeholder="Note"
            name="note"
            value={editExpense.note}
            onChange={editAccountExpenseChange}
          />
        </div>
        <div className="relative mt-[5px] ml-[14px] border rounded">
          <button
            className="w-[151px] p-[7px] text-white bg-blue-800 text-sm rounded"
            type="button"
            onClick={saveEditExpense}
          >
            Add Expense
          </button>
        </div>
      </div>
      <div className="border-t px-1 pt-4 flex justify-end">
        <button
          className="border rounded bg-red-600 py-2 px-4 text-white hover:bg-red-700 focus:outline-none"
          onClick={() => deleteTransactionById(selectedNewTransaction.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default EditExpense;


// import { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { allAccounts } from "../../../features/accountsSlice";
// import { updateNewTransaction, deleteNewTransaction } from "../../../features/newTransactionsSlice";

// const EditExpense = () => {
//   const dispatch = useDispatch();
//   const { accounts } = useSelector((state) => state.account);
//   const selectedNewTransaction = useSelector(
//     (state) => state.newTransaction.selectedNewTransaction
//   );

//   const [showError, setShowError] = useState(false);

//   const editExpenseState = {
//     id: 0,
//     type: "Expense",
//     fromName: "",
//     fromNameId: "",
//     fromAmount: 0,
//     fromCode: "",
//     tag: "",
//     date: new Date().toISOString().slice(0, 10),
//     note: "",
//   };

//   const [editExpense, setEditExpense] = useState(editExpenseState);
//   //console.log('editExpense',editExpense);

//   const tagOptions = [
//     { id: 1, label: "Food", value: "food" },
//     { id: 2, label: "House Rent", value: "House Rent" },
//     { id: 3, label: "Groceries", value: "Groceries" },
//     { id: 4, label: "Clothes", value: "Clothes" },
//     { id: 5, label: "Vacation", value: "Vacation" },
//     { id: 6, label: "Income Tax", value: "Income Tax" },
//     { id: 7, label: "Service", value: "Service" },
//     { id: 8, label: "Gas", value: "Gas" },
//     { id: 9, label: "Shopping", value: "Shopping" },
//     { id: 10, label: "Restaurant", value: "Restaurant" },
//   ];

//   useEffect(() => {
//     dispatch(allAccounts());

//     if (selectedNewTransaction) {
//       setEditExpense({
//         id: selectedNewTransaction.id,
//         type: selectedNewTransaction.transaction_type,
//         fromName: selectedNewTransaction.transaction_from_name,
//         fromAmount: selectedNewTransaction.transaction_from_amount,
//         fromCode: selectedNewTransaction.transaction_from_code,
//         tag: selectedNewTransaction.transaction_tag,
//         date: selectedNewTransaction.transaction_date,
//         note: selectedNewTransaction.transaction_note,
//       });
//     }
//   }, [dispatch, selectedNewTransaction]);

//   const editAccountExpenseChange = (e) => {
//     const { name, value } = e.target;
//     if (name === "fromNameId") {
//       const selectedAccount = accounts.find(
//         (acc) => acc.id.toString() === value
//       );
//       setEditExpense((prevData) => ({
//         ...prevData,
//         [name]: value,
//         fromName: selectedAccount ? selectedAccount.account_name : "",
//         fromCode: selectedAccount ? selectedAccount.account_currency_code : "",
//       }));
//     } else {
//       setEditExpense((prevData) => ({
//         ...prevData,
//         [name]: value,
//       }));
//     }
//   };

//   const saveEditExpense = (e) => {
//     e.preventDefault();
//     if (!editExpense.fromAmount) {
//       setShowError(true);
//     } else {
//       setShowError(false);
//       dispatch(
//         updateNewTransaction({
//           id: editExpense.id,
//           transaction_type: editExpense.type,
//           transaction_from_name: editExpense.fromName,
//           transaction_from_amount: editExpense.fromAmount,
//           transaction_from_code: editExpense.fromCode,
//           transaction_to_name: "",
//           transaction_to_amount: 0,
//           transaction_to_code: "",
//           transaction_tag: editExpense.tag,
//           transaction_note: editExpense.note,
//           transaction_date: editExpense.date,
//         })
//       );
//       console.log("saveEditExpense ", editExpense);
//       setEditExpense(editExpenseState);
//     }
//   };

//   const deleteTransactionById = (id) => {
//     dispatch(deleteNewTransaction(id));
//   };

//   return (
//     <div>
//       <div className="flex">
//         <div className="relative">
//           <label className="text-sm font-medium text-black-400">From</label>
//           <select
//             className="block border flex rounded p-[7px] mt-[5px] w-[367px] text-sm focus:border-blue-400 hover:border-gray-400 focus:outline-none"
//             id="dropdown"
//             name="fromNameId"
//             onChange={editAccountExpenseChange}
//             value={editExpense.fromNameId}
//           >
//             {accounts.map((accdata) => (
//               <option
//                 key={accdata.id}
//                 value={accdata.id}
//                 className="hover:bg-red-500 text-sm flex justify-between items-center"
//               >
//                 {accdata.account_name}
//                 {/* {accdata.account_type} */}
//               </option>
//             ))}
//             ;
//           </select>
//         </div>
//         <div className="relative mt-[28px] ml-[14px] border rounded">
//           <input
//             className="w-[89px] p-[6px] rounded-l focus:border-blue-400 focus:outline-none"
//             type="number"
//             name="fromAmount"
//             onChange={editAccountExpenseChange}
//             value={editExpense.fromAmount}
//           />
//           {showError && (
//             <span className="absolute top-[-30px] left-0 bg-red-500 text-white text-xs px-2 py-1 rounded shadow-md">
//               Amount is required
//             </span>
//           )}
//           <span className="p-[7px] pl-[28px]  text-gray-700 text-sm bg-gray-300 rounded-r">
//             {editExpense.fromCode}
//           </span>
//         </div>
//       </div>
//       <div className="mt-2 flex">
//         <div className="relative">
//           <label className="text-sm font-medium text-black-400">Tags</label>
//           <select
//             className="block border flex mt-[5px] rounded p-[7px] w-[367px] text-sm focus:border-blue-400 hover:border-gray-400 focus:outline-none"
//             id="vik"
//             name="tag"
//             placeholder="Choose existing tags or add new"
//             onChange={editAccountExpenseChange}
//             value={editExpense.tag}
//           >
//             <option className="text-sm text-gray-300">
//               Choose existing tags
//             </option>
//             {tagOptions.map((option) => (
//               <option
//                 key={option.id}
//                 value={option.value}
//                 className="hover:bg-red-500 text-sm focus:bg-green-500"
//               >
//                 {option.label}
//               </option>
//             ))}
//           </select>
//         </div>
//         <div className="relative mt-[28px] ml-[14px] border focus:border-blue-400  rounded">
//           <input
//             className="w-[151px] p-[7px] text-sm rounded focus:outline-none"
//             type="date"
//             name="date"
//             value={editExpense.date}
//             onChange={editAccountExpenseChange}
//           />
//         </div>
//       </div>
//       <div className="mt-2 flex pb-3">
//         <div className="relative">
//           <input
//             className="block border flex mt-[5px] rounded p-[7px] w-[367px] text-sm focus:border-blue-400 hover:border-gray-400 focus:outline-none"
//             type="text"
//             placeholder="Note"
//             name="note"
//             value={editExpense.note}
//             onChange={editAccountExpenseChange}
//           />
//         </div>
//         <div className="relative mt-[5px] ml-[14px] border rounded">
//           <button
//             className="w-[151px] p-[7px] text-white bg-blue-800 text-sm rounded"
//             type="button"
//             onClick={saveEditExpense}
//           >
//             Add Expense
//           </button>
//         </div>
//       </div>
//       <div className="border-t px-1 pt-4 flex justify-end">
//           <button 
//             className="border rounded bg-red-600 py-2 px-4 text-white hover:bg-red-700 focus:outline-none"
//             onClick={() => deleteTransactionById(selectedNewTransaction.id)}
//           >
//             Delete
//           </button>
//         </div>
//     </div>
//   );
// };

// export default EditExpense;
