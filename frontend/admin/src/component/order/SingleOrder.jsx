import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Title from "../common/title/Title";
import "./order.css";
import moment from "moment";
import Swal from "sweetalert2";

const SingleOrder = () => {
  const { id } = useParams();
  const [status, setStatus] = useState("");
  const [expDate, setExpDate] = useState("");
  const [expTime, setExpTime] = useState("");
  // GET SINGLE ORDER
  const [order, setOrder] = useState({});
  const [items, setitems] = useState([]);
  useEffect(() => {
    const fatchOrder = async () => {
      const { data } = await axios.get(`https://time-to-clean-api.vercel.app/orders/${id}`);
      setOrder(data);
      setitems(data.items);
      setStatus(data.status);
      setExpTime(data.expTime);
    };
    fatchOrder();
  }, [id]);
  
  // UPDATE ORDER
  const submitHandler = (e) => {
    e.preventDefault();
    let updateData = {
      status,
      accept_time: new Date(),
      expTime: expDate + "," + expTime,
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
          text: "Sukses mengupdate pesanan.",
          showConfirmButton: false,
          timer: 500,
        });
        window.location.href = "/orders";
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Gagal mengupdate!",
        });
      });
  };

  // DELETE ORDER
  const deleteHandler = () => {
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
          .delete(`https://time-to-clean-api.vercel.app/orders/${id}`)
          .then((response) => {
            Swal.fire({
              icon: "success",
              text: "Pesanan dihapus.",
              showConfirmButton: false,
              timer: 500,
            });
            window.location.href = "/orders";
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
      <section className="order single-order content">
        <Title title="Orders Details" />
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
            <tr>
              <th colSpan="4">Total Items: {order.totalItems}</th>
              <th>Total Qty: {order.total_quantity}</th>
              <th>Rp. {order.total_price}</th>
            </tr>
          </table>
        </div>
        <form onSubmit={submitHandler}>
          <div className="order-summury grid-3">
            <div>
              <h5>Detail Pelanggan</h5>
              <ul>
                <li>
                  <b>Nama</b> :{" "}
                  <Link to={"/customers/" + order.customer_id}>
                    {order.customer_name}
                  </Link>
                </li>
                <li>
                  <b>Telepon</b> : {order.phone}
                </li>
                <li>
                  <b>Email</b> : {order.email}
                </li>
                <li>
                  <b>Alamat</b> : {order.address}
                </li>
              </ul>
            </div>
            <div>
              <h5>Status Pesanan</h5>
              <ul>
                <li>
                  <b>Status</b> :{" "}
                  <span className="btn-small">{order.status}</span>
                </li>
                <li>
                  <b>Pembayaran: </b> {order.payment + " "}
                </li>
                
                <li>
                  <b>Tanggal Pesanan</b> : {moment(order.date).format("lll")}
                </li>
                <li>
                  <b>Tanggal Estimasi</b> :{" "}
                  {order.expTime === "0"
                    ? "NaN"
                    : moment(order.expTime).format("lll")}
                </li>
              </ul>
            </div>
            <div>
              <h5>Action</h5>
              <ul>
                <li>
                  <b>Tanggal Estimasi</b> :{" "}
                  <input
                    type="date"
                    value={expDate}
                    onChange={(e) => setExpDate(e.target.value)}
                    className="form-control"
                  />
                  <input
                    type="time"
                    value={expTime}
                    onChange={(e) => setExpTime(e.target.value)}
                    className="form-control"
                  />
                </li>
                <li>
                  <b>Status Pesanan</b> :{" "}
                  <select
                    name="status"
                    onChange={(e) => setStatus(e.target.value)}
                    id=""
                    className="form-control"
                  >
                    <option
                      value="Dipesan"
                      selected={order.status === "Dipesan"}
                    >
                      Dipesan
                    </option>
                    <option
                      value="Diterima"
                      selected={order.status === "Diterima"}
                    >
                      Diterima
                    </option>
                    <option
                      value="Diproses"
                      selected={order.status === "Diproses"}
                    >
                      Diproses
                    </option>
                    <option
                      value="Selesai"
                      selected={order.status === "Selesai"}
                    >
                      Selesai
                    </option>
                    <option
                      value="Batal"
                      selected={order.status === "Batal"}
                    >
                      Batal
                    </option>
                  </select>
                </li>
              </ul>
            </div>
          </div>
          <div className="btn-box text-center">
            <button className="btn-primary">Update</button>
            <Link onClick={() => deleteHandler()} className="btn-delete">
              Hapus
            </Link>
          </div>
        </form>
      </section>
    </>
  );
};

export default SingleOrder;
