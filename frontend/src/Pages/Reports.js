import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allAccounts } from "../features/accountsSlice";
import { fetchReports, fetchTagExpenseReports } from "../features/reportsSlice";
import Expense_IncomeChart from "../Components/Reports/Expense_IncomeChart";
import ExpensebyTagsChart from "../Components/Reports/ExpensebyTagsChart";

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

  const [view, setView] = useState("yearly");
  const [currentDate, setCurrentDate] = useState(new Date());
  const [reportsType, setReportsType] = useState("Expense_Income");
  const [year, setYear] = useState(currentDate.getFullYear());
  const [monthYear, setMonthYear] = useState("");
  const [transaction_tag, setTransaction_tag] = useState("");

  useEffect(() => {
    dispatch(allAccounts());
  }, [dispatch]);

  const handleReportsTypeChange = (e) => {
    setReportsType(e.target.value);
  };

  const handleTransTagChange = (e) => {
    setTransaction_tag(e.target.value);
  }

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

  const chartView = () => {
    if (view === "monthly") {
      setMonthYear(
        currentDate.toLocaleString("default", {
          month: "short",
          year: "numeric",
        })
      );
    } else {
      setYear(currentDate.getFullYear());
    }
  };
  
  useEffect(() => { 
    chartView();
    if (reportsType === "Expense_Income") {
      if (view === "yearly") {
        dispatch(fetchReports({ reportsType, year }));
        console.log("Reports useEffect ReportsType & year: ", reportsType, year);
      } else {
        dispatch(fetchReports({ reportsType, monthYear }));
        console.log("Reports useEffect ReportsType & monthYear: ", reportsType, monthYear);
      }
    } else if (reportsType === "ExpensebyTags") {
      if (view === "yearly") {
        dispatch(fetchTagExpenseReports({ reportsType, year, transaction_tag }));
        console.log("Reports useEffect ReportsType & year: ", reportsType, year, transaction_tag);
      } else {
        dispatch(fetchTagExpenseReports({ reportsType, monthYear, transaction_tag }));
        console.log("Reports useEffect ReportsType & monthYear: ",reportsType, monthYear, transaction_tag);
      }
    }
  }, [view, reportsType, currentDate, monthYear, year, transaction_tag]);
  

  return (
    <div>
      <div className="fixed h-[62px] bg-indigo-700 border-b border-gray-300 w-full">
        <h1 className="ml-[19px] pt-3 text-white text-2xl">Reports</h1>
      </div>
      <div className="bg-gray-100 pt-[80px] h-screen overflow-y-scroll">
        <div className="mx-[99px] border shadow-custom bg-white w-[84%] h-[full] rounded">
          <div className="border-b border-gray-300  p-[15px] bg-gray-50 flex">
            <div className="bg-white  rounded">
              <select
                className=" border border-gray-300 px-3 py-[10px] rounded-l text-sm text-gray-500 focus:outline-none w-[full]"
                value={reportsType}
                onChange={handleReportsTypeChange}
              >
                <option value="Expense_Income">Expense & Income</option>
                <option value="ExpensebyTags">Expense by Tags</option>
                <option value="NetIncome">Net Income</option>
                <option value="NetWorth">Net Worth</option>
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
            {view === "monthly" ? <p>{monthYear}</p> : <p>{year}</p>}
          </div>
          <div className="h-[600px] border-b border-gray-300">
           
            {reportsType === "Expense_Income" ? (
              <Expense_IncomeChart />
            ) : reportsType === "ExpensebyTags" ? (
              <ExpensebyTagsChart />
            ) : (
              <p>No Chart</p>
            )}
          </div>
          <div className="p-4 bg-gray-50 ">
            <select
              className="block border flex rounded p-[10px] mt-[5px] w-full text-sm focus:border-blue-400 hover:border-gray-400 focus:outline-none"
              id="dropdown"
              name="fromNameId"
            >
              {accounts.map((accdata) => (
                <option
                  key={accdata.id}
                  value={accdata.id}
                  className="hover:bg-red-500 text-sm flex justify-between items-center"
                >
                  {accdata.account_name}
                </option>
              ))}
            </select>
            <select
              className="block border flex mt-[16px] rounded p-[10px] w-full text-sm focus:border-blue-400 hover:border-gray-400 focus:outline-none"
              id="dropdown"
              name="tag"
              placeholder="Choose existing tags or add new"
              value={transaction_tag}
              onChange={handleTransTagChange}
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
