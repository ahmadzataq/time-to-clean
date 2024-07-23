import React from "react";
import { Route, Routes } from "react-router-dom";
import Customer from "../customer/Customer";
import Dashboard from "../dashboard/Dashboard";
import ErrorPage from "../error-page/ErrorPage";
import Order from "../order/Order";
import Login from "../login/Login";
import SingleOrder from "../order/SingleOrder";
import SingleCustomer from "../customer/SingleCustomer";
import CompleteOrders from "../order/CompleteOrders";

const Router = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/customers" element={<Customer />} />
        <Route path="/customers/:id" element={<SingleCustomer />} />
        <Route path="/orders" element={<Order />} />
        <Route path="/orders/:id" element={<SingleOrder />} />
        <Route path="/complete-orders" element={<CompleteOrders />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </>
  );
};

export default Router;
