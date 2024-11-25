import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allAccounts } from "../../features/accountsSlice";

const NetWorth = () => {
  const dispatch = useDispatch();
  const { accounts } = useSelector((state) => state.account);
  const currencyModel1 = useSelector((state) => state.currency.currencyModel1);
  const [visibleTables, setVisibleTables] = useState({});

  useEffect(() => {
    dispatch(allAccounts());
  }, [dispatch, currencyModel1?.currencyModel?.id]);

  const groupedAccounts = accounts.reduce((acc, account) => {
    if (account.show_on_dashboard) {
      if (!acc[account.account_type]) {
        acc[account.account_type] = [];
      }
      acc[account.account_type].push(account);
    }
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
    <div className="border rounded">
      {Object.keys(groupedAccounts).map((type) => (
        <div key={type} className="border-b">
          <div
            className="flex justify-between items-center cursor-pointer bg-gray-100 py-[7px] px-[15px]"
            onClick={() => toggleTable(type)}
          >
            <h2 className="text-lg font-semibold">{type}</h2>
            <span className="text-green-600">
              {totalBalances[type]}{" "}
              {currencyModel1.currencyModel?.currency_code}
            </span>
          </div>
          {visibleTables[type] && (
            <div>
              {groupedAccounts[type].map((accdata) => (
                <div key={accdata.id}>
                  <div className="py-[9px] px-[15px] flex justify-between items-center border-b">
                    <span className="text-blue-500">
                      {accdata.account_name}
                    </span>
                    <div>
                      <span>
                        {accdata.account_balance}{" "}
                        {accdata.account_currency_code}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default NetWorth;
