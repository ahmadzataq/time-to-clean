import React, { useState } from "react";
import "./login.css";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    let data = {
      email,
      password,
    };
    axios
      .post("http://103.17.248.249:3000/api/admin/adminlogin", data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        if (response.data.message === "Email tidak terdaftar.") {
          setMessage(response.data.message);
        } else if (response.data.message === "Password doesn't match.") {
          setMessage(response.data.message);
        } else {
          // Set token
          localStorage.setItem("aToken", response.data.token);
          localStorage.setItem("aID", response.data.id);
          window.location.href = "/dashboard";
        }
      })
      .catch((error) => {
        setMessage("Something went wrong.");
      });
  };

  if (localStorage.getItem("aToken")) {
    window.location.href = "/dashboard";
    return null;
  }

  return (
    <>
      <section className="login">
        <div className="login-form text-center">
          <form onSubmit={submitHandler}>
            <p style={{ color: "red" }}>{message && message}</p>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email..."
              required
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password..."
              required
            />
            <input
              type="submit"
              name="submit"
              value="Login"
              className="btn-primary"
            />
          </form>
        </div>
      </section>
    </>
  );
};

export default Login;
