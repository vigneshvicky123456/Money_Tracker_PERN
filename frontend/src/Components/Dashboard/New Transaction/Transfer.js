import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allAccounts, updateAccount } from "../../../features/accountsSlice";
import { addNewTransaction } from "../../../features/newTransactionsSlice";

const Transfer = () => {
  const dispatch = useDispatch();
  const { accounts } = useSelector((state) => state.account);

  const [showError, setShowError] = useState(false);

  const newTransferState = {
    type: "Transfer",
    fromName: "",
    fromNameId: "",
    fromAmount: 0,
    fromCode: "",
    toName: "",
    toNameId: "",
    toAmount: 0,
    toCode: "",
    date: new Date().toISOString().slice(0, 10),
    note: "",

    accountId: 0,
    accountGroup: "",
    accountBalance: 0,
    accountCurrency: "",
    accountCheck: false,
    accountDashboard: false,

    toAccountId: 0,
    toAccountGroup: "",
    toAccountBalance: 0,
    toAccountCurrency: "",
    toAccountCheck: false,
    toAccountDashboard: false,
  };

  const [newTransfer, setNewTransfer] = useState(newTransferState);

  useEffect(() => {
    dispatch(allAccounts());
  }, [dispatch]);

  useEffect(() => {
    if (accounts.length > 0) {
      const firstAccount = accounts[0];
      setNewTransfer((prev) => ({
        ...prev,
        fromNameId: firstAccount.id.toString(),
        fromName: firstAccount.account_name,
        fromCode: firstAccount.account_currency_code,
      }));
    }
  }, [accounts]);

  useEffect(() => {
    if (accounts.length > 0) {
      const secondAccount = accounts[1];
      setNewTransfer((prev) => ({
        ...prev,
        toNameId: secondAccount.id.toString(),
        toName: secondAccount.account_name,
        toCode: secondAccount.account_currency_code,
      }));
    }
  }, [accounts]);

  const accountTransferChange = (e) => {
    const { name, value } = e.target;
    if (name === "fromNameId") {
      const selectedAccount = accounts.find(
        (acc) => acc.id.toString() === value
      );
      setNewTransfer((prevData) => ({
        ...prevData,
        [name]: value,
        accountId: selectedAccount ? selectedAccount.id : 0,
        fromName: selectedAccount ? selectedAccount.account_name : "",
        fromCode: selectedAccount ? selectedAccount.account_currency_code : "",
        accountGroup: selectedAccount ? selectedAccount.account_type : "",
        accountBalance: selectedAccount ? selectedAccount.account_balance : "",
        accountCurrency: selectedAccount ? selectedAccount.account_currency_name : "",
        accountCheck: selectedAccount ? selectedAccount.account_currency_name_check : false,
        accountDashboard: selectedAccount ? selectedAccount.show_on_dashboard : false,
      }));
    } else if (name === "toNameId") {
      const selectedAccount = accounts.find(
        (acc) => acc.id.toString() === value
      );
      setNewTransfer((prevData) => ({
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
      setNewTransfer((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const saveTransfer = (e) => {
    e.preventDefault();
    if (!newTransfer.fromAmount) {
      setShowError(true);
    } else {
      setShowError(false);
      dispatch(
        addNewTransaction({
          transaction_type: newTransfer.type,
          transaction_from_name: newTransfer.fromName,
          transaction_from_amount: newTransfer.fromAmount,
          transaction_from_code: newTransfer.fromCode,
          transaction_to_name: newTransfer.toName,
          transaction_to_amount: newTransfer.toAmount,
          transaction_to_code: newTransfer.toCode,
          transaction_tag: "",
          transaction_note: newTransfer.note,
          transaction_date: newTransfer.date,
        })
      );
      const subAmount = newTransfer.accountBalance - newTransfer.fromAmount;
      dispatch(
        updateAccount({
          id: newTransfer.accountId,
          account_name: newTransfer.fromName,
          account_type: newTransfer.accountGroup,
          account_balance: subAmount,
          account_currency_code: newTransfer.fromCode,
          account_currency_name: newTransfer.accountCurrency,
          account_currency_name_check: newTransfer.accountCheck,
          show_on_dashboard: newTransfer.accountDashboard,
        })
      );
      const addAmount = parseInt(newTransfer.toAccountBalance)  + parseInt(newTransfer.toAmount);
      dispatch(
        updateAccount({
          id: newTransfer.toAccountId,
          account_name: newTransfer.toName,
          account_type: newTransfer.toAccountGroup,
          account_balance: addAmount,
          account_currency_code: newTransfer.toCode,
          account_currency_name: newTransfer.toAccountCurrency,
          account_currency_name_check: newTransfer.toAccountCheck,
          show_on_dashboard: newTransfer.toAccountDashboard,
        })
      );
      console.log("saveTransfer ", newTransfer);
      setNewTransfer(newTransferState);
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
            onChange={accountTransferChange}
            value={newTransfer.fromNameId}
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
            ;
          </select>
        </div>
        <div className="relative mt-[28px] ml-[14px] border rounded">
          <input
            className="w-[90px] p-[6px] rounded-l focus:border-blue-400 focus:outline-none"
            type="number"
            name="fromAmount"
            value={newTransfer.fromAmount}
            onChange={accountTransferChange}
          />
          {showError && (
            <span className="absolute top-[-30px] left-0 bg-red-500 text-white text-xs px-2 py-1 rounded shadow-md">
              Amount is required
            </span>
          )}
          <span className="p-[10px] pl-[24px] text-gray-700 text-sm bg-gray-300 rounded-r">
            {newTransfer.fromCode}
          </span>
        </div>
      </div>
      <div className="mt-2 flex">
        <div className="relative">
          <label className="text-sm font-medium text-black-400">To</label>
          <select
            className="block border flex rounded p-[7px] mt-[5px] w-[367px] text-sm focus:border-blue-400 hover:border-gray-400 focus:outline-none"
            id="dropdown"
            name="toNameId"
            onChange={accountTransferChange}
            value={newTransfer.toNameId}
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
            value={newTransfer.toAmount}
            onChange={accountTransferChange}
          />
          <span className="p-[10px] pl-[24px] text-gray-700 text-sm bg-gray-300 rounded-r">
            {newTransfer.toCode}
          </span>
        </div>
      </div>
      <div className="mt-2 flex">
        <div className="relative">
          <input
            className="block border flex mt-[5px] rounded p-[7px] w-[367px] text-sm focus:border-blue-400 hover:border-gray-400 focus:outline-none"
            type="text"
            placeholder="Note"
            name="note"
            value={newTransfer.note}
            onChange={accountTransferChange}
          />
        </div>
        <div className="relative mt-[5px] ml-[14px] border focus:border-blue-400  rounded">
          <input
            className="w-[151px] p-[7px] text-sm rounded focus:outline-none"
            type="date"
            name="date"
            value={newTransfer.date}
            onChange={accountTransferChange}
          />
        </div>
      </div>
      <div className="relative mt-3 pb-8">
        <div className=" w-[151px] mt-[5px] ml-[14px] rounded">
          <button
            className="absolute top-0 right-0 p-[7px] w-[151px] text-white bg-blue-800 text-sm border rounded"
            type="button"
            onClick={saveTransfer}
          >
            Add Transfer
          </button>
        </div>
      </div>
    </div>
  );
};

export default Transfer;
