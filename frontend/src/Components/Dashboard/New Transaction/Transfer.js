import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allAccounts } from "../../../features/accountsSlice";
import { addNewTransaction } from "../../../features/newTransactionsSlice";

const Transfer = () => {
  const dispatch = useDispatch();
  const { accounts } = useSelector((state) => state.account);

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
    date: new Date(),
    note: "",
  };

  const [newTransfer, setNewTransfer] = useState(newTransferState);

  useEffect(() => {
    dispatch(allAccounts());
  }, [dispatch]);

  const accountTransferChange = (e) => {
    const { name, value } = e.target;

    if (name === "fromNameId") {
      const selectedAccount = accounts.find(
        (acc) => acc.id.toString() === value
      );
      setNewTransfer((prevData) => ({
        ...prevData,
        [name]: value,
        fromName: selectedAccount ? selectedAccount.account_name : "",
        fromCode: selectedAccount ? selectedAccount.account_currency_code : "",
      }));
    } else if (name === "toNameId") {
      const selectedAccount = accounts.find(
        (acc) => acc.id.toString() === value
      );
      setNewTransfer((prevData) => ({
        ...prevData,
        [name]: value,
        toName: selectedAccount ? selectedAccount.account_name : "",
        toCode: selectedAccount ? selectedAccount.account_currency_code : "",
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
    dispatch(addNewTransaction({
      transaction_type: newTransfer.type,
      transaction_from_name: newTransfer.fromName, 
      transaction_from_amount: newTransfer.fromAmount,
      transaction_from_code: newTransfer.fromCode, 
      transaction_to_name: newTransfer.toName, 
      transaction_to_amount: newTransfer.toAmount, 
      transaction_to_code: newTransfer.toCode, 
      transaction_tag: "",
      transaction_note: newTransfer.note,
      transaction_date: newTransfer.date
    }));
    console.log("saveTransfer ", newTransfer);
    setNewTransfer(newTransferState);
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
          <span className="p-[10px] pl-[28.5px] text-gray-700 text-sm bg-gray-300 rounded-r">
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
          <span className="p-[10px] pl-[28.5px] text-gray-700 text-sm bg-gray-300 rounded-r">
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
