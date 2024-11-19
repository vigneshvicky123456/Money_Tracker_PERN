import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteAccount } from "../../features/accountsSlice";

const DeleteAccount = ({ deleteModalOpen, onClose }) => {
  const dispatch = useDispatch();
  const selectedAccount = useSelector((state) => state.account.selectedAccount);
  if (!deleteModalOpen) return null;

  const deleteAccountById = (id) => {
  dispatch(deleteAccount(id)); 
  onClose(false);
  };

  const closeDeleteModal = () => {
    onClose(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-950 bg-opacity-50">
      <div className="bg-white w-full max-w-[56%] h-[380px] rounded-[5px] shadow-lg">
        <div className="flex justify-between items-center px-5 py-[13px] border-b ">
          <h2 className="text-lg">Edit Account</h2>
          <button
            onClick={closeDeleteModal}
            className="text-gray-500 hover:text-gray-700 text-3xl font-bold"
          >
            ×
          </button>
        </div>
        <div className="px-5">
          <h1 className="text-xl pt-5">You are about to delete account "{selectedAccount.account_name}"</h1>
          <p className="text-sm py-3">
            What should we do with transactions linked to this account?
          </p>
        </div>
        <div className="space-y-4 px-5">
          <div className="flex items-center">
            <input
              type="radio"
              id="radio1"
              name="options"
              defaultChecked
              className="h-4 w-4 text-blue-600 border-gray-300 rounded-full focus:ring-blue-500"
            />
            <label for="radio1" class="ml-2 text-sm">
              Archive account, keep transactions as is
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="radio"
              id="radio2"
              name="options"
              className="h-4 w-4 text-black-600 border-gray-300 rounded-full focus:ring-black-500"
            />
            <label for="radio2" className="ml-2 text-sm">
              Delete transactions with account
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="radio"
              id="radio3"
              name="options"
              className="h-4 w-4 text-blue-600 border-gray-300 rounded-full focus:ring-blue-500"
            />
            <label for="radio3" className="ml-2 text-sm">
              Move transactions to another account
            </label>
          </div>
        </div>
        <div className="border-b py-5 pl-5">
            <button
                  className="border border-gray-300 bg-red-600 rounded flex w-[100px]"
                  type="button"
                  onClick={() => deleteAccountById(selectedAccount.id)}
                >
                  <span className="text-sm text-white mr-[5px] px-[20px] py-[6px] relative">
                    Proceed
                  </span>
                  <p className="px-3 py-[6px] text-white bg-red-600 ">=</p>
                </button>
          </div>
          <div className="flex pr-5 pt-2.5">
            <button
                  className="border border-gray-300 ml-auto bg-gray-400 rounded flex w-[125px]"
                  type="button"
                  onClick={closeDeleteModal}
                >
                  <p className="px-3 font-bold text-xl text-center bg-gray-400 ">x</p>
                  <span className="text-sm mr-[5px] px-[20px] pr-2 py-[6px] relative">
                    Cancel
                  </span>
                </button>
          </div>
      </div>
    </div>
  );
};

export default DeleteAccount;
