import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { allAccounts } from "../features/accountsSlice";
import { fetchReports, fetchTagExpenseReports, fetchNetIncomeReports, fetchNetWorthReports } from "../features/reportsSlice";
import Expense_IncomeChart from "../Components/Reports/Expense_IncomeChart";
import ExpensebyTagsChart from "../Components/Reports/ExpensebyTagsChart";
import NetIncomeChart from "../Components/Reports/NetIncomeChart";
import NetWorthChart from "../Components/Reports/NetWorthChart";

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

  const filterState = {
    accNameId: [],
    tagName: [],
    accountId: [],
  };

  const [filterTrans, setFilterTrans] = useState(filterState);

  useEffect(() => {
    dispatch(allAccounts());
  }, [dispatch]);

  const handleReportsTypeChange = (e) => {
    setReportsType(e.target.value);
  };

  const handleTransTagChange = (e, actionMeta) => {
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
    const accountIds = Array.isArray(filterTrans.accNameId) 
    ? filterTrans.accNameId.map((acc) => acc.value) 
    : [];

    if (reportsType === "Expense_Income") {
      if (view === "yearly") {
        dispatch(fetchReports({ reportsType, year, transaction_tag: filterTrans.tagName?.map((tag) => tag.value) || [],  accountId: accountIds, }));
        console.log("Reports useEffect ReportsType & year: ", reportsType, year, filterTrans);
      } else {
        dispatch(fetchReports({ reportsType, monthYear, transaction_tag: filterTrans.tagName?.map((tag) => tag.value) || [],  accountId: accountIds, }));
        console.log("Reports useEffect ReportsType & monthYear: ", reportsType, monthYear, filterTrans);
      }
    } else if (reportsType === "ExpensebyTags") {
      if (view === "yearly") {
        dispatch(fetchTagExpenseReports({ reportsType, year, transaction_tag: filterTrans.tagName?.map((tag) => tag.value) || [],  accountId: accountIds, }));
        console.log("Reports useEffect ReportsType & year: ", reportsType, year, filterTrans);
      } else {
        dispatch(fetchTagExpenseReports({ reportsType, monthYear, transaction_tag: filterTrans.tagName?.map((tag) => tag.value) || [],  accountId: accountIds, }));
        console.log("Reports useEffect ReportsType & monthYear: ",reportsType, monthYear, filterTrans);
      }
    } else if (reportsType === "NetIncome") {
      if (view === "yearly") {
        dispatch(fetchNetIncomeReports({ reportsType, year, transaction_tag: filterTrans.tagName?.map((tag) => tag.value) || [],  accountId: accountIds, }));
        console.log("Reports useEffect ReportsType & year: ", reportsType, year, filterTrans);
      } else {
        dispatch(fetchNetIncomeReports({ reportsType, monthYear, transaction_tag: filterTrans.tagName?.map((tag) => tag.value) || [],  accountId: accountIds, }));
        console.log("Reports useEffect ReportsType & monthYear: ",reportsType, monthYear, filterTrans);
      } 
    } else if (reportsType === "NetWorth") {
      if (view === "yearly") {
        dispatch(fetchNetWorthReports({ reportsType, year, transaction_tag: filterTrans.tagName?.map((tag) => tag.value) || [],  accountId: accountIds, }));
        console.log("Reports useEffect ReportsType & year: ", reportsType, year, filterTrans);
      } else {
        dispatch(fetchNetWorthReports({ reportsType, monthYear, transaction_tag: filterTrans.tagName?.map((tag) => tag.value) || [],  accountId: accountIds, }));
        console.log("Reports useEffect ReportsType & monthYear: ",reportsType, monthYear, filterTrans);
      }
    }
  }, [view, reportsType, currentDate, monthYear, year, filterTrans ]);

  return (
    <div>
      <div className="fixed z-10 h-[62px] bg-indigo-700 border-b border-gray-300 w-full">
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
          </div>
          <div className="h-[600px] border-b border-gray-300">
           
            {reportsType === "Expense_Income" ? (
              <Expense_IncomeChart />
            ) : reportsType === "ExpensebyTags" ? (
              <ExpensebyTagsChart />
            ) : reportsType === "NetIncome" ? (
              <NetIncomeChart />
            ) : reportsType === "NetWorth" ? (
              <NetWorthChart />
            ) : (
              <p>No Chart</p>
            )}
          </div>
          <div className="p-4 bg-gray-50 ">
             <Select
               className="block rounded p-[10px] mt-[5px] mb-[16px] w-full text-sm focus:border-blue-300 hover:border-gray-500 focus:outline-none"
               name="accNameId"
               options={accounts.map((acc) => ({
               value: acc.id,
               label: acc.account_name,
               }))}
               onChange={(selectedOptions) =>
               handleTransTagChange(selectedOptions, { name: "accNameId" })}
               value={filterTrans.accNameId}
               isMulti
             />
             <Select
               className="block mt-[16px] rounded p-[10px] w-full text-sm focus:border-blue-400 hover:border-gray-400 focus:outline-none"
               name="tagName"
               options={tagOptions}
               onChange={handleTransTagChange}
               value={filterTrans.tagName}
               isMulti
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;

   