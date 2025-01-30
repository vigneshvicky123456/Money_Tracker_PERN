import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretRight, faCaretDown  } from "@fortawesome/free-solid-svg-icons"; 
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
      <div className="fixed top-0 left-[125px] z-10 h-[62px] bg-indigo-700 border-b border-gray-300 w-full">
        <h1 className="ml-[19px] py-[14.5px] text-white text-2xl">Dashboard</h1>
      </div>
      <div className="bg-gray-100 pt-[79px] min-h-screen overflow-y-auto">
        <div className="mx-[90px] border shadow-custom bg-white w-[84%] min-h-[100px] rounded relative flex flex-col md:flex-row">

          <div className="w-full md:w-[37.5%] px-[15px] py-[10px]">
            <div className="flex items-center">
              <button 
                onClick={netWorthShow} 
                className="relative flex pr-1"
              >
                {netWorthVisible ? <FontAwesomeIcon icon={faCaretDown} /> : <FontAwesomeIcon icon={faCaretRight} />}
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

          <div className="w-full md:w-[62.5%] px-[15px] py-[10px] flex flex-col">
            <div className="flex items-center">
              <button
                onClick={newTransactionShow}
                className="relative flex pr-1"
              >
                {transVisible ? <FontAwesomeIcon icon={faCaretDown} /> : <FontAwesomeIcon icon={faCaretRight} />}
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
                className="relative flex pr-1"
              >
                {recentTransVisible ? <FontAwesomeIcon icon={faCaretDown} /> : <FontAwesomeIcon icon={faCaretRight} />}
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
