import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "reactstrap";
import "./dashboard.css";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import Swal from "sweetalert2";

const OrderDetails = () => {
  const { id } = useParams();
  // GET SINGLE ORDER
  const [order, setOrder] = useState({});
  const [items, setitems] = useState([]);
  useEffect(() => {
    const fatchOrder = async () => {
      const { data } = await axios.get(`https://time-to-clean-api.vercel.app/orders/${id}`);
      setOrder(data);
      setitems(data.items);
    };
    fatchOrder();
  }, [id]);

  // CANCEL ORDER
  const deleteHandler = () => {
    Swal.fire({
      text: "Apakah anda yakin?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`https://time-to-clean-api.vercel.app/orders/${id}`)
          .then((response) => {
            Swal.fire({
              icon: "success",
              text: "Pesanan dibatalkan.",
              showConfirmButton: false,
              timer: 1000,
            });
            window.location.href = "/customer";
          })
          .catch((error) => {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Gagal menghapus!",
            });
          });
      }
    });
  };

  // ACCEPT ORDER
  const acceptHandler = () => {
    Swal.fire({
      text: "Apakah anda yakin?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Accept",
    }).then((result) => {
      if (result.isConfirmed) {
        let updateData = {
          status: "Selesai",
        };
        axios
          .put(`https://time-to-clean-api.vercel.app/orders/${id}`, updateData, {
            headers: {
              "Content-Type": "application/json",
            },
          })
          .then((response) => {
            Swal.fire({
              icon: "success",
              text: "Pesanan Diterima.",
              showConfirmButton: false,
              timer: 1000,
            });
          })
          .catch((error) => {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Gagal mengupdate!",
            });
          });
      }
    });
  };

  // Payment Handler
  const paymentHandler = () => {
    Swal.fire({
      text: "Apakah anda yakin?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Send",
    }).then((result) => {
      if (result.isConfirmed) {
        let updateData = {
          pendingPayment: "Sent",
        };
        axios
          .put(`https://time-to-clean-api.vercel.app/orders/${id}`, updateData, {
            headers: {
              "Content-Type": "application/json",
            },
          })
          .then((response) => {
            Swal.fire({
              icon: "success",
              text: "Payment Sent.",
              showConfirmButton: false,
              timer: 1000,
            });
          })
          .catch((error) => {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Payment failed!",
            });
          });
      }
    });
  };

  if (!localStorage.getItem("cToken")) {
    window.location.href = "/login";
  } else {
    return (
      <Container>
        <div className="d-flex justify-content-center mb-4">
          <h2 className="text-title head-title mt-5">Detail Pesanan</h2>
        </div>
        <Row>
          <Col md={12}>
            <div className="order">
              <div className="order-items">
                <table>
                  <tr>
                    <th>Nama</th>
                    <th>Layanan</th>
                    <th>Kategori</th>
                    <th>Harga</th>
                    <th>Qty</th>
                    <th>Total Harga</th>
                  </tr>
                  {items.length === 0 ? (
                    <tr>
                      <td className="text-center" colSpan="13">
                      Kosong!
                      </td>
                    </tr>
                  ) : (
                    items.map((val, index) => (
                      <tr key={index}>
                        <td>{val.name}</td>
                        <td>{val.service}</td>
                        <td>{val.category}</td>
                        <td>Rp. {val.price}</td>
                        <td>{val.quantity}</td>
                        <td>{val.itemTotal}</td>
                      </tr>
                    ))
                  )}
                  <tr className="bold">
                    <td colSpan="3">Total Items: {order.totalItems}</td>
                    <td colSpan="2">Total Qty: {order.total_quantity}</td>
                    <td>
                      Total: Rp. {order.total_price}
                    </td>
                  </tr>
                </table>
              </div>
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={2}></Col>
          <Col md={8}>
            <Row>
              <Col md={6}>
                <div className="order-summury">
                  <h5>Status Pesanan</h5>
                  <ul>
                    <li>
                      <b>Status: </b>
                      <span
                        className={
                          (order.status === "Dipesan" && "btn-order") ||
                          (order.status === "Diterima" && "btn-on-delv") ||
                          (order.status === "Diproses" && "btn-on-delv") ||
                          (order.status === "Batal" && "btn-cncl") ||
                          (order.status === "Selesai" && "btn-delv")
                        }
                      >
                        {order.status}
                      </span>
                    </li>
                    <li>
                      <b>Pembayaran: </b> {order.payment + " "}
                    </li>
                    <li>
                      <b>Tanggal Pemesanan: </b>
                      {order.order_date
                        ? moment(order.order_date).format("lll")
                        : "NaN"}
                    </li>
                    <li>
                      <b>Tanggal Pengambilan: </b> {order.picupTime}
                    </li>
                    <li>
                      <b>Tanggal Diterima: </b>
                      {order.accept_time
                        ? moment(order.accept_time).format("lll")
                        : "NaN"}
                    </li>
                    <li>
                      <b>Tanggal Estimasi: </b>
                      {order.expTime === "0"
                        ? "NaN"
                        : moment(order.expTime).format("lll")}
                    </li>
                  </ul>
                  {(order.pendingPayment !== "Paid" &&
                    order.status === "Diproses") ||
                  order.status === "Diterima" ||
                  order.status === "Selesai" ? (
                    <Link className="btn-small disableLink">ACCEPT</Link>
                  ) : (
                    <Link onClick={() => acceptHandler()} className="btn-small">
                      ACCEPT
                    </Link>
                  )}{" "}
                  {order.pendingPayment === "Yes" &&
                    order.status === "Diproses" && (
                      <Link
                        onClick={() => paymentHandler()}
                        className="btn-small"
                      >
                        Bill Pay
                      </Link>
                    )}{" "}
                  {order.status === "Dipesan" ? (
                    <Link onClick={() => deleteHandler()} className="btn-small">
                      CANCEL
                    </Link>
                  ) : (
                    <Link className="btn-small disableLink">CANCEL</Link>
                  )}
                </div>
              </Col>
            </Row>
          </Col>
          <Col md={2}></Col>
        </Row>
      </Container>
    );
  }
};

export default OrderDetails;
