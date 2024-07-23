import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import "./index.css";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Unyellowing from "./components/Unyellowing";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Order from "./components/Order";
import Services from "./components/Services";
import SoftClean from "./components/SoftClean";
import DeepClean from "./components/DeepClean";
import { CartProvider } from "react-use-cart";
import Dashboard from "./components/UserDashboard/Dashboard";
import Settings from "./components/UserDashboard/Settings";
import ProfilePic from "./components/UserDashboard/ProfilePic";
import ChangePwd from "./components/UserDashboard/ChangePwd";
import OrderDetails from "./components/UserDashboard/OrderDetails";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  return (
    <>
      <BrowserRouter>
        <CartProvider>
          <ScrollToTop />
          <Navbar />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/services" element={<Services />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/deepclean" element={<DeepClean />} />
            <Route exact path="/softclean" element={<SoftClean />} />
            <Route exact path="/unyellowing" element={<Unyellowing />} />
            <Route exact path="/order" element={<Order />} />
            <Route exact path="/customer/settings/" element={<Settings />} />
            <Route exact path="/customer" element={<Dashboard />} />
            <Route
              exact
              path="/customer/dashboard/:id"
              element={<OrderDetails />}
            />
            <Route
              exact
              path="/customer/profile-picture"
              element={<ProfilePic />}
            />
            <Route exact path="/customer/password" element={<ChangePwd />} />
          </Routes>
          <Footer />
        </CartProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
