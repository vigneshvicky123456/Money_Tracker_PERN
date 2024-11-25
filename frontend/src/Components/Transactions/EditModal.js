import { useState } from "react";
import EditExpense from "./Edit Transaction/EditExpense";
import EditTransfer from "./Edit Transaction/EditTransfer";
import EditIncome from "./Edit Transaction/EditIncome";

const EditModal = ({ editTransModalOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = ["Expense", "Transfer", "Income"];
  if (!editTransModalOpen) return null;

  const closeEditTransModal = () => {
    onClose(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-950 bg-opacity-50">
      <div className="bg-white w-full max-w-[45%] h-[full] rounded-[5px] shadow-lg">
        <div className="flex justify-between items-center px-5 py-[13px] border-b ">
          <h2 className="text-lg">Edit Transaction</h2>
          <button
            onClick={closeEditTransModal}
            className="text-gray-500 hover:text-gray-700 text-3xl font-bold"
          >
            ×
          </button>
        </div>
        <div>
          {tabs.map((tab, index) => (
            <button
              key={index}
              className={`w-1/3 p-[10px] text-center text-sm border-r ${
                activeTab === index
                  ? `bg-gray-100 shadow-[inset_-3px_0_3px_rgba(0,0,0,0.05),_inset_3px_0_3px_rgba(0,0,0,0.05),_inset_0_3px_3px_rgba(0,0,0,0.05)] ${
                      tab === "Expense"
                        ? "text-red-500"
                        : tab === "Income"
                        ? "text-green-500"
                        : "text-black"
                    }`
                  : "text-black"
              }`}
              onClick={() => setActiveTab(index)}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="p-4 border rounded-b">
          {activeTab === 0 && (
            <form className="space-y-4">
              <EditExpense />
            </form>
          )}

          {activeTab === 1 && (
            <form className="space-y-4">
              <EditTransfer />
            </form>
          )}

          {activeTab === 2 && (
            <form className="space-y-4">
              <EditIncome />
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditModal;
