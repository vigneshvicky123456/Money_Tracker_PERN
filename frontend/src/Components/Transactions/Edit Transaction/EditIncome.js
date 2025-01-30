import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { allAccounts, updateAccount } from "../../../features/accountsSlice";
import { updateNewTransaction, deleteNewTransaction } from "../../../features/newTransactionsSlice";

const EditIncome = ({ editOnClose }) => {
  const dispatch = useDispatch();
  const { accounts } = useSelector((state) => state.account);
  const selectedNewTransaction = useSelector((state) => state.newTransaction.selectedNewTransaction);

  const [showError, setShowError] = useState(false);

  const editIncomeState = {
    id: 0,
    type: "",
    toName: "",
    toNameId: 0,
    toAmount: 0,
    toAmountStore: 0,
    toCode: "",
    tag: "",
    date: new Date().toISOString().slice(0, 10),
    note: "",
    accountId: 0,
    accountGroup: "",
    accountBalance: 0,
    accountCurrency: "",
    accountCheck: false,
    accountDashboard: false,
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
        toName: selectedNewTransaction.transaction_to_name,
        toNameId: selectedNewTransaction.transaction_to_name_id,
        toAmount: selectedNewTransaction.transaction_to_amount,
        toAmountStore: selectedNewTransaction.transaction_to_amount,
        toCode: selectedNewTransaction.transaction_to_code,
        tag: selectedNewTransaction.transaction_tag,
        date: selectedNewTransaction.transaction_date,
        note: selectedNewTransaction.transaction_note,
      });
    }
  }, [dispatch, selectedNewTransaction]);

  useEffect(() => {
    if (selectedNewTransaction && selectedNewTransaction.transaction_to_name_id) {
      const selectedAccount = Object.values(accounts).find(
        (account) => account.id === selectedNewTransaction.transaction_to_name_id
      );
      if (selectedAccount) {
        setEditIncome((prev) => ({
          ...prev,
          accountId: selectedAccount.id || 0,
          accountGroup: selectedAccount.account_type || "",
          accountBalance: selectedAccount.account_balance || 0,
          accountCurrency: selectedAccount.account_currency_name || "",
          accountCheck: selectedAccount.account_currency_name_check || false,
          accountDashboard: selectedAccount.show_on_dashboard || false,
        }));
      } else {
        console.error(
          `Account with ID ${selectedNewTransaction.transaction_from_name_id} not found in accounts.`
        );
      }
    }
  }, [selectedNewTransaction, accounts]);


  const editAccountIncomeChange = (e) => {
    const { name, value } = e.target;
    if (name === "toNameId") {
      const selectedAccount = accounts.find(
        (acc) => acc.id.toString() === value
      );
      setEditIncome((prevData) => ({
        ...prevData,
        [name]: value,
        accountId: selectedAccount ? selectedAccount.id : 0,
        toName: selectedAccount ? selectedAccount.account_name : "",
        toCode: selectedAccount ? selectedAccount.account_currency_code : "",
        accountGroup: selectedAccount ? selectedAccount.account_type : "",
        accountBalance: selectedAccount ? selectedAccount.account_balance : 0,
        accountCurrency: selectedAccount ? selectedAccount.account_currency_name : "",
        accountCheck: selectedAccount ? selectedAccount.account_currency_name_check : false,
        accountDashboard: selectedAccount ? selectedAccount.show_on_dashboard : false,
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
      return; 
    }
    setShowError(false);
    const updatedIncome = {
      ...editIncome,
      type: 'Income',
    };
    dispatch(
      updateNewTransaction({
        id: updatedIncome.id,
        transaction_type: updatedIncome.type,
        transaction_from_name: "", 
        transaction_from_amount: 0, 
        transaction_from_code: "",
        transaction_to_name: updatedIncome.toName,
        transaction_to_amount: updatedIncome.toAmount,
        transaction_to_code: updatedIncome.toCode,
        transaction_tag: updatedIncome.tag,
        transaction_note: updatedIncome.note,
        transaction_date: updatedIncome.date,
        transaction_from_name_id: 0, 
        transaction_to_name_id: updatedIncome.toNameId,
      })
    );

    const subAmount =
      parseInt(updatedIncome.accountBalance, 10) -
      parseInt(updatedIncome.toAmountStore, 10) +
      parseInt(updatedIncome.toAmount, 10);

    dispatch(
      updateAccount({
        id: updatedIncome.accountId,
        account_name: updatedIncome.toName, 
        account_type: updatedIncome.accountGroup,
        account_balance: subAmount,
        account_currency_code: updatedIncome.toCode, 
        account_currency_name: updatedIncome.accountCurrency,
        account_currency_name_check: updatedIncome.accountCheck,
        show_on_dashboard: updatedIncome.accountDashboard,
      })
    );

    setEditIncome(editIncomeState);
    editOnClose();
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
          Delete  <FontAwesomeIcon icon={faTrash} className="pl-2" />
        </button>
      </div>
    </div>
  );
};

export default EditIncome;
