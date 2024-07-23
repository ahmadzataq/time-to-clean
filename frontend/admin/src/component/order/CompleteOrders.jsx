import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Title from "../common/title/Title";
import "./order.css";
import axios from "axios";
import moment from "moment";

const CompleteOrders = () => {
  // GET COMPLETED ORDER
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    const fatchOrders = async () => {
      const { data } = await axios.get("https://time-to-clean-api.vercel.app/orders"
      );
      const completeOrder = data.filter((curData) => {
        return curData.status.toLowerCase() === "selesai";
      });
      setOrders(completeOrder);
    };
    fatchOrders();
  }, [orders]);

  return (
    <>
      <section className="order content">
        <Title title="Pesanan Selesai" />
        <div className="order-items">
          <table>
            <tr>
              <th>Pelanggan</th>
              <th>Id</th>
              <th>Item</th>
              <th>Qty</th>
              <th>Jumlah Harga</th>
              <th>Pembayaran</th>
              <th>Status</th>
              <th>Tanggal Pemesanan</th>
              <th>Tanggal Estimasi</th>
            </tr>
            {orders.length === 0 ? (
              <tr>
                <td className="text-center" colSpan="13">
                Kosong!
                </td>
              </tr>
            ) : (
              orders.map((item) => (
                <tr>
                  <td>
                    <Link to={"/customers/" + item.customer_id}>
                      {item.customer_name}
                    </Link>
                  </td>
                  <td>
                    <Link to={"/orders/" + item._id}>{item._id}</Link>
                  </td>
                  <td>{item.totalItems}</td>
                  <td>{item.total_quantity}</td>
                  <td>Rp. {item.total_price}</td>
                  <td>{item.payment}</td>
                  <td>
                    <span
                      className="btn-small"
                    >
                      {item.status}
                    </span>
                  </td>
                  <td>{moment(item.order_date).format("lll")}</td>
                  <td>{moment(item.expTime).format("lll")}</td>

                </tr>
              ))
            )}
          </table>
        </div>
      </section>
    </>
  );
};

export default CompleteOrders;
