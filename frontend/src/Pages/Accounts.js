import { React, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import NewAccount from "../Components/Accounts/NewAccount";
import TableAccount from "../Components/Accounts/TableAccount";

const Accounts = () => {

  const [newModal, setNewModal] = useState(false);

  return (
    <div>
      <div className="fixed h-[62px] bg-indigo-700 border-b border-gray-300 w-full">
        <h1 className="ml-[19px] py-[14.5px] text-white text-2xl">Accounts</h1>
      </div>
        <div className="bg-gray-100 pt-[80px] h-screen overflow-y-scroll">
          <div className="mx-[99px] border shadow-custom bg-white w-[84%] h-[full] rounded">
            <div className="border-b p-[15px] bg-gray-50">
              <div>
                <button
                  className="border border-gray-300 rounded flex w-[100px]"
                  type="button"
                  onClick={() => setNewModal(true)}
                >
                  <p className="px-3 py-[6px] bg-gray-200 text-gray-700 text-sm hover:text-black"><FontAwesomeIcon icon={faPlus} /></p>
                  <span className="text-sm text-gray-500 hover:text-black mr-[5px] px-[20px] py-[6px] relative">
                    New
                  </span>
                </button>
                <NewAccount
                  newModalOpen={newModal}
                  onClose={setNewModal}
                />
              </div>
            </div>

              <div className="w-[100%] bg-white">
                <TableAccount />
              </div>

          </div>
        </div>
    </div>
  );
};

export default Accounts;

