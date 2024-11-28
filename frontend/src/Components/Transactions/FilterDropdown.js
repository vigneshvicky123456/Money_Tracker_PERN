import { useState } from "react";

const FilterDropdown = ({ onFilterChange }) => {
  const [filter, setFilter] = useState("all");
  const [dateRange, setDateRange] = useState("");
  const [customStartDate, setCustomStartDate] = useState("");
  const [customEndDate, setCustomEndDate] = useState("");

  const calculateDateRange = (filter, startDate, endDate) => {
    const today = new Date();
    const startOfToday = new Date(today.setHours(0, 0, 0, 0));
    let start, end;

    switch (filter) {
      case "today":
        start = startOfToday;
        end = new Date(startOfToday);
        break;
      case "yesterday":
        start = new Date(startOfToday);
        start.setDate(start.getDate() - 1);
        end = new Date(start);
        break;
      case "last7days":
        start = new Date(startOfToday);
        start.setDate(start.getDate() - 7);
        end = new Date(startOfToday);
        end.setDate(end.getDate() - 1);
        break;
      case "last30days":
        start = new Date(startOfToday);
        start.setDate(start.getDate() - 30);
        end = new Date(startOfToday);
        end.setDate(end.getDate() - 1);
        break;
      case "thismonth":
        start = new Date(today.getFullYear(), today.getMonth(), 1);
        end = new Date(today);
        break;
      case "custom":
        start = new Date(startDate);
        end = new Date(endDate);
        break;
      default:
        start = null;
        end = null;
    }

    if (start && end) {
      const formattedStart = start.toLocaleDateString("en-US", {
        day: "numeric",
        month: "short",
      });
      const formattedEnd = end.toLocaleDateString("en-US", {
        day: "numeric",
        month: "short",
      });
      return `${formattedStart} - ${formattedEnd}`;
    }
    return "";
  };

  const handleFilterChange = (filter) => {
    setFilter(filter);

    if (filter !== "custom") {
      const range = calculateDateRange(filter);
      setDateRange(range);
      onFilterChange(filter, range, null, null);
    }
  };

  const handleCustomRangeSubmit = () => {
    if (customStartDate && customEndDate) {
      const range = calculateDateRange("custom", customStartDate, customEndDate);
      setDateRange(range);
      onFilterChange("custom", range, customStartDate, customEndDate);
    }
  };

  return (
    <div className="mb-4">
      <select
        className="p-2 border rounded"
        value={filter}
        onChange={(e) => handleFilterChange(e.target.value)}
      >
        <option value="all">All Transactions</option>
        <option value="today">Today</option>
        <option value="yesterday">Yesterday</option>
        <option value="last7days">Last 7 Days</option>
        <option value="last30days">Last 30 Days</option>
        <option value="thismonth">This Month</option>
        <option value="custom">Custom Date Range</option>
      </select>

      {filter === "custom" && (
        <div className="mt-4 space-y-2">
          <div>
            <label className="block text-sm">Start Date:</label>
            <input
              type="date"
              className="p-2 border rounded w-full"
              value={customStartDate}
              onChange={(e) => setCustomStartDate(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm">End Date:</label>
            <input
              type="date"
              className="p-2 border rounded w-full"
              value={customEndDate}
              onChange={(e) => setCustomEndDate(e.target.value)}
            />
          </div>
          <button
            className="mt-2 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={handleCustomRangeSubmit}
          >
            Apply
          </button>
        </div>
      )}

      {dateRange && (
        <p className="text-sm text-gray-500 mt-2">Date Range: {dateRange}</p>
      )}
    </div>
  );
};

export default FilterDropdown;
