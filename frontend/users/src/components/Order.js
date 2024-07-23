import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import { Col, Container, FormGroup, Input, Label, Row } from "reactstrap";
import { useCart } from "react-use-cart";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import axios from "axios";

const Order = () => {
  // ADD TO CART
  const {
    isEmpty,
    cartTotal,
    totalItems,
    items,
    totalUniqueItems,
    updateItemQuantity,
    removeItem,
    emptyCart,
  } = useCart();
  const claerCart = () => {
    Swal.fire({
      text: "Apakah anda yakin?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Delete",
    }).then((result) => {
      if (result.isConfirmed) {
        emptyCart();
      }
    });
  };

  // PLACE ORDER
  const customer_id = localStorage.getItem("cID");
  const customer_name = localStorage.getItem("cName");
  const [picupDate, setPicupDate] = useState("");
  const [picupTime, setPicupTime] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [payment, setPayment] = useState("");

  const id = localStorage.getItem("cID");
  useEffect(() => {
    const fatchCustomer = async () => {
      const { data } = await axios.get(`https://time-to-clean-api.vercel.app/customers/${id}`);
      setName(data.name);
      setEmail(data.email);
      setPhone(data.phone);
      setAddress(data.address);
    };
    fatchCustomer();
  }, [id]);

  console.log(picupDate + "," + picupTime);

  const submitHandler = (e) => {
    e.preventDefault();
    if (!isEmpty) {
      if (customer_id) {
        let data = {
          customer_id,
          customer_name,
          items,
          picupTime: picupDate + "," + picupTime,
          email,
          phone,
          name,
          address: address,
          payment,
          totalItems: totalUniqueItems,
          total_quantity: totalItems,
          total_price: cartTotal,
        };
        axios
          .post(`https://time-to-clean-api.vercel.app/orders`, data, {
            headers: {
              "Content-Type": "application/json",
            },
          })
          .then((response) => {
            Swal.fire({
              icon: "success",
              text: response.data.message,
              showConfirmButton: false,
              timer: 500,
            });
            emptyCart();
            window.location.href = "/customer";
          })
          .catch((error) => {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Terjadi kesalahan.",
            });
          });
      } else {
        window.location.href = "/login";
      }
    } else {
      Swal.fire({
        icon: "error",
        text: "Mohon pilih layanan apa saja.",
      });
    }
  };

  return (
    <section>
      <Container>
        <div className="row justify-content-between py-3 mt-5 confirm-order">
          <div className="col-md-8">
            <h2 className="text-title head-title">Konfirmasi Pesanan</h2>
          </div>
        </div>
        <Row>
          <Col md={7}>
            <h4 className="px-2 mb-3 text-title">Detail Pesanan</h4>
            <hr />

            <div className="address-details px-2 mb-3">
              <form className="py-2" onSubmit={submitHandler}>
                <div className="px-2 mb-3">
                  <h5>Jadwal</h5>
                </div>

                <TextField
                  name="getDate"
                  id="date"
                  label="Tanggal Pengambilan"
                  type="date"
                  className="px-2 mb-3"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={picupDate}
                  onChange={(e) => setPicupDate(e.target.value)}
                />

                <TextField
                  name="getTime"
                  id="time"
                  label="Jam"
                  type="time"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  inputProps={{
                    step: 300, // 5 min
                  }}
                  value={picupTime}
                  onChange={(e) => setPicupTime(e.target.value)}
                />

                <div>
                  <h5>Data Diri</h5>
                </div>

                <FormGroup>
                  <input
                    name="fullName"
                    className="form-control my-3"
                    placeholder="Nama Lengkap"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </FormGroup>

                <FormGroup>
                  <input
                    name="email"
                    className="form-control my-3"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </FormGroup>

                <FormGroup>
                  <input
                    name="phone"
                    type="phone"
                    className="form-control my-3"
                    placeholder="Nomor Telepon"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </FormGroup>

                <FormGroup>
                  <textarea
                    name="address"
                    placeholder="Alamat"
                    className="form-control my-3"
                    cols="30"
                    rows="2"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </FormGroup>

                <div className="mt-4 mb-3">
                  <h5>Metode Pembayaran</h5>
                  {/* <span className="from-text">
                    Expert will collect your payment after delivery your order
                  </span> */}
                </div>

                <FormGroup check className="form-check-radio " inline>
                  <Label check>
                    <Input
                      id="inlineRadio1"
                      name="payment"
                      type="radio"
                      value="Tunai"
                      onChange={(e) => setPayment(e.target.value)}
                      required
                    />
                    Tunai
                    <span className="form-check-sign " />
                  </Label>
                  <FormGroup
                    check
                    className="form-check-radio "
                    inline
                  ></FormGroup>
                  <Label check>
                    <Input
                      id="inlineRadio1"
                      name="payment"
                      type="radio"
                      value="E-Wallet"
                      onChange={(e) => setPayment(e.target.value)}
                      required
                    />
                    E-Wallet
                    <span className="form-check-sign" />
                  </Label>
                </FormGroup>

                <div className="form-group d-flex justify-content-center mt-4">
                  <button className="btn btn-primary " type="submit">
                    <i className="now-ui-icons ui-1_check" />
                    <span className="ml-2">Konfirmasi Pesanan</span>
                  </button>
                </div>
              </form>
            </div>
          </Col>
          <Col md={5} className="mb-5">
            <table className="cartTable">
              <tr>
                <th>Nama</th>
                <th>Harga</th>
                <th>Qty</th>
                <th>Total</th>
                <th>Action</th>
              </tr>
              {isEmpty ? (
                <tr>
                  <td colSpan="6">Keranjang Anda Kosong!</td>
                </tr>
              ) : (
                items.map((item) => (
                  <tr>
                    <td>{item.name.slice(0, 20)}...</td>
                    <td>Rp. {item.price}</td>
                    <td>
                      <button
                        className="btn-primary"
                        onClick={() =>
                          updateItemQuantity(item.id, item.quantity - 1)
                        }
                      >
                        -
                      </button>{" "}
                      <span className="item-qty">{item.quantity}</span>{" "}
                      <button
                        className="btn-primary"
                        onClick={() =>
                          updateItemQuantity(item.id, item.quantity + 1)
                        }
                      >
                        +
                      </button>
                    </td>
                    <td>Rp. {item.itemTotal}</td>
                    <td>
                      <Link
                        onClick={() => removeItem(item.id)}
                        className="btn-danger clear-one"
                      >
                        X
                      </Link>
                    </td>
                  </tr>
                ))
              )}
              {!isEmpty && (
                <>
                  <tr className="bold">
                    <td colSpan="2">Total</td>
                    <td>{totalItems}</td>
                    <td>Rp. {cartTotal}</td>
                    <td>
                      <Link
                        className="btn-danger clear-all"
                        onClick={() => claerCart()}
                      >
                        Clear All
                      </Link>
                    </td>
                  </tr>
                </>
              )}
            </table>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Order;
