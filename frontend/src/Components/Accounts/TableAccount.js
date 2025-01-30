import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil  } from "@fortawesome/free-solid-svg-icons";
import { allAccounts, getSingleAccount } from "../../features/accountsSlice";
import EditAccount from "./EditAccount";

const TableAccount = () => {
  const dispatch = useDispatch();
  const { accounts } = useSelector((state) => state.account);
  const currencyModel1 = useSelector((state) => state.currency.currencyModel1);
  const [editModal, setEditModal] = useState(false);
  const [visibleTables, setVisibleTables] = useState({});

  useEffect(() => {
    dispatch(allAccounts());
  }, [dispatch, currencyModel1?.currencyModel?.id]);

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
            <span
              className={
                parseInt(totalBalances[type]) >= 0
                  ? "text-green-500 flex  justify-end"
                  : "text-red-500 flex  justify-end"
              }
            >
              {parseInt(totalBalances[type])} {currencyModel1.currencyModel?.currency_code}
            </span>
          </div>
          {visibleTables[type] && (
            <div>
              {groupedAccounts[type].map((accdata) => (
                <div key={accdata.id}>
                  <div className="py-[9px] px-[15px] flex justify-between items-center border-b">
                    <span className="text-blue-500">{accdata.account_name}</span>
                    <div>
                      <span
                        className={
                          parseFloat(accdata.account_balance) >= 0
                            ? "text-green-500"
                            : "text-red-500"
                        }
                      >
                        {parseFloat(accdata.account_balance)} {accdata.account_currency_code ? accdata.account_currency_code :'NAN' }
                      </span>
                      <button
                        className="border border-gray-300 m-1 ml-3 rounded-full text-gray-600 w-10 h-10 px-2 py-1 hover:border-gray-400"
                        type="button"
                        onClick={() => showEditModal(accdata.id)}
                      >
                        <FontAwesomeIcon icon={faPencil} />
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
