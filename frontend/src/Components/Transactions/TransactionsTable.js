import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faArrowLeft, faPencil  } from "@fortawesome/free-solid-svg-icons";
import { getSingleNewTransaction } from "../../features/newTransactionsSlice";
import EditModal from "../Transactions/Edit Transaction/EditModal";
import { FilteredTransactionsByDate } from "../../features/filterByDateSlice";

const TransactionsTable = () => {
    const dispatch = useDispatch();
    const filteredTransactions = useSelector((state) => state.filterByDate.filteredTransactions);
  
    const [editTransModal, setEditTransModal] = useState(false);

    const showTransModal = (id) => {
        dispatch(getSingleNewTransaction(id));
        setEditTransModal(true);
      };

      useEffect(() => {
        dispatch(FilteredTransactionsByDate());
      }, [dispatch]);
    
      const formatDate = (dateString) => {
        if (!dateString) return "N/A";
        try {
          const date = new Date(dateString);
          return new Intl.DateTimeFormat("en-US", {
            day: "numeric",
            month: "short",
          }).format(date);
        } catch (error) {
          console.error("Error formatting date:", error);
          return "Invalid date";
        }
      };
    
      const formatAmount = (amount, type) => {
        const parsedAmount = parseFloat(amount).toFixed(2);
        return type === "Expense" ? `-${parsedAmount}` : `${parsedAmount}`;
      };
    
      if (!filteredTransactions || filteredTransactions.length === 0) {
        return (
          <div className="border p-4 rounded">
            <h1 className="text-sm text-gray-500">No transactions found.</h1>
          </div>
        );
      }
  return (
    <div className="w-full h-auto">
    <div>
      <ul>
        {filteredTransactions?.transactions?.map((history) => (
          <li key={history.id} className="p-3 border-b">
            <div className="flex justify-between text-sm items-center">
              <div className="flex space-x-4">
                <span className="text-gray-500">
                  {formatDate(history.transaction_date)}
                </span>
                <span>
                  {history.transaction_from_name ||
                    history.transaction_to_name}
                </span>
                <span> {history.transaction_from_name ? (<span> <FontAwesomeIcon icon={faArrowRight} className="text-gray-500" /></span>) : (<span> <FontAwesomeIcon icon={faArrowLeft} className="text-gray-500" /></span>)}</span>
                {history.transaction_tag ? (
                  <span className="border-[1.5px] border-gray-300 text-gray-500 text-sm bg-gray-200 rounded p-1">
                    {history.transaction_tag}
                  </span>
                ) : (
                  <span>{history.transaction_to_name}</span>
                )}
                <span className="text-gray-500">
                  {history.transaction_note}
                </span>
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
                <span>
                  {formatAmount(
                    history.transaction_from_amount !== "0"
                      ? history.transaction_from_amount
                      : history.transaction_to_amount,
                    history.transaction_type
                  )}
                </span>
                <span>
                  {history.transaction_from_code ||
                    history.transaction_to_code}
                </span>
                <button
                  className="border border-gray-300 m-1 ml-3 rounded-full text-gray-600 w-10 h-10 px-2 py-1 hover:border-gray-400"
                  type="button"
                  onClick={() => showTransModal(history.id)}
                >
                  <FontAwesomeIcon icon={faPencil} />
                </button>
                {editTransModal && (
                   <EditModal
                   editTransModalOpen={editTransModal}
                   onClose={setEditTransModal}
                 />
                )}
               
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  </div>
  );
};

export default TransactionsTable;
