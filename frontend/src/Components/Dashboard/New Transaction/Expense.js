import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allAccounts, updateAccount } from "../../../features/accountsSlice";
import { addNewTransaction } from "../../../features/newTransactionsSlice";

const Expense = () => {
  const dispatch = useDispatch();
  const { accounts } = useSelector((state) => state.account);

  const [showError, setShowError] = useState(false);

  const newExpenseState = {
    type: "Expense",
    fromName: "",
    fromNameId: 0,
    fromAmount: 0,
    fromCode: "",
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

  const [newExpense, setNewExpense] = useState(newExpenseState);

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
  }, [dispatch]);

  useEffect(() => {
    if (accounts.length > 0) {
      const firstAccount = accounts[1];
      setNewExpense((prev) => ({
        ...prev,
        fromNameId: firstAccount.id.toString(),
        fromName: firstAccount.account_name,
        fromCode: firstAccount.account_currency_code,
        accountId: firstAccount.id || 0,
        accountGroup: firstAccount.account_type || "",
        accountBalance: firstAccount.account_balance || 0,
        accountCurrency: firstAccount.account_currency_name || "",
        accountCheck: firstAccount.account_currency_name_check || false,
        accountDashboard: firstAccount.show_on_dashboard || false,
      }));
    }
  }, [accounts]);

  const accountExpenseChange = (e) => {
    const { name, value } = e.target;
    if (name === "fromNameId") {
      const selectedAccount = accounts.find(
        (acc) => acc.id.toString() === value
      );
      setNewExpense((prevData) => ({
        ...prevData,
        [name]: value,
        accountId: selectedAccount ? selectedAccount.id : 0,
        fromName: selectedAccount ? selectedAccount.account_name : "",
        fromCode: selectedAccount ? selectedAccount.account_currency_code : "",
        accountGroup: selectedAccount ? selectedAccount.account_type : "",
        accountBalance: selectedAccount ? selectedAccount.account_balance : 0,
        accountCurrency: selectedAccount ? selectedAccount.account_currency_name : "",
        accountCheck: selectedAccount ? selectedAccount.account_currency_name_check : false,
        accountDashboard: selectedAccount ? selectedAccount.show_on_dashboard : false,
      }));
    } else {
      setNewExpense((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const saveExpense = (e) => {
    e.preventDefault();
    if (!newExpense.fromAmount) {
      setShowError(true);
    } else {
      setShowError(false);
      dispatch(
        addNewTransaction({
          transaction_type: newExpense.type,
          transaction_from_name: newExpense.fromName,
          transaction_from_amount: newExpense.fromAmount,
          transaction_from_code: newExpense.fromCode,
          transaction_to_name: "",
          transaction_to_amount: 0,
          transaction_to_code: "",
          transaction_tag: newExpense.tag,
          transaction_note: newExpense.note,
          transaction_date: newExpense.date,
          transaction_from_name_id: newExpense.fromNameId,
          transaction_to_name_id: 0,
        })
      );
      const subAmount = newExpense.accountBalance - newExpense.fromAmount;
      dispatch(
        updateAccount({
          id: newExpense.accountId,
          account_name: newExpense.fromName,
          account_type: newExpense.accountGroup,
          account_balance: subAmount,
          account_currency_code: newExpense.fromCode,
          account_currency_name: newExpense.accountCurrency,
          account_currency_name_check: newExpense.accountCheck,
          show_on_dashboard: newExpense.accountDashboard,
        })
      );
      console.log("saveExpense ", newExpense);
      setNewExpense(newExpenseState);
    }
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
            onChange={accountExpenseChange}
            value={newExpense.fromNameId}
          >
            {accounts.map((accdata) => (
              <option
                key={accdata.id}
                value={accdata.id}
                className="hover:bg-red-500 text-sm flex justify-between items-center"
              >
                {accdata.account_name}
              </option>
            ))}
            ;
          </select>
        </div>
        <div className="relative mt-[28px] ml-[14px] border rounded">
          <input
            className="w-[89px] p-[6px] rounded-l focus:border-blue-400 focus:outline-none"
            type="number"
            name="fromAmount"
            onChange={accountExpenseChange}
            value={newExpense.fromAmount}
          />
          {showError && (
            <span className="absolute top-[-30px] left-0 bg-red-500 text-white text-xs px-2 py-1 rounded shadow-md">
              Amount is required
            </span>
          )}
          <span className="p-[10px] px-[17px]  text-gray-700 text-sm bg-gray-300 rounded-r">
            {newExpense.fromCode}
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
            onChange={accountExpenseChange}
            value={newExpense.tag}
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
            value={newExpense.date}
            onChange={accountExpenseChange}
          />
        </div>
      </div>
      <div className="mt-2 flex">
        <div className="relative">
          <input
            className="block border flex mt-[5px] rounded p-[7px] w-[367px] text-sm focus:border-blue-400 hover:border-gray-400 focus:outline-none"
            type="text"
            placeholder="Note"
            name="note"
            value={newExpense.note}
            onChange={accountExpenseChange}
          />
        </div>
        <div className="relative mt-[5px] ml-[14px] border rounded">
          <button
            className="w-[151px] p-[7px] text-white bg-blue-800 text-sm rounded"
            type="button"
            onClick={saveExpense}
          >
            Add Expense
          </button>
        </div>
      </div>
    </div>
  );
};

export default Expense;
