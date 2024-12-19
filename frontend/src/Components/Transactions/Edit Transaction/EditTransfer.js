import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allAccounts, updateAccount } from "../../../features/accountsSlice";
import { updateNewTransaction, deleteNewTransaction } from "../../../features/newTransactionsSlice";

const EditTransfer = ({ editOnClose }) => {
    const dispatch = useDispatch();
    const { accounts } = useSelector((state) => state.account);
    const selectedNewTransaction = useSelector((state) => state.newTransaction.selectedNewTransaction);
   
    const [showError, setShowError] = useState(false);

    const editTransferState = {
      id:0,
      type: "",
      fromName: "",
      fromNameId: 0,
      fromAmount: 0,
      fromAmountStore: 0,
      fromCode: "",
      toName: "",
      toNameId: 0,
      toAmount: 0,
      toAmountStore: 0,
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
  
    const [editTransfer, setEditTransfer] = useState(editTransferState);

    useEffect(() => {
        dispatch(allAccounts());

        if (selectedNewTransaction) {
          setEditTransfer({
            id: selectedNewTransaction.id,
            fromName: selectedNewTransaction.transaction_from_name,
            fromNameId: selectedNewTransaction.transaction_from_name_id,
            fromAmount: selectedNewTransaction.transaction_from_amount,
            fromAmountStore: selectedNewTransaction.transaction_from_amount,
            fromCode: selectedNewTransaction.transaction_from_code,
            toName: selectedNewTransaction.transaction_to_name,
            toNameId: selectedNewTransaction.transaction_to_name_id,
            toAmount: selectedNewTransaction.transaction_to_amount,
            toAmountStore: selectedNewTransaction.transaction_to_amount,
            toCode: selectedNewTransaction.transaction_to_code,
            date: selectedNewTransaction.transaction_date,
            note: selectedNewTransaction.transaction_note,
          });
        }
      }, [dispatch, selectedNewTransaction]);

      useEffect(() => {
        if (selectedNewTransaction && selectedNewTransaction.transaction_from_name_id) {
          const selectedAccount = Object.values(accounts).find(
            (account) => account.id === selectedNewTransaction.transaction_from_name_id
          );
          if (selectedAccount) {
            setEditTransfer((prev) => ({
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

        if (selectedNewTransaction && selectedNewTransaction.transaction_to_name_id) {
          const selectedAccount = Object.values(accounts).find(
            (account) => account.id === selectedNewTransaction.transaction_to_name_id
          );
          if (selectedAccount) {
            setEditTransfer((prev) => ({
              ...prev,
              toAccountId: selectedAccount.id || 0,
              toAccountGroup: selectedAccount.account_type || "",
              toAccountBalance: selectedAccount.account_balance || 0,
              toAccountCurrency: selectedAccount.account_currency_name || "",
              toAccountCheck: selectedAccount.account_currency_name_check || false,
              toAccountDashboard: selectedAccount.show_on_dashboard || false,
            }));
          } else {
            console.error(
              `Account with ID ${selectedNewTransaction.transaction_from_name_id} not found in accounts.`
            );
          }
        }
      }, [selectedNewTransaction, accounts]);

      const editAccountTransferChange = (e) => {
        const { name, value } = e.target;
        if (name === "fromNameId") {
          const selectedAccount = accounts.find(
            (acc) => acc.id.toString() === value
          );
          setEditTransfer((prevData) => ({
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
          setEditTransfer((prevData) => ({
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
          setEditTransfer((prevData) => ({
            ...prevData,
            [name]: value,
          }));
        }
      };
      const saveEditTransfer = (e) => {
        e.preventDefault();
      
        if (!editTransfer.fromAmount) {
          setShowError(true);
          return;
        }
        setShowError(false);
        const updatedTransfer = {
          ...editTransfer,
          type: "Transfer",
        };
          dispatch(
            updateNewTransaction({
              id: updatedTransfer.id,
              transaction_type: updatedTransfer.type,
              transaction_from_name: updatedTransfer.fromName,
              transaction_from_amount: updatedTransfer.fromAmount,
              transaction_from_code: updatedTransfer.fromCode,
              transaction_to_name: updatedTransfer.toName,
              transaction_to_amount: updatedTransfer.fromAmount,
              transaction_to_code: updatedTransfer.toCode,
              transaction_tag: "", 
              transaction_note: updatedTransfer.note,
              transaction_date: updatedTransfer.date,
              transaction_from_name_id: updatedTransfer.fromNameId,
              transaction_to_name_id: updatedTransfer.toNameId,
            })
          );
      
          const updatedFromAccountBalance =
            parseInt(updatedTransfer.accountBalance , 10) +
            parseInt(updatedTransfer.fromAmountStore , 10) -
            parseInt(updatedTransfer.fromAmount , 10);
      
          const updatedToAccountBalance =
            parseInt(updatedTransfer.toAccountBalance , 10) -
            parseInt(updatedTransfer.toAmountStore , 10) +
            parseInt(updatedTransfer.fromAmount , 10);

          dispatch(
            updateAccount({
              id: updatedTransfer.accountId,
              account_name: updatedTransfer.fromName,
              account_type: updatedTransfer.accountGroup,
              account_balance: updatedFromAccountBalance,
              account_currency_code: updatedTransfer.fromCode,
              account_currency_name: updatedTransfer.accountCurrency,
              account_currency_name_check: updatedTransfer.accountCheck,
              show_on_dashboard: updatedTransfer.accountDashboard,
            })
          );
      
          if (updatedTransfer.toAccountId) {
            dispatch(
              updateAccount({
                id: updatedTransfer.toAccountId,
                account_name: updatedTransfer.toName,
                account_type: updatedTransfer.toAccountGroup,
                account_balance: updatedToAccountBalance,
                account_currency_code: updatedTransfer.toCode,
                account_currency_name: updatedTransfer.toAccountCurrency,
                account_currency_name_check: updatedTransfer.toAccountCheck,
                show_on_dashboard: updatedTransfer.toAccountDashboard,
              })
            );
          } else {
            console.error("toAccountId is missing or invalid.");
          }
          console.log("saveEditTransfer: ", updatedTransfer);
          setEditTransfer(editTransferState);
          editOnClose();
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
            onChange={editAccountTransferChange}
            value={editTransfer.fromNameId}
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
            ;
          </select>
        </div>
        <div className="relative mt-[28px] ml-[14px] border rounded">
          <input
            className="w-[90px] p-[6px] rounded-l focus:border-blue-400 focus:outline-none"
            type="number"
            name="fromAmount"
            value={editTransfer.fromAmount}
            onChange={editAccountTransferChange}
          />
          {showError && (
            <span className="absolute top-[-30px] left-0 bg-red-500 text-white text-xs px-2 py-1 rounded shadow-md">
              Amount is required
            </span>
          )}
          <span className="p-[7px] pl-[28px] text-gray-700 text-sm bg-gray-300 rounded-r">
            {editTransfer.fromCode}
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
            onChange={editAccountTransferChange}
            value={editTransfer.toNameId}
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
            value={editTransfer.fromAmount}
            onChange={editAccountTransferChange}
          />
          <span className="p-[7px] pl-[28px] text-gray-700 text-sm bg-gray-300 rounded-r">
            {editTransfer.toCode}
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
            value={editTransfer.note}
            onChange={editAccountTransferChange}
          />
        </div>
        <div className="relative mt-[5px] ml-[14px] border focus:border-blue-400  rounded">
          <input
            className="w-[151px] p-[7px] text-sm rounded focus:outline-none"
            type="date"
            name="date"
            value={editTransfer.date}
            onChange={editAccountTransferChange}
          />
        </div>
      </div>
      <div className="relative mt-3 pb-12">
        <div className=" w-[151px] mt-[5px] ml-[14px] rounded">
          <button
            className="absolute top-0 right-0 p-[7px] w-[151px] text-white bg-blue-800 text-sm border rounded"
            type="button"
            onClick={saveEditTransfer}
          >
            Add Transfer
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
  )
}

export default EditTransfer;
