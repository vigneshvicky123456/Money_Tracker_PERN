import React from "react";
import setupImage from "../images/imageSetup/Setup.PNG";
import CurrenciesSetup from "../Components/Setup/CurrenciesSetup";
import AccountSetup from "../Components/Setup/AccountSetup";
//import SetupTable from "../Components/Setup/SetupTable";

const Setup = () => {
  return (
    <div className="bg-gray-100 h-screen overflow-y-scroll pt-[15px]">
      <div className="bg-white h-[650px] w-[55%] mx-[22.5%] rounded-[5px] shadow-[0_4px_8px_rgba(66,65,65,0.2),0_6px_20px_rgba(28,28,28,0.19)]">
        <div className="pt-[13px] pl-[10px] pb-[10px] border-b-[1px] border-gray-300">
          <img
            className="w-[50px] h-[40px] inline"
            src={setupImage}
            alt="setup logo"
          ></img>
          <h1 className="pl-[10px] text-2xl inline pt-[8px] ">
            Money Tracker Setup
          </h1>
        </div>
        <div className="px-[11px] py-[13px]">
          <button className="bg-gray-200 px-[20px] py-[7px] rounded-[4px] mr-[7px] text-gray-600">
            Log In
          </button>
          <span>
            if you want to sync your data with the cloud. You may also use the
            tracker without signing in. Your data will be stored only on current
            device in this case. You can sign in and sync your data any time
            later.
          </span>
        </div>
        <CurrenciesSetup></CurrenciesSetup>
        <AccountSetup></AccountSetup>
        {/* <SetupTable></SetupTable> */}
      </div>
    </div>
  );
};

export default Setup;
