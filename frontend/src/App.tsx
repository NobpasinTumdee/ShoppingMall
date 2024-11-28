//import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes ,useLocation } from 'react-router-dom';
import Login from './Page/Login/Login';
import Main from './Page/MainWeb/Main';
import Store from './Page/MainWeb/Store/Store';
import SubStore from './Page/MainWeb/Store/SubStore/SubStore';
import BookStore from './Page/MainWeb/Store/SubStore/BookStore';
import CarPark from './Page/MainWeb/CarPark/CarPark';
import CarParkIN from './Page/MainWeb/CarPark/CarParkIN';
import CarParkINZone from './Page/MainWeb/CarPark/IN/CarParkINZone'

const App: React.FC = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Main" element={<Main />} />
        <Route path="/Store" element={<Store />} />
        <Route path="/Store" element={<Store />} />
        <Route path="/SubStore" element={<SubStore />} />
        <Route path="/BookStore" element={<BookStore />} />
        <Route path="/CarParking" element={<CarPark />} />
        <Route path="/CarParking-In" element={<CarParkIN />} />
        <Route path="/CarParking-In-Zone" element={<CarParkINZone />} />
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
