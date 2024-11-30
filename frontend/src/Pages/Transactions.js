import { React, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import NewModal from "../Components/Transactions/NewModal";
import RecentTransactions from "../Components/Dashboard/RecentTransactions";
import { setFilter } from '../features/filterByDateSlice';

const Transactions = () => {
  const dispatch = useDispatch();
  const currencyModel1 = useSelector((state) => state.currency.currencyModel1);
  const { filter, filteredTransactions } = useSelector((state) => state.filterByDate);
  //const { newTransactions } = useSelector((state) => state.newTransaction);
  const [newTransModal, setNewTransModal] = useState(false);

  const handleFilterChange = (e) => {
    dispatch(setFilter(e.target.value));
    //console.log('handleFilterChange',e.target.value);
};


  return (
    <div>
      <div className="fixed h-[62px] bg-indigo-700 border-b border-gray-300 w-full">
        <h1 className="ml-[19px] pt-3 text-white text-2xl">Transactions</h1>
      </div>
      <div className="bg-gray-100 pt-[80px] h-screen overflow-y-scroll">
        <div className="mx-[99px] border shadow-custom bg-white w-[84%] h-[full] rounded">
          <div className="border-b p-[15px] bg-gray-50 flex">
            <div>
              <button
                className="border border-gray-300 bg-white rounded-l flex w-[115px]"
                type="button"
                onClick={() => setNewTransModal(true)}
              >
                <p className="px-3 py-[6px] bg-gray-200">+</p>
                <span className="text-sm text-gray-500 mr-[5px] px-[20px] py-[6px] relative">
                  New
                </span>
              </button>
              <NewModal
                newTransModalOpen={newTransModal}
                onClose={setNewTransModal}
              />
            </div>
            <div className="relative">
              <select
                className="p-[8px] border border-gray-300 px-5 text-gray-500 text-sm focus:outline-none"
                value={filter}
                onChange={handleFilterChange}
              >
                <option value="all">All Transactions</option>
                <option value="today">Today</option>
                <option value="yesterday">Yesterday</option>
                <option value="last7days">Last 7 Days</option>
                <option value="last30days">Last 30 Days</option>
                <option value="thismonth">This Month</option>
                {/* <option value="custom">Custom Date</option> */}
              </select>
            </div>
          </div>

          <div className="w-[100%] bg-white">
            <RecentTransactions />
          </div>

          <div className="ml-[560px] w-[40%]">
            <div className="flex p-3 border-b justify-between ">
              <h1>Total income</h1>
              <span className="text-green-500">{filteredTransactions?.totalIncome} {currencyModel1.currencyModel?.currency_code}</span>
            </div>
            <div className="flex p-3 border-b justify-between">
              <h1>Total expense</h1>
              <span className="text-red-500">{filteredTransactions?.totalExpense} {currencyModel1.currencyModel?.currency_code}</span>
            </div>
            <span
              className={
                parseFloat(filteredTransactions?.balance) >= 0
                  ? "text-green-500 flex p-3 justify-end"
                  : "text-red-500 flex p-3 justify-end"
              }
            >
              {parseFloat(filteredTransactions?.balance) } {currencyModel1.currencyModel?.currency_code}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Transactions;
