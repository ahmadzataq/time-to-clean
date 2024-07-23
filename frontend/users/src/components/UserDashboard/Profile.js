import React, { useEffect, useState } from "react";
import "./dashboard.css";
import userImage from "../../images/user.png";
import { Link } from "react-router-dom";
import axios from "axios";

const Profile = () => {
  // GET CUSTOMER DETAILS
  const id = localStorage.getItem("cID");
  const [customer, setCustomer] = useState({});
  useEffect(() => {
    const fatchCustomer = async () => {
      const { data } = await axios.get(`https://time-to-clean-api.vercel.app/customers/${id}`);
      setCustomer(data);
    };
    fatchCustomer();
  }, [id]);

  return (
    <>
      <div className="user-profile">
        {!customer.thumb ? (
          <img src={userImage} alt="" />
        ) : (
          <img src={"/customers/" + customer.thumb} alt="" />
        )}
        <div className="user-details">
          <p>
            <i className="fa fa-fw fa-user"></i> {customer.name}
          </p>
          <p>
            <i className="fa fa-fw fa-phone"></i> {customer.phone}
          </p>
          <p>
            <i className="fa fa-fw fa-envelope"></i> {customer.email}
          </p>
          <p>
            <i className="fa fa-fw fa-location-dot"></i> {customer.address}
          </p>
          <Link to="/customer/settings">Setting</Link>{" "}
        </div>
      </div>
    </>
  );
};

export default Profile;
