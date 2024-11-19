import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getSelectedCurrency } from "../../features/currenciesSlice";
import { updateAccount } from "../../features/accountsSlice"
import DeleteAccount from "./DeleteAccount";

const EditAccount = ({ editModalOpen, onClose }) => {
  const dispatch = useDispatch();
  const currencyModel1 = useSelector((state) => state.currency.currencyModel1);
  const selectedAccount = useSelector((state) => state.account.selectedAccount);

  const [deleteModal, setDeleteModal] = useState(false);

  const [editAccounts, setEditAccounts] = useState({
    id: 0,
    name: "",
    group: "",
    balance: "",
    accountCurrency: "",
    accountCheck: false,
    accountCode: "",
    dashboard: false,
  });

  const handleAccountChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditAccounts((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const groupOptions = [
    { id: 1, label: "Cash", value: "Cash" },
    { id: 2, label: "Bank Account", value: "Bank Account" },
    { id: 3, label: "Deposit", value: "Deposit" },
    { id: 4, label: "Credit", value: "Credit" },
    { id: 5, label: "Asset", value: "Asset" },
  ];

  useEffect(() => {
    dispatch(getSelectedCurrency());

   if (selectedAccount) {
    setEditAccounts({
      id: selectedAccount.id,
      name: selectedAccount.account_name || "",
      group: selectedAccount.account_type || "",
      balance: selectedAccount.account_balance || "",
      accountCurrency: selectedAccount.account_currency_name || "",
      accountCheck: selectedAccount.account_currency_name_check || false,
      accountCode: selectedAccount.account_currency_code || "",
      dashboard: selectedAccount.show_on_dashboard || false,
    });
  }

  }, [dispatch, currencyModel1?.currency_id,selectedAccount]);

  if (!editModalOpen) return null;

  const closeEditModal = () => {
    onClose(false);
  };

  const saveEditAccount = (e) => {
    e.preventDefault();
    dispatch(updateAccount({
    id: editAccounts.id,  
    account_name: editAccounts.name,
    account_type: editAccounts.group, 
    account_balance: editAccounts.balance,
    account_currency_code: editAccounts.accountCode, 
    account_currency_name: editAccounts.accountCurrency, 
    account_currency_name_check: editAccounts.accountCheck, 
    show_on_dashboard: editAccounts.dashboard 
    }));
    setEditAccounts();
    onClose(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-950 bg-opacity-50">
      <div className="bg-white w-full max-w-[56%] h-[340px] rounded-[5px] shadow-lg">
        <div className="flex justify-between items-center px-5 py-[13px] border-b ">
          <h2 className="text-lg">Edit Account</h2>
          <button
            onClick={closeEditModal}
            className="text-gray-500 hover:text-gray-700 text-3xl font-bold"
          >
            ×
          </button>
        </div>
        <div className="flex p-5">
          <div className="mt-[0px] relative">
            <form>
              <label
                htmlFor="currency"
                className="text-sm font-medium text-black-400 mb-[13px]"
              >
                Name
              </label>
              <span className="text-red-500">*</span>
              <input
                type="text"
                name="name"
                onChange={handleAccountChange}
                value={editAccounts.name}
                placeholder="Acconut name"
                className="block border rounded-[5px] p-[9px] w-[375px] text-sm focus:border-blue-400 focus:outline-none"
                required
              ></input>
            </form>
          </div>
          <div className="mt-[0px] pl-[14px] relative inline-block">
            <label className="text-sm font-medium text-black-400">Group</label>
            <select
              className="block border rounded-[5px] p-[9px] w-[288px] text-sm focus:border-blue-400 hover:border-gray-400 focus:outline-none"
              id="dropdown"
              name="group"
              onChange={handleAccountChange}
              value={editAccounts.group}
            >
              {groupOptions.map((option) => (
                <option
                  key={option.id}
                  value={option.value}
                  className="hover:bg-red-500 focus:bg-green-500"
                >
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex px-3">
          <div className="block w-[385px] relative flex items-center">
            <form>
              <input
                type="checkbox"
                name="accountCheck"
                checked={editAccounts.accountCheck}
                onChange={handleAccountChange}
                className="p-10 w-7 focus:border-blue-400 hover:border-gray-300 focus:outline-none"
              ></input>
              <label className=" text-sm" name="accountCurrency" onChange={""}>
                {currencyModel1.currencyModel?.currency_name}
              </label>
            </form>
          </div>
          <div className="pl-[50px] relative ">
            <form>
              <label
                className="text-sm text-gray-600 pl-20 w-[245px]"
                name="accountCode"
                onChange={handleAccountChange}
              >
                {editAccounts.balance} {currencyModel1.currencyModel?.currency_code}
              </label>
            </form>
          </div>
        </div>
        <div className="flex border-b p-3 pb-[33px]">
          <div className="block w-[385px] relative flex items-center">
            <form>
              <input
                type="checkbox"
                name="dashboard"
                onChange={handleAccountChange}
                checked={editAccounts.dashboard}
                className="p-10 w-7 focus:border-blue-400 hover:border-gray-400 focus:outline-none"
              ></input>
              <label className=" text-sm">Show on Dashboard</label>
            </form>
          </div>
          <div className="mt-[2px] pl-[14px] relative">
            <button
              onClick={saveEditAccount}
              className="bg-blue-800 text-white text-sm rounded-[5px] p-[9px] w-[288px]"
            >
              Save Account
            </button>
          </div>
        </div>
        <div className="w-[100px] pt-3 flex pl-[620px]">
            <button 
              className="border text-sm rounded px-4 py-2 bg-red-500 text-white"
              type="button"
              onClick={() => setDeleteModal(true)} 
            >
              Delete
            </button>
            <DeleteAccount 
              deleteModalOpen={deleteModal}
              onClose={setDeleteModal}
            />
        </div>
      </div>
    </div>
  );
};

export default EditAccount;
