import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretRight, faCaretDown  } from "@fortawesome/free-solid-svg-icons"; 
import { allCurrencies, getSingleCurrency, addSelectedCurrency, getSelectedCurrency } from "../features/currenciesSlice";

const Settings = () => {
  const dispatch = useDispatch();
  const currencyModel1 = useSelector((state) => state.currency.currencyModel1);
  const { currencies } = useSelector((state) => state.currency);
  
  const [selectedDropdown, SetSelectedDropdown] = useState();
  const [isVisible, setIsVisible] = useState(false);

  const handleSelectCurrency = (e) => {
    const selectedCurrencyId = parseInt(e.target.value, 10);
    dispatch(getSingleCurrency(selectedCurrencyId));
    dispatch(addSelectedCurrency(selectedCurrencyId));
    SetSelectedDropdown(selectedCurrencyId);
  };

  useEffect(() => {
    dispatch(allCurrencies());
    dispatch(getSelectedCurrency());
    if (currencyModel1?.currency_id) {
      SetSelectedDropdown(currencyModel1.currency_id); 
    }
  }, [dispatch, currencyModel1?.currency_id]);

  const toggleDiv = () => setIsVisible((prev) => !prev);

  return (
    <div className="top-0">
      <div className="fixed h-[62px] bg-indigo-700 border-b border-gray-300 w-full">
        <h1 className="ml-[19px] py-[14.5px] text-white text-2xl">Settings</h1>
        <div className="bg-gray-100 pt-[18px] h-screen">
          <div className="mx-[99px] p-[15px] shadow-custom bg-white w-[75%] border h-[full] rounded">
            <div className="flex">
              <button onClick={toggleDiv} className="relative flex p-1 pt-2">
                {isVisible ? <FontAwesomeIcon icon={faCaretDown} /> : <FontAwesomeIcon icon={faCaretRight} />}
              </button>
              <h1 className="text-xl ml-1">CURRENCY</h1>
            </div>
            <div className="mt-[2px] flex-wrap">
              {isVisible && (
                <div className=" ">
                  <div className="flex">
                    <div className="mt-[10px]">
                      <label
                        htmlFor="currency"
                        className="block text-sm font-medium text-black-400 mb-[5px]"
                      >
                        Base Currency
                      </label>
                      <select
                        id="currency"
                        name="currency"
                        value={selectedDropdown || ""}
                        onChange={handleSelectCurrency}
                        className="border rounded-[5px] p-[9px] w-[455px] text-sm focus:border-blue-400 hover:border-gray-400 focus:outline-none"
                      >
                        {currencies.map((currency) => (
                          <option
                            key={currency.id}
                            value={currency.id}
                            className="hover:bg-gray-500 focus:bg-green-500 "
                          >
                            {currency.currency_code}, {currency.currency_name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="mt-[10px] pl-[14px] relative ">
                      <label
                        htmlFor="currency"
                        className="block text-sm font-medium text-black-100 mb-[5px]"
                      >
                        Additional Currencies (optional)
                      </label>
                      <select
                        id="currency"
                        name="currency"
                        onChange={handleSelectCurrency}
                        className="border rounded-[5px] p-[9px] w-[455px] text-sm focus:border-blue-400 hover:border-gray-400 focus:outline-none"
                      >
                        <option
                          className="text-grey-600"
                          value=""
                          disabled
                          hidden
                        >
                          Select additional currencies
                        </option>
                        {currencies.map((currency) => (
                          <option
                            key={currency.id}
                            value={currency.id}
                            className="hover:bg-gray-500 focus:bg-green-500 "
                          >
                            {currency.currency_code}, {currency.currency_name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
