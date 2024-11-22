import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allAccounts } from "../../../features/accountsSlice";
import { addNewTransaction } from "../../../features/newTransactionsSlice";

const Expense = () => {
  const dispatch = useDispatch();
  const { accounts } = useSelector((state) => state.account);

  const newExpenseState = {
    type: "Expense",
    fromName: "",
    fromNameId: "",
    fromAmount: 0,
    fromCode: "",
    tag: "",
    date: new Date(),
    note: "",
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

  const accountExpenseChange = (e) => {
    const { name, value } = e.target;

    if (name === "fromNameId") {
      const selectedAccount = accounts.find(
        (acc) => acc.id.toString() === value
      );
      setNewExpense((prevData) => ({
        ...prevData,
        [name]: value,
        fromName: selectedAccount ? selectedAccount.account_name : "",
        fromCode: selectedAccount ? selectedAccount.account_currency_code : "",
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
      })
    );

    console.log("saveExpense ", newExpense);
    setNewExpense(newExpenseState);
  };

  return (
    <div className="">
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
                {/* {accdata.account_type} */}
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
          <span className="p-[9px] px-[40px]  text-gray-700 text-sm bg-gray-300 rounded-r">
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
