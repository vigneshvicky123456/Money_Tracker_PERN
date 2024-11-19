import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allAccounts, getSingleAccount } from "../../features/accountsSlice";
import EditAccount from "./EditAccount";

const TableAccount = () => {
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

  const totalBalances = {};
for (const [type, accounts] of Object.entries(groupedAccounts)) {
  totalBalances[type] = accounts.reduce(
    (sum, account) => sum + Number(account.account_balance || 0),
    0
  );
}


  const toggleTable = (type) => {
    setVisibleTables((prev) => ({
      ...prev,
      [type]: !prev[type],
    }));
  };

  return (
    <div>
      {Object.keys(groupedAccounts).map((type) => (
        <div key={type} className="border-b">
          <div
            className="flex justify-between items-center cursor-pointer bg-gray-100 py-[7px] px-[15px]"
            onClick={() => toggleTable(type)}
          >
            <h2 className="text-lg font-semibold">{type}</h2>
            <span className="text-green-600">
               {totalBalances[type]} USD
            </span>
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

      {editModal && (
        <EditAccount
          editModalOpen={editModal}
          onClose={() => setEditModal(false)}
        />
      )}
    </div>
  );
};

export default TableAccount;
