import React from "react";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div>
      <div className="error-page text-center">
        <p>404 Error!</p>
        <h1>Halaman Tidak Ditemukan</h1>
        <br />
        <Link to="/" className="btn-primary">
          Kembali ke Dasbor
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
