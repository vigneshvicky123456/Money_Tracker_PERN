import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allAccounts, updateAccount } from "../../../features/accountsSlice";
import { addNewTransaction } from "../../../features/newTransactionsSlice";

const Income = () => {
  const dispatch = useDispatch();
  const { accounts } = useSelector((state) => state.account);

  const [showError, setShowError] = useState(false);

  const newIncomeState = {
    type: "Income",
    toName: "",
    toNameId: 0,
    toAmount: 0,
    toCode: "",
    tag: "",
    date: new Date().toISOString().slice(0, 10),
    note: "",

    toAccountId: 0,
    toAccountGroup: "",
    toAccountBalance: 0,
    toAccountCurrency: "",
    toAccountCheck: false,
    toAccountDashboard: false,
  };

  const [newIncome, setNewIncome] = useState(newIncomeState);

  const tagOptions = [
    { id: 1, label: "Salary", value: "Salary" },
    { id: 2, label: "Bonus", value: "Bonus" },
    { id: 3, label: "EU Consulting", value: "EU Consulting" },
  ];

  useEffect(() => {
    dispatch(allAccounts());
  }, [dispatch]);

  useEffect(() => {
    if (accounts.length > 0) {
      const firstAccount = accounts[1];
      setNewIncome((prev) => ({
        ...prev,
        toNameId: firstAccount.id.toString(),
        toName: firstAccount.account_name,
        toCode: firstAccount.account_currency_code,
        toAccountId: firstAccount.id || 0,
        toAccountGroup: firstAccount.account_type || "",
        toAccountBalance: firstAccount.account_balance || 0,
        toAccountCurrency: firstAccount.account_currency_name || "",
        toAccountCheck: firstAccount.account_currency_name_check || false,
        toAccountDashboard: firstAccount.show_on_dashboard || false,
      }));
    }
  }, [accounts]);

  const accountIncomeChange = (e) => {
    const { name, value } = e.target;
    if (name === "toNameId") {
      const selectedAccount = accounts.find(
        (acc) => acc.id.toString() === value
      );
      setNewIncome((prevData) => ({
        ...prevData,
        [name]: value,
        toAccountId: selectedAccount ? selectedAccount.id : 0,
        toName: selectedAccount ? selectedAccount.account_name : "",
        toCode: selectedAccount ? selectedAccount.account_currency_code : "",
        toAccountGroup: selectedAccount ? selectedAccount.account_type : "",
        toAccountBalance: selectedAccount ? selectedAccount.account_balance : 0,
        toAccountCurrency: selectedAccount ? selectedAccount.account_currency_name : "",
        toAccountCheck: selectedAccount ? selectedAccount.account_currency_name_check : false,
        toAccountDashboard: selectedAccount ? selectedAccount.show_on_dashboard : false,
      }));
    } else {
      setNewIncome((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const saveIncome = (e) => {
    e.preventDefault();
    if (!newIncome.toAmount) {
      setShowError(true);
    } else {
      setShowError(false);
      dispatch(
        addNewTransaction({
          transaction_type: newIncome.type,
          transaction_from_name: "",
          transaction_from_amount: 0,
          transaction_from_code: "",
          transaction_to_name: newIncome.toName,
          transaction_to_amount: newIncome.toAmount,
          transaction_to_code: newIncome.toCode,
          transaction_tag: newIncome.tag,
          transaction_note: newIncome.note,
          transaction_date: newIncome.date,
          transaction_to_name_id: newIncome.toNameId,
          transaction_from_name_id: 0,
        })
      );
      const addAmount = parseInt(newIncome.toAccountBalance) + parseInt(newIncome.toAmount);
      dispatch(
        updateAccount({
          id: newIncome.toAccountId,
          account_name: newIncome.toName,
          account_type: newIncome.toAccountGroup,
          account_balance: addAmount,
          account_currency_code: newIncome.toCode,
          account_currency_name: newIncome.toAccountCurrency,
          account_currency_name_check: newIncome.toAccountCheck,
          show_on_dashboard: newIncome.toAccountDashboard,
        })
      );
      setNewIncome(newIncomeState);
    }
  };

  return (
    <div className="">
      <div className="flex">
        <div className="relative">
          <label className="text-sm font-medium text-black-400">To</label>
          <select
            className="block border flex rounded p-[7px] mt-[5px] w-[367px] text-sm focus:border-blue-400 hover:border-gray-400 focus:outline-none"
            id="dropdown"
            name="toNameId"
            onChange={accountIncomeChange}
            value={newIncome.toNameId}
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
            onChange={accountIncomeChange}
            value={newIncome.toAmount}
          />
          {showError && (
            <span className="absolute top-[-30px] left-0 bg-red-500 text-white text-xs px-2 py-1 rounded shadow-md">
              Amount is required
            </span>
          )}
          <span className="p-[10px] pl-[24px] text-gray-700 text-sm bg-gray-300 rounded-r">
            {newIncome.toCode}
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
            onChange={accountIncomeChange}
            value={newIncome.tag}
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
            value={newIncome.date}
            onChange={accountIncomeChange}
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
            value={newIncome.note}
            onChange={accountIncomeChange}
          />
        </div>
        <div className="relative mt-[5px] ml-[14px] border rounded">
          <button
            className="w-[151px] p-[7px] text-white bg-blue-800 text-sm rounded"
            type="button"
            onClick={saveIncome}
          >
            Add Income
          </button>
        </div>
      </div>
    </div>
  );
};

export default Income;
