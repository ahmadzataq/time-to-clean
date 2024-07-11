import React from "react";
import { Link } from "react-router-dom";

import { Col, Container, Row } from "reactstrap";

const Footer = () => {
  return (
    <footer id="Footer">
      <Container>
        <Row className="py-3">
          <Col md={6} className="py-3">
            <h4 className="text-title">Pelayanan Cuci Sepatu Time To Clean</h4>
            <p className="text-white">Email: zahidtaqiyuddinahmad@gmail.com</p>
            <p className="text-white">Phone: 081584594961 (whatsapp)</p>
          </Col>
          <Col md={3} className="py-3">
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li className="py-2">
                <Link></Link>
                <a href="https://wa.link/l4f4vv">Hubungi Kami</a>
              </li>
            </ul>
          </Col>
          <Col md={3} className="py-3">
            <h5>Follow Us On</h5>
            <ul className="list-unstyled social-icons">              
              <li className="mx-2">
                <a href="https://www.instagram.com/timetocleannn">
                  <i className="fab fa-instagram insta"></i>
                </a>
              </li>
            </ul>
          </Col>
        </Row>
        <div className="footer-bottom d-flex justify-content-center">
          <p className="text-secondary">
            Copyright &copy;Developed by{" "}
            <a
              href="https://www.linkedin.com/in/ahmadzahidtaq/"
              target="_blank"
              rel="noreferrer"
            >
              Ahmad Zahid
            </a>
          </p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
