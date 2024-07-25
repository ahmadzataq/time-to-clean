import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "reactstrap";
import "./dashboard.css";
import { Link } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import Profile from "./Profile";
import Swal from "sweetalert2";

const Dashboard = () => {
  // GET CUSTOMER DETAILS
  const id = localStorage.getItem("cID");
  const [setCustomer] = useState({});
  useEffect(() => {
    const fetchCustomer = async () => {
      const { data } = await axios.get(`https://time-to-clean-api.up.railway.app/api/admin/customers/${id}`);
      setCustomer(data);
    };
    fetchCustomer();
  }, [id]);

  // GET ORDERS
  const [orders, setOrders] = useState([]);
  const customer_id = localStorage.getItem("cID");
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await axios.get(`https://time-to-clean-api.up.railway.app/api/admin/orders`);
        console.log("Data received:", data); // Tambahkan log ini
        const ordersData = data.orders || []; // Sesuaikan dengan struktur respons yang benar
        if (Array.isArray(ordersData)) {
          const customerOrders = ordersData.filter((curData) => curData.customer_id === customer_id);
          setOrders(customerOrders);
        } else {
          console.error("Data received is not an array:", ordersData);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
    fetchOrders();
  }, [customer_id]);

  // CANCEL ORDER
  const deleteHandler = (id) => {
    Swal.fire({
      text: "Apakah anda yakin?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`/api/admin/orders/${id}`).catch((error) => {
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
  const acceptHandler = (id) => {
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
          .put(`/api/admin/orders/${id}`, updateData, {
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

  if (!localStorage.getItem("cToken")) {
    window.location.href = "/login";
  } else {
    return (
      <Container>
        <div className="d-flex justify-content-center mb-4">
          <h2 className="text-title head-title mt-5">Riwayat Pesanan</h2>
        </div>
        <Row>
          <Col md={4} className="mb-5">
            <Profile />
          </Col>
          <Col md={8}>
            <div className="order">
              <h3>Tabel Pemesanan</h3>
              <div className="order-items">
                <table>
                  <thead>
                    <tr>
                      <th>Id</th>
                      <th>Item</th>
                      <th>Qty</th>
                      <th>Total Harga</th>
                      <th>Pembayaran</th>
                      <th>Status</th>
                      <th>Tanggal Pemesanan</th>
                      <th>Tanggal Diterima</th>
                      <th>Tanggal Estimasi</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.length === 0 ? (
                      <tr>
                        <td className="text-center" colSpan="10">
                          Kosong!
                        </td>
                      </tr>
                    ) : (
                      orders.map((item, index) => (
                        <tr key={index}>
                          <td>
                            <Link to={"/customer/dashboard/" + item._id}>
                              {item._id.slice(0, 10)}...
                            </Link>
                          </td>
                          <td>{item.totalItems}</td>
                          <td>{item.total_quantity}</td>
                          <td>Rp. {item.total_price}</td>
                          <td>{item.payment}</td>
                          <td>
                            <span
                              className={
                                (item.status === "Dipesan" && "btn-order") ||
                                (item.status === "Diterima" && "btn-on-delv") ||
                                (item.status === "Diproses" && "btn-on-delv") ||
                                (item.status === "Batal" && "btn-cncl") ||
                                (item.status === "Selesai" && "btn-delv")
                              }
                            >
                              {item.status}
                            </span>
                          </td>
                          <td>{moment(item.order_date).format("lll")}</td>
                          <td>
                            {item.accept_time
                              ? moment(item.accept_time).format("lll")
                              : "-"}
                          </td>
                          <td>
                            {item.expTime === "0"
                              ? "-"
                              : moment(item.expTime).format("lll")}
                          </td>
                          <td>
                          {(item.status === "Diproses" ||
                            item.status === "Pickup") && (
                            <Link
                              className="btn-small"
                              onClick={() => acceptHandler(item._id)}
                            >
                              ACCEPT
                            </Link>
                          )}
                          {(item.status === "Selesai" ||
                            item.status === "Batal" ||
                            item.status === "Diterima") && (
                            <Link className="btn-small disableLink">
                              ACCEPT
                            </Link>
                          )}
                          {item.status === "Dipesan" && (
                            <Link
                              onClick={() => deleteHandler(item._id)}
                              className="btn-small danger-btn"
                            >
                              CANCEL
                            </Link>
                          )}
                        </td>
                        </tr>                    
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
};

export default Dashboard;
