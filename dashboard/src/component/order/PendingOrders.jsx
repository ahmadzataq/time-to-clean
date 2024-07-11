import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Title from "../common/title/Title";
import "./order.css";
import axios from "axios";
import moment from "moment";

const PendingOrders = () => {
  // GET COMPLETED ORDER
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    const fatchOrders = async () => {
      const { data } = await axios.get("/api/admin/orders"
      );
      const completeOrder = data.filter((curData) => {
        return curData.status.toLowerCase() !== "Selesai";
      });
      setOrders(completeOrder);
    };
    fatchOrders();
  }, [orders]);

  return (
    <>
    </>
  );
};

export default PendingOrders;
