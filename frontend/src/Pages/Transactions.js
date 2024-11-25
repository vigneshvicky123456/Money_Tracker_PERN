import { React, useState } from "react";
import { useSelector } from "react-redux";
import NewModal from "../Components/Transactions/NewModal";
import RecentTransactions from "../Components/Dashboard/RecentTransactions";

const Transactions = () => {
  const { newTransactions } = useSelector((state) => state.newTransaction);
  const [newTransModal, setNewTransModal] = useState(false);
  
  const calculateTotals = () => {
    let totalIncome = 0;
    let totalExpense = 0;

    newTransactions.forEach((history) => {
      const amount = parseFloat(
        history.transaction_from_amount !== "0"
          ? history.transaction_from_amount
          : history.transaction_to_amount
      );

      if (history.transaction_type === "Income") {
        totalIncome += amount;
      } else if (history.transaction_type === "Expense") {
        totalExpense += amount;
      }
    });

    return {
      totalIncome: totalIncome.toFixed(2),
      totalExpense: totalExpense.toFixed(2),
      balance: (totalIncome - totalExpense).toFixed(2),
    };
  };

  const { totalIncome, totalExpense, balance } = calculateTotals();

  return (
    <div>
      <div className="fixed h-[62px] bg-indigo-700 border-b border-gray-300 w-full">
        <h1 className="ml-[19px] pt-3 text-white text-2xl">Transactions</h1>
      </div>
      <div className="bg-gray-100 pt-[80px] h-screen overflow-y-scroll">
        <div className="mx-[99px] border shadow-custom bg-white w-[84%] h-[full] rounded">
          <div className="border-b p-[15px] bg-gray-50">
            <div>
              <button
                className="border border-gray-300 bg-white rounded flex w-[115px]"
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
          </div>
          <div className="w-[100%] bg-white">
            <RecentTransactions />
          </div>

          <div className="ml-[560px] w-[40%]">
            <div className="flex p-3 border-b justify-between ">
              <h1>Total income</h1>
              <span className="text-green-500">{totalIncome} USD</span>
            </div>
            <div className="flex p-3 border-b justify-between">
              <h1>Total expense</h1>
              <span className="text-red-500">{totalExpense} USD</span>
            </div>
            <span
              className={
                parseFloat(balance) >= 0
                  ? "text-green-500 flex p-3 justify-end"
                  : "text-red-500 flex p-3 justify-end"
              }
            >
              {parseFloat(balance) < 0 ? `-${balance}` : `${balance}`}{" "}
              USD
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Transactions;
