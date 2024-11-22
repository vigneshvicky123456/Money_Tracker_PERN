import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allNewTransactions } from "../../features/newTransactionsSlice";

const RecentTransactions = () => {
  const dispatch = useDispatch();
  const { newTransactions } = useSelector((state) => state.newTransaction);

  useEffect(() => {
    dispatch(allNewTransactions());
  }, [dispatch]);

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    try {
      const date = new Date(dateString);
      return new Intl.DateTimeFormat("en-US", {
        day: "numeric",
        month: "short",
        //year: "numeric",
      }).format(date);
    } catch (error) {
      console.error("Error formatting date:", error);
      return "Invalid date";
    }
  };

  const formatAmount = (amount, type) => {
    const formattedAmount = parseFloat(amount || 0).toFixed(2); 
    return type === "Expense" ? `-${formattedAmount}` : formattedAmount;
  };

  if (!newTransactions || newTransactions.length === 0) {
    return (
      <div className="border p-4 rounded">
        <h1 className="text-sm text-gray-500">No transactions found.</h1>
      </div>
    );
  }

  return (
    <div className="w-full h-auto">
      <div className="border rounded">
        <ul>
          {newTransactions.map((history) => (
            <li key={history.id} className="p-3 border-b">
              <div className="flex justify-between items-center">
                <div className="flex space-x-4">
                  <span className="text-gray-500">
                    {formatDate(history.transaction_date)}
                  </span>
                  <span>{history.transaction_from_name || "Unknown"}</span>
                </div>
                <div
                  className={`flex items-center space-x-4 ${
                    history.transaction_type === "Expense"
                      ? "text-red-500"
                      : history.transaction_type === "Transfer"
                      ? "text-gray-500"
                      : history.transaction_type === "Income"
                      ? "text-green-500"
                      : "text-black"
                  }`}
                >
                  <span>{formatAmount(history.transaction_from_amount, history.transaction_type)}</span>
                  <span>{history.transaction_from_code || "N/A"}</span>
                  <button className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">
                    Edit
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default RecentTransactions;

