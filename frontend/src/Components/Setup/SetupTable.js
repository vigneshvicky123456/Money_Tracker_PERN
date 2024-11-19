import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allAccounts, getSingleAccount } from "../../features/accountsSlice";
import EditAccount from "../Accounts/EditAccount";
import { Link } from "react-router-dom";

const SetupTable = () => {
  const dispatch = useDispatch();
  const { accounts } = useSelector((state) => state.account);

  const [editModal, setEditModal] = useState(false);
  const [visibleTables, setVisibleTables] = useState({});

  useEffect(() => {
    dispatch(allAccounts());
  }, [dispatch]);

  const showEditModal = (id) => {
    dispatch(getSingleAccount(id));
    setEditModal(true);
  };

  const groupedAccounts = accounts.reduce((acc, account) => {
    if (!acc[account.account_type]) {
      acc[account.account_type] = [];
    }
    acc[account.account_type].push(account);
    return acc;
  }, {});

  const toggleTable = (type) => {
    setVisibleTables((prev) => ({
      ...prev,
      [type]: !prev[type],
    }));
  };

  return (
    <div className="  bg-white w-[100%] h-[full] ">
      <div className="px-[px] mt-[20px]">
        {Object.keys(groupedAccounts).map((type) => (
          <div key={type} className="border-b">
            <div
              className="flex justify-between items-center cursor-pointer bg-gray-100 py-[7px] px-[15px]"
              onClick={() => toggleTable(type)}
            >
              <h2 className="text-lg font-semibold">{type}</h2>
            </div>
            {visibleTables[type] && (
              <div>
                {groupedAccounts[type].map((accdata) => (
                  <div key={accdata.id}>
                    <div className="py-[9px] px-[15px] flex justify-between items-center border-b">
                      <span>{accdata.account_name}</span>
                      <div>
                        <span>{accdata.account_balance} USD</span>
                        <button
                          className="border border-gray-300 m-1 rounded px-2 py-1"
                          type="button"
                          onClick={() => showEditModal(accdata.id)}
                        >
                          Edit
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
        <div className="border bg-blue-800 rounded w-[80px] my-5 flex px-5 py-2">
          <Link to="/">
            <button className="flex ml-auto text-white text-sm">Finish</button>
          </Link>
        </div>

        {editModal && (
          <EditAccount
            editModalOpen={editModal}
            onClose={() => setEditModal(false)}
          />
        )}
      </div>
    </div>
  );
};

export default SetupTable;
