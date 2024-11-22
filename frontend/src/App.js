import React from 'react';
//import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Setup from './Pages/Setup';
import Dashboard from './Pages/Dashboard';
import Transactions from './Pages/Transactions';
import Accounts from './Pages/Accounts';
import Reports from './Pages/Reports';
import Budget from './Pages/Budget';
import Settings from './Pages/Settings';
import SideNavbar from './Components/Navbar/SideNavbar';

const App = () => {
  return (
    <>
    <Router>
      <Routes>
        <Route path='/setup' element={<Setup />} />
        <Route path='/' element={<SideNavbar />} >
        <Route index element={<Dashboard />} />
        <Route path='transactions' element={<Transactions />} />
        <Route path='accounts' element={<Accounts />} />
        <Route path='reports' element={<Reports />} />
        <Route path='budget' element={<Budget />} />
        <Route path='settings' element={<Settings />} />
        </Route>
      </Routes>
    </Router>
    </>
  )
}

export default App;
