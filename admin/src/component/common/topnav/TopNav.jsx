import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./topnav.css";

const TopNav = () => {
  const id = localStorage.getItem("aID");
  const [admin, setAdmin] = useState({});

  useEffect(() => {
    const fetchAdmin = async () => {
      if (id) {
        try {
          const { data } = await axios.get(`http://103.17.248.249:3000/api/admin/users/${id}`);
          setAdmin(data);
        } catch (error) {
          console.error("Error fetching admin data:", error);
        }
      } else {
        console.error("Admin ID is not found in localStorage");
      }
    };

    fetchAdmin();
  }, [id]);

  const logout = () => {
    localStorage.removeItem("aToken");
    localStorage.removeItem("aID");
    window.location.href = "http://103.17.248.249:3001";
  };

  return (
    <>
      <section className="top-nav">
        <div className="top-nav-wrapper">
          <div className="top-nav-right">
            <ul>
              <li>
                <Link to="/" title="Home">
                  <i className="ri-home-4-line"></i>
                </Link>
              </li>
              <li>
                <Link
                  onClick={() => {
                    logout();
                  }}
                  title="Logout"
                >
                  <i className="ri-logout-circle-r-line"></i>
                </Link>
              </li>
            </ul>

            <div className="topnav-profile-img">
              <Link to="profile" title="Profile">
                <span className="badge">{admin.username}</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default TopNav;
