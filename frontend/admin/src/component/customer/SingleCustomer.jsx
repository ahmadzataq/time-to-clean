import React, { useEffect, useState } from "react";
import Title from "../common/title/Title";
import "./customer.css";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import Swal from "sweetalert2";

const SingleCustomer = () => {
  // GET CUSTOMER DETAILS
  const { id } = useParams();
  const [customer, setCustomer] = useState({});
  useEffect(() => {
    const fatchCustomer = async () => {
      const { data } = await axios.get(`https://time-to-clean-api.vercel.app/customers/${id}`
      );
      setCustomer(data);
    };
    fatchCustomer();
  }, [id]);

  // GET ORDERS
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    const fatchOrders = async () => {
      const { data } = await axios.get("https://time-to-clean-api.vercel.app/orders"
      );
      const fatchOrders = data.filter((curData) => {
        return curData.customer_id === id;
      });
      setOrders(fatchOrders);
    };
    fatchOrders();
  }, [id]);

  // CUSTOMER DELETE
  const deleteHandler = (id, thumb) => {
    Swal.fire({
      text: "Apakah anda yakin?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Delete",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`https://time-to-clean-api.vercel.app/customers/${id}?thumb=${thumb}`
          )
          .then((response) => {
            Swal.fire({
              icon: "success",
              title: "Customer deleted successfull.",
              showConfirmButton: false,
              timer: 500,
            });
            window.location.href = "/customers";
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

  return (
    <>
      <section className="single-customer content">
        <Title title="Profil Pelanggan" />
        <div className="profile-items">
          <div className="left">
            <div class="card">
              <ul class="list-group list-group-flush">
                <li class="list-group-item">
                  <b>Nama: </b> {customer.name}
                </li>
                <li class="list-group-item">
                  <b>Email: </b> {customer.email}
                </li>
                <li class="list-group-item">
                  <b>Telepon: </b> {customer.phone}
                </li>
                <li class="list-group-item">
                  <b>Alamat: </b> {customer.address}
                </li>
              </ul>
            </div>
            <Link className="btn-primary" to="/customers">
              KEMBALI
            </Link>{" "}
            <Link onClick={() => deleteHandler(customer._id, customer.thumb)} className="btn-delete">
              HAPUS
            </Link>
          </div>
          <div className="right">
            <table className="customers-order">
              <tr>
                <th>Id Pesanan</th>
                <th>Tanggal Pesanan</th>
                <th>Status Pesanan</th>
                <th>Action</th>
              </tr>
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
                      <Link to={"/orders/" + item._id}>{item._id}</Link>
                    </td>
                    <td>{moment(item.order_date).format("lll")}</td>
                    <td>
                      <span
                        className="btn-small"
                      >
                        {item.status}
                      </span>
                    </td>
                    <td>
                      <Link to={"/orders/" + item._id} className="btn-success">
                        <i class="ri-eye-fill"></i>
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </table>
          </div>
        </div>
      </section>
    </>
  );
};

export default SingleCustomer;
