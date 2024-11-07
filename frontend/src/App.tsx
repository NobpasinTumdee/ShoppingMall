//import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes ,useLocation } from 'react-router-dom';
import Login from './Page/Login/Login';
import Main from './Page/MainWeb/Main';
import Admin from './Page/MainWeb/Admin';
import Store from './Page/MainWeb/Store/Store';
import SubStore from './Page/MainWeb/Store/SubStore/SubStore';
import BookStore from './Page/MainWeb/Store/SubStore/BookStore';
import { NavBar } from './Page/Component/NavBar';

const App: React.FC = () => {
  const location = useLocation();
  const Navbar = ["/Main","/Store","/SubStore","/BookStore","/Admin"].includes(location.pathname);
  return (
    <>
      {Navbar && <NavBar />}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Main" element={<Main />} />
        <Route path="/Admin" element={<Admin />} />
        <Route path="/Store" element={<Store />} />
        <Route path="/SubStore" element={<SubStore />} />
        <Route path="/BookStore" element={<BookStore />} />
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
