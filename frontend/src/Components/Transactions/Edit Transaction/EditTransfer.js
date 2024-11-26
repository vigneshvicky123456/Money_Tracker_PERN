import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allAccounts } from "../../../features/accountsSlice";
import { updateNewTransaction } from "../../../features/newTransactionsSlice";

const EditTransfer = () => {
    const dispatch = useDispatch();
    const { accounts } = useSelector((state) => state.account);
    const selectedNewTransaction = useSelector(
      (state) => state.newTransaction.selectedNewTransaction
    );

    const [showError, setShowError] = useState(false);

    const editTransferState = {
      id:0,
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
    };
  
    const [editTransfer, setEditTransfer] = useState(editTransferState);

    useEffect(() => {
        dispatch(allAccounts());

        if (selectedNewTransaction) {
          setEditTransfer({
            id: selectedNewTransaction.id,
            type: selectedNewTransaction.transaction_type,
            fromName: selectedNewTransaction.transaction_from_name,
            fromAmount: selectedNewTransaction.transaction_from_amount,
            fromCode: selectedNewTransaction.transaction_from_code,
            toName: selectedNewTransaction.transaction_to_name,
            toAmount: selectedNewTransaction.transaction_to_amount,
            toCode: selectedNewTransaction.transaction_to_code,
            date: selectedNewTransaction.transaction_date,
            note: selectedNewTransaction.transaction_note,
          });
        }
      }, [dispatch, selectedNewTransaction]);
    
      const editAccountTransferChange = (e) => {
        const { name, value } = e.target;
        if (name === "fromNameId") {
          const selectedAccount = accounts.find(
            (acc) => acc.id.toString() === value
          );
          setEditTransfer((prevData) => ({
            ...prevData,
            [name]: value,
            fromName: selectedAccount ? selectedAccount.account_name : "",
            fromCode: selectedAccount ? selectedAccount.account_currency_code : "",
          }));
        } else if (name === "toNameId") {
          const selectedAccount = accounts.find(
            (acc) => acc.id.toString() === value
          );
          setEditTransfer((prevData) => ({
            ...prevData,
            [name]: value,
            toName: selectedAccount ? selectedAccount.account_name : "",
            toCode: selectedAccount ? selectedAccount.account_currency_code : "",
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
        } else {
          setShowError(false);
          dispatch(
            updateNewTransaction({
              id: editTransfer.id,
              transaction_type: editTransfer.type,
              transaction_from_name: editTransfer.fromName,
              transaction_from_amount: editTransfer.fromAmount,
              transaction_from_code: editTransfer.fromCode,
              transaction_to_name: editTransfer.toName,
              transaction_to_amount: editTransfer.toAmount,
              transaction_to_code: editTransfer.toCode,
              transaction_tag: "",
              transaction_note: editTransfer.note,
              transaction_date: editTransfer.date,
            })
          );
          console.log("saveEditTransfer ", editTransfer);
          setEditTransfer(editTransferState);
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
            value={editTransfer.fromAmount}
            onChange={editAccountTransferChange}
          />
          {showError && (
            <span className="absolute top-[-30px] left-0 bg-red-500 text-white text-xs px-2 py-1 rounded shadow-md">
              Amount is required
            </span>
          )}
          <span className="p-[10px] pl-[24px] text-gray-700 text-sm bg-gray-300 rounded-r">
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
            value={editTransfer.toAmount}
            onChange={editAccountTransferChange}
          />
          <span className="p-[10px] pl-[24px] text-gray-700 text-sm bg-gray-300 rounded-r">
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
      <div className="relative mt-3 pb-8">
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
    </div>
  )
}

export default EditTransfer;
