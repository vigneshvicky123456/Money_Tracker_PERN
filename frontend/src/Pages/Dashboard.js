import { useState } from "react";
import NetWorth from "../Components/Dashboard/NetWorth";
import NewTransaction from "../Components/Dashboard/New Transaction/NewTransaction";

const Dashboard = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [transVisible, setTransVisible] = useState(false);

  const toggleDiv = () => setIsVisible(!isVisible);
  const newTransactionShow = () => setTransVisible(!transVisible);

  return (
    <div>
      <div className="fixed h-[62px] bg-indigo-700 border-b border-gray-300 w-full">
        <h1 className="ml-[19px] py-[14.5px] text-white text-2xl">Dashboard</h1>
      </div>
      <div className="bg-gray-100 pt-[80px] h-screen overflow-y-scroll">
        <div className="mx-[99px] border shadow-custom bg-white w-[84%] h-[full] rounded relative flex">
          {/* LEFT SIDE: NetWorth */}
          <div className="w-[37.5%] p-[15px]">
            <div className="flex items-center">
              <button onClick={toggleDiv} className="relative flex border p-1">
                {isVisible ? ">" : ">"}
              </button>
              <h1 className="text-xl ml-1">NET WORTH</h1>
            </div>
            <div className="mt-[10px]">
              {isVisible && (
                <div>
                  <NetWorth />
                </div>
              )}
            </div>
          </div>

          {/* RIGHT SIDE: New Transaction */}
          <div className="absolute right-[1px] p-[15px] w-[62.5%]">
            <div className="flex items-center">
              <button
                onClick={newTransactionShow}
                className="relative flex border p-1"
              >
                {transVisible ? ">" : ">"}
              </button>
              <h1 className="text-xl ml-1">NEW TRANSACTIONS</h1>
            </div>
            <div className="mt-[10px]">
              {transVisible && (
                <div>
                  <NewTransaction />
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





///////////////////////////////////////

// import { useState } from "react";
// import NetWorth from "../Components/Dashboard/NetWorth";
// import NewTransaction from "../Components/Dashboard/NewTransaction";

// const Dashboard = () => {
//   const [isVisible, setIsVisible] = useState(false);

//   const toggleDiv = () => setIsVisible(!isVisible);

//   const [transVisible, setTransVisible] = useState(false);

//   const newTransactionShow = () => setTransVisible(!transVisible);

//   return (
//     <div>
//       <div className="fixed h-[62px] bg-indigo-700 border-b border-gray-300 w-full">
//         <h1 className="ml-[19px] py-[14.5px] text-white text-2xl">Dashboard</h1>
//       </div>
//       <div className="bg-gray-100 pt-[80px] h-screen overflow-y-scroll">
//         <div className="mx-[99px] border shadow-custom bg-white w-[84%] h-[full] rounded">
//           <div className="border-b p-[15px] ">
//             <div className="flex w-[35%]">
//               <button onClick={toggleDiv} className="relative flex border p-1">
//                 {isVisible ? ">" : ">"}
//               </button>
//               <h1 className="text-xl ml-1">NET WORTH</h1>
//             </div>
//             <div className="mt-[10px] flex-wrap">
//               {isVisible && (
//                 <div className="w-[35%]">
//                   <NetWorth />
//                 </div>
//               )}
//               <div className="flex w-[50%]">
//                 <button
//                   onClick={newTransactionShow}
//                   className="relative flex border p-1"
//                 >
//                   {transVisible ? ">" : ">"}
//                 </button>
//                 <h1 className="text-xl ml-1">NEW TRANSACTIONS</h1>
//               </div>
//               <div className="mt-[10px] flex-wrap">
//                 {transVisible && (
//                   <div className="w-[50%]">
//                     <NewTransaction />
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;
