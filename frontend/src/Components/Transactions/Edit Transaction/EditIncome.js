import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allAccounts } from "../../../features/accountsSlice";
import {
  updateNewTransaction,
  deleteNewTransaction,
} from "../../../features/newTransactionsSlice";

const EditIncome = () => {
  const dispatch = useDispatch();
  const { accounts } = useSelector((state) => state.account);
  const selectedNewTransaction = useSelector(
    (state) => state.newTransaction.selectedNewTransaction
  );

  const [showError, setShowError] = useState(false);

  const editIncomeState = {
    id: 0,
    type: "Income",
    toName: "",
    toNameId: "",
    toAmount: 0,
    toCode: "",
    tag: "",
    date: new Date().toISOString().slice(0, 10),
    note: "",
  };

  const [editIncome, setEditIncome] = useState(editIncomeState);

  const tagOptions = [
    { id: 1, label: "Salary", value: "Salary" },
    { id: 2, label: "Bonus", value: "Bonus" },
    { id: 3, label: "EU Consulting", value: "EU Consulting" },
  ];

  useEffect(() => {
    dispatch(allAccounts());

    if (selectedNewTransaction) {
      setEditIncome({
        id: selectedNewTransaction.id,
        type: selectedNewTransaction.transaction_type,
        toName: selectedNewTransaction.transaction_to_name,
        toAmount: selectedNewTransaction.transaction_to_amount,
        toCode: selectedNewTransaction.transaction_to_code,
        tag: selectedNewTransaction.transaction_tag,
        date: selectedNewTransaction.transaction_date,
        note: selectedNewTransaction.transaction_note,
      });
    }
  }, [dispatch, selectedNewTransaction]);

  const editAccountIncomeChange = (e) => {
    const { name, value } = e.target;
    if (name === "toNameId") {
      const selectedAccount = accounts.find(
        (acc) => acc.id.toString() === value
      );
      setEditIncome((prevData) => ({
        ...prevData,
        [name]: value,
        toName: selectedAccount ? selectedAccount.account_name : "",
        toCode: selectedAccount ? selectedAccount.account_currency_code : "",
      }));
    } else {
      setEditIncome((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const saveEditIncome = (e) => {
    e.preventDefault();
    if (!editIncome.toAmount) {
      setShowError(true);
    } else {
      setShowError(false);
      dispatch(
        updateNewTransaction({
          id: editIncome.id,
          transaction_type: editIncome.type,
          transaction_from_name: "",
          transaction_from_amount: 0,
          transaction_from_code: "",
          transaction_to_name: editIncome.toName,
          transaction_to_amount: editIncome.toAmount,
          transaction_to_code: editIncome.toCode,
          transaction_tag: editIncome.tag,
          transaction_note: editIncome.note,
          transaction_date: editIncome.date,
        })
      );
      console.log("saveEditIncome ", editIncome);
      setEditIncome(editIncomeState);
    }
  };

  const deleteTransactionById = (id) => {
    dispatch(deleteNewTransaction(id));
  };

  return (
    <div>
      <div className="flex">
        <div className="relative">
          <label className="text-sm font-medium text-black-400">To</label>
          <select
            className="block border flex rounded p-[7px] mt-[5px] w-[367px] text-sm focus:border-blue-400 hover:border-gray-400 focus:outline-none"
            id="dropdown"
            name="toNameId"
            onChange={editAccountIncomeChange}
            value={editIncome.toNameId}
          >
            {accounts.map((accdata) => (
              <option
                key={accdata.id}
                value={accdata.id}
                className="hover:bg-red-500 text-sm focus:bg-green-500"
              >
                {accdata.account_name}
                {/* {accdata.account_type} */}
              </option>
            ))}
          </select>
        </div>
        <div className="relative mt-[28px] ml-[14px] border rounded">
          <input
            className="w-[90px] p-[6px] rounded-l focus:border-blue-400 focus:outline-none"
            type="number"
            name="toAmount"
            onChange={editAccountIncomeChange}
            value={editIncome.toAmount}
          />
          {showError && (
            <span className="absolute top-[-30px] left-0 bg-red-500 text-white text-xs px-2 py-1 rounded shadow-md">
              Amount is required
            </span>
          )}
          <span className="p-[7px] pl-[28px] text-gray-700 text-sm bg-gray-300 rounded-r">
            {editIncome.toCode}
          </span>
        </div>
      </div>
      <div className="mt-2 flex">
        <div className="relative">
          <label className="text-sm font-medium text-black-400">Tags</label>
          <select
            className="block border flex mt-[5px] rounded p-[7px] w-[367px] text-sm focus:border-blue-400 hover:border-gray-400 focus:outline-none"
            id="dropdown"
            name="tag"
            placeholder="Choose existing tags or add new"
            onChange={editAccountIncomeChange}
            value={editIncome.tag}
          >
            <option className="text-sm text-gray-300">
              Choose existing tags
            </option>
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
        <div className="relative mt-[28px] ml-[14px] border focus:border-blue-400  rounded">
          <input
            className="w-[151px] p-[7px] text-sm rounded focus:outline-none"
            type="date"
            name="date"
            value={editIncome.date}
            onChange={editAccountIncomeChange}
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
            value={editIncome.note}
            onChange={editAccountIncomeChange}
          />
        </div>
        <div className="relative mt-[5px] ml-[14px] border rounded">
          <button
            className="w-[151px] p-[7px] text-white bg-blue-800 text-sm rounded"
            type="button"
            onClick={saveEditIncome}
          >
            Add Income
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

export default EditIncome;
