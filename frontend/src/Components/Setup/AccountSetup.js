import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getSelectedCurrency } from "../../features/currenciesSlice";
import { addAccount } from "../../features/accountsSlice";
import SetupTable from "./SetupTable";

const AccountSetup = () => {
  const dispatch = useDispatch();
  const currencyModel1 = useSelector((state) => state.currency.currencyModel1);

  const newAccountState = {
    name: "",
    group: "",
    balance: "",
    accountCurrency: "",
    accountCheck: false,
    accountCode: "",
    dashboard: false,
  };
  const [newAccounts, setNewAccounts] = useState(newAccountState);

  const groupOptions = [
    { id: 1, label: "Cash", value: "Cash" },
    { id: 2, label: "Bank Account", value: "Bank Account" },
    { id: 3, label: "Deposit", value: "Deposit" },
    { id: 4, label: "Credit", value: "Credit" },
    { id: 5, label: "Asset", value: "Asset" },
  ];

  const [isVisible, setIsVisible] = useState(false);
  const [showError, setShowError] = useState(false);

  const handleAccountChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewAccounts((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const saveAccount = (e) => {
    e.preventDefault();
    if (!newAccounts.name.trim()) {
      setShowError(true);
    } else {
      setShowError(false);
      setIsVisible(!isVisible);
    }
    dispatch(
      addAccount({
        account_name: newAccounts.name,
        account_type: newAccounts.group,
        account_balance: newAccounts.balance,
        account_currency_code: newAccounts.accountCode,
        account_currency_name: newAccounts.accountCurrency,
        account_currency_name_check: newAccounts.accountCheck,
        show_on_dashboard: newAccounts.dashboard,
      })
    );
    setNewAccounts(newAccountState);
  };

  useEffect(() => {
    dispatch(getSelectedCurrency());
  }, [dispatch, currencyModel1?.currency_id]);

  return (
    <div className=" mt-[10px]">
      <div className="px-[11px]">
        <h1 className="text-2xl mb-[13px]">Accounts</h1>
        <p>Create accounts that you would like to keep track of.</p>
        <p>
          It could be cash in your wallet, bank accounts, credit cards or even a
          loan to your friend.
        </p>
      </div>
      <div className="flex px-[11px]">
        <div className="mt-[10px] relative">
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
              value={newAccounts.name}
              placeholder="Acconut name"
              className="block border rounded-[5px] p-[9px] w-[372px] text-sm focus:border-blue-400 focus:outline-none"
              required
            ></input>
             {showError && (
            <span className="absolute top-[-30px] left-0 bg-red-500 text-white text-xs px-2 py-1 rounded shadow-md">
              Name is required
            </span>
          )}
          </form>
        </div>
        <div className="mt-[10px] pl-[14px] relative inline-block ">
          <label className="text-sm font-medium text-black-400 mb-[13px]">
            Group
          </label>
          <select
            className="block border rounded-[5px] p-[9px] w-[288px] text-sm focus:border-blue-400 hover:border-gray-400 focus:outline-none"
            id="dropdown"
            name="group"
            onChange={handleAccountChange}
            value={newAccounts.group}
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
      <div className="flex px-[11px]">
        <div className="mt-[10px] block w-[372px] relative flex items-center">
          <form>
            <input
              type="checkbox"
              name="accountCheck"
              checked={newAccounts.accountCheck}
              onChange={handleAccountChange}
              className="p-10 w-7 focus:border-blue-400 hover:border-gray-300 focus:outline-none"
            ></input>
            <label
              className=" text-sm mb-[13px]"
              name="accountCurrency"
              onChange={handleAccountChange}
            >
              {currencyModel1.currencyModel?.currency_name}
            </label>
          </form>
        </div>
        <div className="mt-[15px] pl-[14px] relative ">
          <form>
            <input
              className="border rounded-[5px] pl-30 p-[9px] w-[238px] text-sm focus:border-blue-400 focus:outline-none"
              type="number"
              name="balance"
              placeholder="Balance"
              onChange={handleAccountChange}
              value={newAccounts.balance}
            ></input>
            <label
              className="text-sm bg-gray-200 text-gray-600 p-[10px] mb-[13px]"
              name="accountCode"
              onChange={handleAccountChange}
            >
              {currencyModel1.currencyModel?.currency_code}
            </label>
          </form>
        </div>
      </div>
      <div className="flex px-[11px]">
        <div className="mt-[10px] block w-[372px] relative flex items-center">
          <form>
            <input
              type="checkbox"
              name="dashboard"
              onChange={handleAccountChange}
              checked={newAccounts.dashboard}
              className="p-10 w-7 focus:border-blue-400 hover:border-gray-400 focus:outline-none"
            ></input>
            <label className=" text-sm mb-[13px]">Show on Dashboard</label>
          </form>
        </div>
        <div className="mt-[15px] pl-[14px] relative">
          <button
            onClick={saveAccount}
            className="bg-blue-800 text-white text-sm rounded-[5px] p-[9px] w-[288px]"
          >
            Save Account
          </button>
        </div>
      </div>
      <div className="bg-white px-[11px] shadow-2xl">
        {isVisible && (
          <div className="">
            <SetupTable />
          </div>
        )}
      </div>
    </div>
  );
};

export default AccountSetup;
