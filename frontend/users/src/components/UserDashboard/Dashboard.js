import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "reactstrap";
import "./dashboard.css";
import { Link } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import Profile from "./Profile";

const Dashboard = () => {
  // GET CUSTOMER DETAILS
  const id = localStorage.getItem("cID");
  const [customer, setCustomer] = useState({});
  useEffect(() => {
    const fetchCustomer = async () => {
      const { data } = await axios.get(`https://time-to-clean-api.vercel.app/customers/${id}`);
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
        const { data } = await axios.get(`https://time-to-clean-api.vercel.app/orders`);
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
