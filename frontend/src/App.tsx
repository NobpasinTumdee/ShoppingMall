import { BrowserRouter as Router, Route, Routes ,useLocation } from 'react-router-dom';
import Login from './Page/Login/Login';
import Main from './Page/MainWeb/Main';
import Admin from './Page/MainWeb/Admin/Admin';
import { AdminEvent } from './Page/MainWeb/Admin/Admin';
import AdminStore from './Page/MainWeb/Admin/AdminStore';
import Store from './Page/MainWeb/Store/Store';
import StorePayment from './Page/MainWeb/Store/StorePayment';
import SubStore from './Page/MainWeb/Store/SubStore/SubStore';
import BookStore from './Page/MainWeb/Store/SubStore/BookStore';
import Inbox from './Page/MainWeb/Inbox/Inbox';
import BillStore from './Page/MainWeb/Store/BillStore';
import Recruitment from './Page/Recruitment/Recruitment';
import AdminJob from './Page/MainWeb/Admin/AdminJob';
import BackUpStore from './Page/MainWeb/Admin/BackUpStore';
import Inventory from './Page/MainWeb/Inventory/Inventory';
import { NavBar } from './Page/Component/NavBar';
import Hall from './Page/MainWeb/Hall/selectHall/SelectHall';
import Cleaning from './Page/MainWeb/Clearning/TaskOverview';
import ServicePage from './Page/MainWeb/ServiceRequest/ServicePage';

import BookingHall from './Page/MainWeb/Hall/BookingHall/HallBookingPage';
import Calendar from './Page/MainWeb/Hall/calendar/calendar';
import Listbooking from './Page/MainWeb/Hall/ListBooking/ListBooking';

import { ProtectedRoute } from './ProtectedRoute';
import { ProtectedRouteAdmin } from './ProtectedRoute';
const App: React.FC = () => {
  const location = useLocation();
  const Navbar = ["/Main","/Store","/SubStore","/BookStore","/Admin","/AdminStore","/Hall","/bookinghall","/celendar","/Inbox","/StorePayment","/BillStore","/Recruitment","/AdminJob","/Inventory","/BackUpStore","/AdminEvent","/Cleaning","/service"].includes(location.pathname);
  const isAuthenticated = !!localStorage.getItem('token'); // ตรวจสอบการเข้าสู่ระบบ
  return (
    <>
      {Navbar && <NavBar />}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Main" element={<Main />} />

        <Route path="/Admin" element={<ProtectedRouteAdmin isAuthenticated={isAuthenticated}><Admin /></ProtectedRouteAdmin>} />
        <Route path="/AdminEvent" element={<ProtectedRouteAdmin isAuthenticated={isAuthenticated}><AdminEvent /></ProtectedRouteAdmin>} />
        <Route path="/AdminStore" element={<ProtectedRouteAdmin isAuthenticated={isAuthenticated}><AdminStore /></ProtectedRouteAdmin>} />
        <Route path="/AdminJob" element={<ProtectedRouteAdmin isAuthenticated={isAuthenticated}><AdminJob /></ProtectedRouteAdmin>} />
        <Route path="/Recruitment" element={<ProtectedRoute isAuthenticated={isAuthenticated}><Recruitment /></ProtectedRoute>} />

        <Route path="/Store" element={<Store />} />
        <Route path="/SubStore" element={<SubStore />} />
        <Route path="/BookStore" element={<ProtectedRoute isAuthenticated={isAuthenticated}><BookStore /></ProtectedRoute>} /> 
        <Route path="/BackUpStore" element={<ProtectedRoute isAuthenticated={isAuthenticated}><BackUpStore /></ProtectedRoute>} />
        <Route path="/Inbox" element={<Inbox />} /> 
        <Route path="/StorePayment" element={<StorePayment />} />
        <Route path="/BillStore" element={<ProtectedRoute isAuthenticated={isAuthenticated}><BillStore /></ProtectedRoute>} />

        <Route path="/Hall" element={<Hall />} />
        <Route path="/booking/:id" element={<BookingHall />} />
        <Route path="/calendar/:id" element={<Calendar />} />
        <Route path="/listbooking/:id" element={<Listbooking />}/>

        <Route path="/Inventory" element={<Inventory />} />
        <Route path="/Cleaning" element={<Cleaning />} />
        
        <Route path="/service" element={<ServicePage />} />

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