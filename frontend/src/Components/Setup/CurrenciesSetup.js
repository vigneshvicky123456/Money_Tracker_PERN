import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  allCurrencies,
  getSingleCurrency,
  addSelectedCurrency,
  getSelectedCurrency
} from "../../features/currenciesSlice";


const CurrenciesSetup = () => {
  const dispatch = useDispatch();
  const  currencyModel1  = useSelector((state) => state.currency.currencyModel1);
  const { currencies } = useSelector((state) => state.currency);

  const [selectedDropdown, SetSelectedDropdown] = useState({
    id: 0,
    currencyName: "",
    currencyCode: "",
    currencyValue: 0,
    currencyFlag: "",
  });
 
  const handleSelectCurrency = (e) => {
    dispatch(getSingleCurrency(e.target.value));
    const selectedCurrencyId = parseInt(e.target.value);
    dispatch(addSelectedCurrency(selectedCurrencyId));
  };

  useEffect(() => {
    dispatch(allCurrencies());
    dispatch(getSelectedCurrency());
    if (currencyModel1) {
      SetSelectedDropdown({
        id: currencyModel1.currencyModel?.id,
        currencyName: currencyModel1.currencyModel?.currency_name || "",
        currencyCode: currencyModel1.currencyModel?.currency_code || "",
        currencyValue: currencyModel1.currencyModel?.currency_value || 0,
        currencyFlag: currencyModel1.currencyModel?.currency_flag || "",
      });
    }
},[dispatch,currencyModel1?.currencyModel?.id]);

  return (
    <div className="px-[11px]">
      <div>
        <h1 className="text-2xl mb-[13px]">Currencies</h1>
        <p>
          Select your base currency — the currency which will be used by
          default.
        </p>
        <p>
          You can also select any number of additional currencies, if you use
          them.
        </p>
      </div>
      <div className="flex">
        <div className="mt-[10px] relative">
          <label
            htmlFor="currency"
            className="block text-sm font-medium text-black-400 mb-[5px]"
          >
            Base Currency
          </label>
          <select
            id="currency"
            name="currency"
            value={selectedDropdown.id}
            onChange={handleSelectCurrency}            
            className="border rounded-[5px] p-[9px] w-[330px] text-sm focus:border-blue-400 hover:border-gray-400 focus:outline-none"
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
          //  onChange={handleSelectCurrency}
            className="border rounded-[5px] p-[9px] w-[330px] text-sm focus:border-blue-400 hover:border-gray-400 focus:outline-none"
          >
           <option className="text-grey-600" value="" disabled selected hidden >
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
  );
};

export default CurrenciesSetup;



 