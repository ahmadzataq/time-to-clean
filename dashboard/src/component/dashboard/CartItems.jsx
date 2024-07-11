import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const CartItems = () => {
  // Orders
  const [orders, setOrders] = useState([]);
  const [pendingOrders, setPendingOrders] = useState([]);
  const [completeOrders, setCompleteOrders] = useState([]);
  useEffect(() => {
    const fatchOrders = async () => {
      const { data } = await axios.get("/api/admin/orders");
      const pendingOrder = data.filter((curData) => {
        return curData.status.toLowerCase() !== "delivered";
      });
      const completeOrder = data.filter((curData) => {
        return curData.status.toLowerCase() === "delivered";
      });
      setPendingOrders(pendingOrder);
      setCompleteOrders(completeOrder);
      setOrders(data);
    };
    fatchOrders();
  }, [orders]);

  // Branch wise revenue
  const [query, setQuery] = useState("");
  const [revenue, setRevenue] = useState([]);
  const [branchName, setBranchName] = useState("");
  useEffect(() => {
    const fatchRevenue = async () => {
      const { data } = await axios.get(`/api/admin/revenue?q=${query}`);
      setRevenue(data);
      setBranchName(query);
    };
    fatchRevenue();
  }, [query]);

  // const [revenue, setRevenue] = useState([]);
  // useEffect(() => {
  //   const fatchRevenue = async () => {
  //     const { data } = await axios.get("/api/admin/revenue");
  //     setRevenue(data);
  //   };
  //   fatchRevenue();
  // }, [revenue]);

  return (
    <>
      <div className="dashboard-cards">
        <Link to="/orders">
          <div className="single-card">
            <div className="card-content">
              <h4>Total Orders</h4>
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
              <h4>Complete Orders</h4>
              <span>{completeOrders.length}+</span>
            </div>
            <span className="card-icon">
              <i class="ri-check-double-fill"></i>
            </span>
          </div>
        </Link>
      </div>
      <div className="dashboard-cards">
        

        {query && (
          <Link>
            <div className="single-card">
              <div className="card-content">
                <h3>
                  <span>
                    Rp.{" "}
                    {revenue.length !== 0 ? (
                      revenue.map((item) => (
                        <span>{item._id && item.revenue}+</span>
                      ))
                    ) : (
                      <span>0+</span>
                    )}
                  </span>
                </h3>
              </div>
              <span className="card-icon">
                <i class="ri-briefcase-4-fill"></i>
              </span>
            </div>
          </Link>
        )}
      </div>
    </>
  );
};

export default CartItems;
