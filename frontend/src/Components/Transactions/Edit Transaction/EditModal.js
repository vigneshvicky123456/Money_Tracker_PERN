import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFile } from "@fortawesome/free-solid-svg-icons";
import EditExpense from "./EditExpense";
import EditTransfer from "./EditTransfer";
import EditIncome from "./EditIncome";

const EditModal = ({ editTransModalOpen, onClose }) => {
  const selectedNewTransaction = useSelector((state) => state.newTransaction.selectedNewTransaction);

  const [activeTab, setActiveTab] = useState('Expense');
  const tabs = ["Expense", "Transfer", "Income"];

  useEffect(() => { 
       
     if (selectedNewTransaction) {
    const { transaction_type } = selectedNewTransaction;
      if (transaction_type) {
        setActiveTab(transaction_type);
      }
     }
  }, [selectedNewTransaction]);

  if (!editTransModalOpen) return null;

  const closeEditTransModal = () => {
    onClose(false);
  };
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-950 bg-opacity-50">
      <div className="bg-white w-full max-w-[45%] h-[full] rounded-[5px] shadow-lg">
        <div className="flex justify-between items-center px-5 py-[13px] border-b ">
          <h2 className="text-lg"><FontAwesomeIcon icon={faFile} className="text-3xl text-gray-600 pr-2" /> Edit Transaction</h2>
          <button
            onClick={closeEditTransModal}
            className="text-gray-500 hover:text-gray-700 text-3xl font-bold"
          >
            ×
          </button>
        </div>
        <div>
          {tabs.map((tab) => (
            <button
              key={tab}
              className={`w-1/3 p-[10px] text-center text-sm border-r ${
                activeTab === tab
                  ? `bg-gray-100 shadow-[inset_-3px_0_3px_rgba(0,0,0,0.05),_inset_3px_0_3px_rgba(0,0,0,0.05),_inset_0_3px_3px_rgba(0,0,0,0.05)] ${
                      tab === "Expense"
                        ? "text-red-500"
                        : tab === "Income"
                        ? "text-green-500"
                        : "text-black"
                    }`
                  : "text-black"
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="p-4 border rounded-b">
          {activeTab === "Expense" && (
            <form className="space-y-4">
              <EditExpense 
                 editOnClose={closeEditTransModal}
              />
            </form>
          )}

          {activeTab === "Transfer" && (
            <form className="space-y-4">
              <EditTransfer
                 editOnClose={closeEditTransModal}
              />
            </form>
          )}

          {activeTab === "Income" && (
            <form className="space-y-4">
              <EditIncome 
                 editOnClose={closeEditTransModal}
              />
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditModal;
