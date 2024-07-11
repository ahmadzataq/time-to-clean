import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Title from "../common/title/Title";
import "./order.css";
import axios from "axios";
import moment from "moment";
import Swal from "sweetalert2";

const Order = () => {
  // GET ORDERS
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    const fatchOrders = async () => {
      const { data } = await axios.get("/api/admin/orders");
      setOrders(data);
    };
    fatchOrders();
  }, [orders]);

  // DELETE ORDER
  const deleteHandler = (id) => {
    Swal.fire({
      text: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Delete",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`/api/admin/orders/${id}`)
          .then((response) => {
            Swal.fire({
              icon: "success",
              text: "Order Deleted.",
              showConfirmButton: false,
              timer: 1000,
            });
          })
          .catch((error) => {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Order deleted field!",
            });
          });
      }
    });
  };

  return (
    <>
      <section className="order content">
        <Title title="Orders" />
        <div className="order-items">
          <table>
            <tr>
              <th>Pelanggan</th>
              <th>ID</th>
              <th>Item</th>
              <th>Qty</th>
              <th>Jumlah Harga</th>
              <th>Pembayaran</th>
              <th>Status</th>
              <th>Tanggal Pemesanan</th>
              <th>Tanggal Estimasi</th>
              <th>Aksi</th>
            </tr>
            {orders.length === 0 ? (
              <tr>
                <td className="text-center" colSpan="13">
                  Kosong!
                </td>
              </tr>
            ) : (
              orders.map((item) => (
                <tr
                  className={
                    (item.status === "Ordered" && "text-bold") ||
                    (item.status === "OnDelivery" && "text-bold") ||
                    (item.status === "Accept" && "text-bold")
                  }
                >
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
                  <td>
                    <b>Payment: </b> {item.payment + " "}
                  </td>
                  <td>
                    <span
                      className={
                        (item.status === "Ordered" && "btn-order") ||
                        (item.status === "Accepted" && "btn-on-delv") ||
                        (item.status === "On_service" && "btn-on-delv") ||
                        (item.status === "Cancelled" && "btn-cncl") ||
                        (item.status === "Delivered" && "btn-delv")
                      }
                    >
                      {item.status}
                    </span>
                  </td>
                  <td>{moment(item.order_date).format("lll")}</td>
                  <td>
                    {item.expTime === "0"
                      ? "NaN"
                      : moment(item.expTime).format("lll")}
                  </td>
                  <td>
                    <Link to={"/orders/" + item._id} className="btn-edit">
                      <i class="ri-edit-box-fill"></i>
                    </Link>{" "}
                    <Link
                      onClick={() => deleteHandler(item._id)}
                      className="btn-delete"
                    >
                      <i class="ri-delete-bin-5-fill"></i>
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </table>
        </div>
      </section>
    </>
  );
};

export default Order;
