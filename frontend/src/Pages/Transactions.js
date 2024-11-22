import { React, useState } from "react";
import NewModal from "../Components/Transactions/NewModal";

const Transactions = () => {

  const [newTransModal, setNewTransModal] = useState(false);

  return (
    <div>
      <div className="fixed h-[62px] bg-indigo-700 border-b border-gray-300 w-full">
        <h1 className="ml-[19px] pt-3 text-white text-2xl">Transactions</h1>
      </div>
      <div className="bg-gray-100 pt-[80px] h-screen overflow-y-scroll">
        <div className="mx-[99px] border shadow-custom bg-white w-[84%] h-[full] rounded">
          <div className="border-b p-[15px] bg-gray-50">
            <div>
              <button
                className="border border-gray-300 bg-white rounded flex w-[115px]"
                type="button"
                onClick={() => setNewTransModal(true)}
              >
                <p className="px-3 py-[6px] bg-gray-200">+</p>
                <span className="text-sm text-gray-500 mr-[5px] px-[20px] py-[6px] relative">
                  New
                </span>
              </button>
              <NewModal 
              newTransModalOpen={newTransModal}
              onClose={setNewTransModal}/>
            </div>
          </div>
        </div>
      
      </div>
    </div>
  );
};

export default Transactions;
