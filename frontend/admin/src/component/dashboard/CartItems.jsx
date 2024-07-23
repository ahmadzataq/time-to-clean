import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const CartItems = () => {
  // Orders
  const [orders, setOrders] = useState([]);
  const [completeOrders, setCompleteOrders] = useState([]);
  useEffect(() => {
    const fatchOrders = async () => {
      const { data } = await axios.get("https://time-to-clean-api.vercel.app/orders");
      const completeOrder = data.filter((curData) => {
        return curData.status.toLowerCase() === "selesai";
      });
      setCompleteOrders(completeOrder);
      setOrders(data);
    };
    fatchOrders();
  }, [orders]);

  return (
    <>
      <div className="dashboard-cards">
        <Link to="/orders">
          <div className="single-card">
            <div className="card-content">
              <h4>Total Pesanan</h4>
              <span>{orders.length}+</span>
            </div>
            <span className="card-icon">
              <i class="ri-shopping-basket-line"></i>
            </span>
          </div>
        </Link>

        <Link to="/complete-orders">
          <div className="single-card">
            <div className="card-content">
              <h4>Pesanan Selesai</h4>
              <span>{completeOrders.length}+</span>
            </div>
            <span className="card-icon">
              <i class="ri-check-double-fill"></i>
            </span>
          </div>
        </Link>

      </div>
      <div className="dashboard-cards">
    </div>
    </>
  );
};

export default CartItems;
