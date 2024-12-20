import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import Login from "./Page/Login/Login";
import Main from "./Page/MainWeb/Main";
import Admin from "./Page/MainWeb/Admin/Admin";
import AdminStore from "./Page/MainWeb/Admin/AdminStore";
import Store from "./Page/MainWeb/Store/Store";
import StorePayment from "./Page/MainWeb/Store/StorePayment";
import SubStore from "./Page/MainWeb/Store/SubStore/SubStore";
import BookStore from "./Page/MainWeb/Store/SubStore/BookStore";
import Inbox from "./Page/MainWeb/Inbox/Inbox";
import BillStore from "./Page/MainWeb/Store/BillStore";
import Recruitment from "./Page/Recruitment/Recruitment";
import AdminJob from "./Page/MainWeb/Admin/AdminJob";
import Inventory from "./Page/MainWeb/Inventory/Inventory";
import { NavBar } from "./Page/Component/NavBar";

import BookingHall from "./Page/MainWeb/Hall/BookingHall/HallBookingPage";
import Hall from "./Page/MainWeb/Hall/selectHall/SelectHall";
import CalendarPage from "./Page/MainWeb/Hall/calendar/calendar";

import Cleaning from "./Page/MainWeb/Clearning/Cleaningpage";

import ServiceRequest from "./Page/MainWeb/ServiceRequest/Request/ServicePage";

const App: React.FC = () => {
  const location = useLocation();
  const Navbar = [
    "/Main",
    "/Store",
    "/SubStore",
    "/BookStore",
    "/Admin",
    "/AdminStore",
    "/Hall",
    "/bookinghall",
    "/celendar",
    "/Inbox",
    "/StorePayment",
    "/BillStore",
    "/Recruitment",
    "/AdminJob",
    "/Inventory",
    "/ServiceRequest",
  ].includes(location.pathname);
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
        <Route path="/bookinghall" element={<BookingHall />} />
        <Route path="/celendar" element={<CalendarPage />} />

        <Route path="/BillStore" element={<BillStore />} />
        <Route path="/Recruitment" element={<Recruitment />} />
        <Route path="/AdminJob" element={<AdminJob />} />
        <Route path="/Inventory" element={<Inventory />} />
        <Route path="/Hall" element={<Hall />} />
        <Route path="/Cleaning" element={<Cleaning />} />

        <Route path="/ServiceRequest" element={<ServiceRequest />} />
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
