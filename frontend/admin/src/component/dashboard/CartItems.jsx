import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const CartItems = () => {
  const [orders, setOrders] = useState([]);
  const [completeOrders, setCompleteOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await axios.get("https://time-to-clean-api.up.railway.app/orders");

        // Cek apakah data adalah array
        if (Array.isArray(data)) {
          const completeOrder = data.filter((curData) => {
            return curData.status.toLowerCase() === "selesai";
          });
          setCompleteOrders(completeOrder);
          setOrders(data);
        } else {
          console.error("Data yang diterima bukan array:", data);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []); // Perhatikan bahwa dependensi di sini harus [] untuk menghindari loop tak terbatas

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
              <i className="ri-shopping-basket-line"></i>
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
              <i className="ri-check-double-fill"></i>
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
