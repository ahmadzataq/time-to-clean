import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Title from "../common/title/Title";
import "./customer.css";
import axios from "axios";
import Swal from "sweetalert2";

const Customer = () => {
  // GET CUSTOMERS
  const [customers, setCustomers] = useState([]);
  useEffect(() => {
    const fatchCustomers = async () => {
      const { data } = await axios.get("https://time-to-clean-api.vercel.app/customers"
      );
      setCustomers(data);
    };
    fatchCustomers();
  }, [customers]);

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
      <section className="customer content">
        <Title title="Pelanggan" />
        <div className="customer-items">
          <table>
            <tr>
              <th>Nama</th>
              <th>Email</th>
              <th>Telepon</th>
              <th>Alamat</th>
              <th>Action</th>
            </tr>
            {customers.length === 0 ? (
              <tr>
                <td className="text-center" colSpan="9">
                Kosong!
                </td>
              </tr>
            ) : (
              customers.map((item) => (
                <tr>
                  <td>
                    <Link to={"/customers/" + item._id}>{item.name}</Link>
                  </td>
                  <td>{item.email}</td>
                  <td>{item.phone}</td>
                  <td>{item.address}</td>
                  <td>
                    <Link to={"/customers/" + item._id} className="btn-success">
                      <i class="ri-eye-fill"></i>
                    </Link>{" "}
                    <Link
                      onClick={() => deleteHandler(item._id, item.thumb)}
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

export default Customer;
