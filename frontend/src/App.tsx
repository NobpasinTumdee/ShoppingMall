//import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes ,useLocation } from 'react-router-dom';
import Login from './Page/Login/Login';
import Main from './Page/MainWeb/Main';
import Admin from './Page/MainWeb/Admin/Admin';
import AdminStore from './Page/MainWeb/Admin/AdminStore';
import Store from './Page/MainWeb/Store/Store';
import StorePayment from './Page/MainWeb/Store/StorePayment';
import SubStore from './Page/MainWeb/Store/SubStore/SubStore';
import BookStore from './Page/MainWeb/Store/SubStore/BookStore';
<<<<<<< HEAD
import Hall from './Page/MainWeb/Hall/SelectHall/SelectHall';
=======
import Inbox from './Page/MainWeb/Inbox/Inbox';
import BillStore from './Page/MainWeb/Store/BillStore';
import { NavBar } from './Page/Component/NavBar';
import Hall from './Page/MainWeb/Hall/HallBookingPage';
>>>>>>> main


const App: React.FC = () => {
  const location = useLocation();
  const Navbar = ["/Main","/Store","/SubStore","/BookStore","/Admin","/AdminStore","/Hall","/Inbox","/StorePayment","/BillStore"].includes(location.pathname);
  return (
    <>
      {Navbar && <NavBar />}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Main" element={<Main />} />
        <Route path="/Admin" element={<Admin />} />
        <Route path="/AdminStore" element={<AdminStore />} />
        <Route path="/Store" element={<Store />} />
        <Route path="/StorePayment" element={<StorePayment />} />
        <Route path="/SubStore" element={<SubStore />} />
        <Route path="/BookStore" element={<BookStore />} /> 
        <Route path="/Inbox" element={<Inbox />} /> 
        <Route path="/BillStore" element={<BillStore />} /> 
        <Route path="/Hall" element={<Hall />} />
<<<<<<< HEAD
=======
        
>>>>>>> main
      </Routes>
    </>
  );
};

const AppWrapper: React.FC = () => (
  <Router>
      <App />
  </Router>
);

export default AppWrapper;
