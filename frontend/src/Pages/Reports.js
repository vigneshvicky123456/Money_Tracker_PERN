import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allAccounts } from "../features/accountsSlice";

const Reports = () => {
  const dispatch = useDispatch();
  const { accounts } = useSelector((state) => state.account);

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

  useEffect(() => {
    dispatch(allAccounts());
  }, [dispatch]);

  const [view, setView] = useState("yearly");
  const [currentDate, setCurrentDate] = useState(new Date());

  const handleDateChange = (e) => {
    setView(e.target.value);
    setCurrentDate(new Date());
  };

  const handlePreviousDate = () => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev); 
      if (view === "monthly") {
        newDate.setMonth(newDate.getMonth() - 1);
      } else {
        newDate.setFullYear(newDate.getFullYear() - 1);
      }
      return newDate;
    });
  };

  const handleNextDate = () => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev); 
      if (view === "monthly") {
        newDate.setMonth(newDate.getMonth() + 1);
      } else {
        newDate.setFullYear(newDate.getFullYear() + 1);
      }
      return newDate;
    });
  };

  const getPlaceholder = () => {
    if (view === "monthly") {
      return currentDate.toLocaleString("default", { month: "short", year: "numeric" });
    }
    return currentDate.getFullYear();
  };

  return (
    <div>
      <div className="fixed h-[62px] bg-indigo-700 border-b border-gray-300 w-full">
        <h1 className="ml-[19px] pt-3 text-white text-2xl">Reports</h1>
      </div>
      <div className="bg-gray-100 pt-[80px] h-screen overflow-y-scroll">
        <div className="mx-[99px] border shadow-custom bg-white w-[84%] h-[full] rounded">
          <div className="border-b border-gray-300  p-[15px] bg-gray-50 flex">
            <div className="bg-white  rounded">
              <select className=" border border-gray-300 px-3 py-[10px] rounded-l text-sm text-gray-500 focus:outline-none w-[full]">
                <option value="Expense & Income">Expense & Income</option>
                <option value="Expense by Tags">Expense by Tags</option>
                <option value="Net Income">Net Income</option>
                <option value="Net Worth">Net Worth</option>
              </select>
              <button 
                className="border-y border-gray-300 px-3 pb-[9px] py-[7px]"
                onClick={handlePreviousDate}
              >
                -
              </button>
              <select 
                className=" border border-gray-300 px-3 py-[10px] text-sm text-gray-500 focus:border-gray-400 hover:border-gray-400 focus:outline-none"
                value={view} 
                onChange={handleDateChange}
              >
                <option value="yearly">Yearly</option>
                <option value="monthly">Monthly</option>
              </select>
              <button 
                className="border-r border-y border-gray-300 rounded-r px-3 pb-[9px] py-[7px]"
                onClick={handleNextDate}
              >
                +
              </button>
            </div>
          </div>
          <div className="h-[500px] border-b border-gray-300">

          {getPlaceholder()}
          </div>
          <div className="p-4 bg-gray-50 ">
            <select
              className="block border flex rounded p-[10px] mt-[5px] w-full text-sm focus:border-blue-400 hover:border-gray-400 focus:outline-none"
              id="dropdown"
              name="fromNameId"
              //onChange={accountExpenseChange}
              //value={newExpense.fromNameId}
            >
              {accounts.map((accdata) => (
                <option
                  key={accdata.id}
                  value={accdata.id}
                  className="hover:bg-red-500 text-sm flex justify-between items-center"
                >
                  {accdata.account_name}
                  {/* {accdata.account_type} */}
                </option>
              ))}
            </select>
            <select
              className="block border flex mt-[16px] rounded p-[10px] w-full text-sm focus:border-blue-400 hover:border-gray-400 focus:outline-none"
              id="dropdown"
              name="tag"
              placeholder="Choose existing tags or add new"
              //onChange={accountExpenseChange}
              //value={newExpense.tag}
            >
              <option className="text-sm text-gray-300" disabled>
                Choose existing tags
              </option>
              {tagOptions.map((option) => (
                <option
                  key={option.id}
                  value={option.value}
                  className="hover:bg-red-500 text-sm focus:bg-green-500"
                >
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
