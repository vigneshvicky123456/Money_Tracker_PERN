import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allAccounts } from "../../features/accountsSlice";
import {  FilteredTransactionsByDate } from '../../features/filterByDateSlice';

const FilterModal = ({ filterTransModalOpen, onClose, filterType }) => {
  const dispatch = useDispatch();
  const { accounts } = useSelector((state) => state.account);

  const filterState = {
    accName: "",
    accNameId: "",
    tagName: "",
    accountId: 0,
    filter: "",
  };

  const [filterTrans, setFilterTrans] = useState(filterState);

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
    { id: 11, label: "Salary", value: "Salary" },
    { id: 12, label: "Bonus", value: "Bonus" },
    { id: 13, label: "EU Consulting", value: "EU Consulting" },
  ];

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    if (name === "accNameId") {
      const selectedAccount = accounts.find(
        (acc) => acc.id.toString() === value
      );
      setFilterTrans((prevData) => ({
        ...prevData,
        [name]: value,
        accountId: selectedAccount ? selectedAccount.id : 0,
        accName: selectedAccount ? selectedAccount.account_name : "",
      }));
    } else {
      setFilterTrans((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const resetFilters = () => {
    setFilterTrans(filterState);
  };

  const applyFilter = () => {
    console.log("applyFilter ", filterTrans);
    dispatch(FilteredTransactionsByDate(
      {
        transaction_tag:filterTrans.tagName,
        filter:filterTrans.filter,
        accountId:filterTrans.accountId,
      }
    ));
    setFilterTrans(filterState);
    onClose();
  };

  useEffect(() => {
    dispatch(allAccounts());
   setFilterTrans({filter: filterType});
  }, [dispatch,filterType]);

  if (!filterTransModalOpen) return null;

  const closeFilterTransModal = () => {
    onClose(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-950 bg-opacity-50">
      <div className="bg-white w-full max-w-[45%] rounded shadow-lg">
        <div className="flex justify-between items-center px-5 py-[13px] border-b">
          <h2 className="text-lg font-bold">Filter Transactions</h2>
          <button
            onClick={closeFilterTransModal}
            className="text-gray-500 hover:text-gray-700 text-3xl font-bold"
          >
            ×
          </button>
        </div>
        <div className="p-4 border-b">
          <label className="text-sm font-medium" htmlFor="accountSelect">
            Account
          </label>
          <select
            className="block border rounded p-[10px] mt-[5px] mb-[16px] w-full text-sm focus:border-blue-400 hover:border-gray-400 focus:outline-none"
            id="accountSelect"
            name="accNameId"
            //multiple
            value={filterTrans.accNameId}
            onChange={handleFilterChange}
          >
            {accounts.map((accdata) => (
              <option key={accdata.id} value={accdata.id} className="text-sm">
                {accdata.account_name}
              </option>
            ))}
          </select>
          <label className="text-sm font-medium" htmlFor="tagSelect">
            Tags
          </label>
          <select
            className="block border rounded p-[10px] mt-[5px] mb-[16px] w-full text-sm focus:border-blue-400 hover:border-gray-400 focus:outline-none"
            id="tagSelect"
            name="tagName"
            value={filterTrans.tagName}
            onChange={handleFilterChange}
          >
            {/* <option value="">Select a Tag</option> */}
            {tagOptions.map((option) => (
              <option key={option.id} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <div className="p-4 bg-gray-50 flex justify-end">
          <button
            className="px-4 py-1 bg-gray-300 rounded border text-gray-600 mr-3"
            onClick={resetFilters}
          >
            Reset
          </button>
          <button
            className="px-4 py-1 bg-green-500 rounded border text-white"
            onClick={applyFilter}
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterModal;
