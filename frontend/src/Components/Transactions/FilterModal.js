import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allAccounts } from "../../features/accountsSlice";
import { FilteredTransactionsByDate } from "../../features/filterByDateSlice";
import Select from "react-select";

const FilterModal = ({ filterTransModalOpen, onClose, filterType }) => {
  const dispatch = useDispatch();
  const { accounts } = useSelector((state) => state.account);

  const filterState = {
    accNameId: [],
    tagName: [],
    accountId: [],
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

  const handleFilterChange = (e, actionMeta) => {
    if (actionMeta.name === "tagName") {
      setFilterTrans((prevData) => ({
        ...prevData,
        tagName: e || [],
      }));
    } else if (actionMeta.name === "accNameId") {
      setFilterTrans((prevData) => ({
        ...prevData,
        accNameId: e || [],
        accountId: e.map((option) => option.value) || [],
      }));
    } else if (e.target) {
      const { name, value } = e.target;
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
    const accountIds = Array.isArray(filterTrans.accNameId) 
    ? filterTrans.accNameId.map((acc) => acc.value) 
    : [];
    dispatch(
      FilteredTransactionsByDate({
        transaction_tag: filterTrans.tagName?.map((tag) => tag.value) || [],
        filter: filterTrans.filter,
        accountId: accountIds,
      })
    );
    setFilterTrans(filterState);
    onClose();
  };

  useEffect(() => {
    dispatch(allAccounts());
    setFilterTrans({ filter: filterType });
  }, [dispatch, filterType]);

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
          <Select
            className="block rounded p-[10px] mt-[5px] mb-[16px] w-full text-sm focus:border-blue-300 hover:border-gray-500 focus:outline-none"
            name="accNameId"
            options={accounts.map((acc) => ({
              value: acc.id,
              label: acc.account_name,
            }))}
            onChange={(selectedOptions) =>
              handleFilterChange(selectedOptions, { name: "accNameId" })
            }
            value={filterTrans.accNameId}
            isMulti
          />

          <label className="text-sm font-medium" htmlFor="tagSelect">
            Tags
          </label>
          <Select
            className="block rounded p-[10px] mt-[5px] mb-[16px] w-full text-sm focus:border-blue-300 hover:border-gray-500 focus:outline-none"
            name="tagName"
            options={tagOptions}
            onChange={handleFilterChange}
            value={filterTrans.tagName}
            isMulti
          />
        </div>
        <div className="p-4 bg-gray-50 flex justify-end">
          <button
            className="px-4 py-1 bg-gray-300 rounded border text-gray-600 mr-3 hover:bg-gray-400"
            onClick={resetFilters}
          >
            Reset
          </button>
          <button
            className="px-4 py-1 bg-green-500 rounded border text-white hover:bg-green-700"
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
