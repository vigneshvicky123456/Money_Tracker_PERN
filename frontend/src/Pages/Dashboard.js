import { useState } from "react";
import NetWorth from "../Components/Dashboard/NetWorth";
import NewTransaction from "../Components/Dashboard/New Transaction/NewTransaction";
import RecentTransactions from "../Components/Dashboard/RecentTransactions";

const Dashboard = () => {
  const [netWorthVisible, setNetWorthVisible] = useState(false);
  const [transVisible, setTransVisible] = useState(false);
  const [recentTransVisible, setRecentTransVisible] = useState(false);

  const netWorthShow = () => setNetWorthVisible(!netWorthVisible);
  const newTransactionShow = () => setTransVisible(!transVisible);
  const recentTransactionShow = () => setRecentTransVisible(!recentTransVisible);

  return (
    <div>
      <div className="fixed h-[62px] bg-indigo-700 border-b border-gray-300 w-full">
        <h1 className="ml-[19px] py-[14.5px] text-white text-2xl">Dashboard</h1>
      </div>
      <div className="bg-gray-100 pt-[79px] h-screen overflow-y-scroll">
        <div className="mx-[90px] border shadow-custom bg-white w-[84%] h-[full] rounded relative flex">

          <div className="w-[37.5%] px-[15px] py-[10px]">
            <div className="flex items-center">
              <button onClick={netWorthShow} className="relative flex border p-1">
                {netWorthVisible ? ">" : ">"}
              </button>
              <h1 className="text-xl ml-1">NET WORTH</h1>
            </div>
            <div className="mt-[15px]">
              {netWorthVisible && (
                <div>
                  <NetWorth />
                </div>
              )}
            </div>
          </div>

          <div className="absolute right-[1px] px-[15px] py-[10px] w-[62.5%] flex flex-col">
            <div className="flex items-center">
              <button
                onClick={newTransactionShow}
                className="relative flex border p-1"
              >
                {transVisible ? ">" : ">"}
              </button>
              <h1 className="text-xl ml-1">NEW TRANSACTIONS</h1>
            </div>
            <div className="mt-[15px]">
              {transVisible && (
                <div>
                  <NewTransaction />
                </div>
              )}
            </div>

            <div className="flex items-center mt-[17px]">
              <button
                onClick={recentTransactionShow}
                className="relative flex border p-1"
              >
                {recentTransVisible ? ">" : ">"}
              </button>
              <h1 className="text-xl ml-1">RECENT TRANSACTIONS</h1>
            </div>
            <div className="mt-[15px]">
              {recentTransVisible && (
                <div className="border rounded">
                  <RecentTransactions />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
