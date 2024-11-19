import { useState } from "react";
import Income from "./Income";
import Expense from "./Expense";
import Transfer from "./Transfer";

const NewTransaction = () => {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = ["Expense", "Transfer", "Income"];

  return (
    <div className="w-full">
      {/* Tabs */}
      <div className="flex border rounded-t">
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

      {/* Tab Content */}
      <div className="p-4 border rounded-b">
        {activeTab === 0 && (
          <form className="space-y-4">
            <Expense />
           
          </form>
        )}

        {activeTab === 1 && (
          <form className="space-y-4">
            <Transfer />
            
          </form>
        )}
        

        {activeTab === 2 && (
          <form className="space-y-4">
            <Income />
           
          </form>
        )}
      </div>
    </div>
  );
};

export default NewTransaction;
 