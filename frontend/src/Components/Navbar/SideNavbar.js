import React from "react";
import { Link, Outlet } from "react-router-dom";
import navbar_Logo from "../../images/navbar_Logo.PNG";
import dashboard_Logo from "../../images/imageNavbar/Dashboard.PNG";
import account_Logo from "../../images/imageNavbar/Accounts.PNG";
import tranactions_Logo from "../../images/imageNavbar/Transactions.PNG";
import report_Logo from "../../images/imageNavbar/Reports.PNG";
import budget_Logo from "../../images/imageNavbar/Budget.PNG";
import setting_Logo from "../../images/imageNavbar/Settings.PNG";

const SideNavbar = () => {
  return (
    <div className="flex h-screen">
      <aside className="sticky w-[125px] top-0">
        <nav className="p-4 h-[62px] bg-indigo-700 border-b border-gray-300 ">
          <div className="flex flex-wrap items-center justify-between mx-auto ">
            <img
              src={navbar_Logo}
              className="flex items-center space-x-3 ml-[27px] h-9"
              alt="Navbar Logo"
            />
          </div>
        </nav>
        <div>
          <ul className="flex flex-col font-medium border-r bg-white">
            <li className="block py-3 pl-7 text-sm border-b hover:bg-gray-100">
              <Link to="/">
                <img
                  src={dashboard_Logo}
                  className="w-[40px] h-[25px] ml-4"
                  alt="Navbar Logo"
                />
                Dashboard
              </Link>
            </li>
            <li className="block py-3 pl-7 text-sm border-b hover:bg-gray-100">
              <Link to="/transactions">
                <img
                  src={tranactions_Logo}
                  className="w-[40px] h-[25px] ml-4"
                  alt="Navbar Logo"
                />
                Transactions
              </Link>
            </li>
            <li className="block py-3 pl-9 text-sm border-b hover:bg-gray-100">
              <Link to="/accounts">
                <img
                  src={account_Logo}
                  className="w-[40px] h-[25px] ml-2"
                  alt="Navbar Logo"
                />
                Accounts
              </Link>
            </li>
            <li className="block py-3 pl-10 text-sm border-b hover:bg-gray-100">
              <Link to="/reports">
                <img
                  src={report_Logo}
                  className="w-[40px] h-[25px] ml-1"
                  alt="Navbar Logo"
                />
                Reports
              </Link>
            </li>
            <li className="block py-3 pl-10 text-sm border-b hover:bg-gray-100">
              <Link to="/budget">
                <img
                  src={budget_Logo}
                  className="w-[40px] h-[25px] ml-1"
                  alt="Navbar Logo"
                />
                Budget
              </Link>
            </li>
            <li className="block py-3 pl-9 text-sm border-b hover:bg-gray-100">
              <Link to="/settings">
                <img
                  src={setting_Logo}
                  className="w-[40px] h-[25px] ml-2"
                  alt="Navbar Logo"
                />
                Settings
              </Link>
            </li>
          </ul>
        </div>
      </aside>
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default SideNavbar;
