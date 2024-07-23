import { React } from "react";
import { Link } from "react-router-dom";
// import Swal from "sweetalert2";
import {
  Button,
  Card,
  CardBody,
  CardImg,
  CardText,
  CardTitle,
  Col,
  Container,
  Row,
} from "reactstrap";

const services = [
  {
    src: require("../images/wash-iron.jpeg"),
    name: "Deep Clean",
    title:
      "Pembersihan mendalam pada seluruh bagian sepatu, termasuk bagian luar, dalam, dan sol.",
    link: "/deepclean",
  },
  {
    src: require("../images/wash-fold.jpg"),
    name: "Soft Clean",
    title:
      "Pembersihan yang lebih ringan dan tidak seintensif deep clean, ideal untuk sepatu yang tidak terlalu kotor.",
    link: "/softclean",
  },
  {
    src: require("../images/iron-fold.jpg"),
    name: "Unyellowing",
    title:
      "Menghilangkan noda atau perubahan warna pada bagian outsole yang menguning.",
    link: "/unyellowing",
  }
];

const Services = () => {
  return (
    <>
      <section className="pb-5" id="services">
        <Container>
          <div className="d-flex justify-content-center py-3 mt-5">
            <h2 className="text-title head-title">Pelayanan Kami</h2>
          </div>
          <Row>
            {services.map((service) => (
              <Col
                md={4}
                className="d-flex justify-content-center mt-4"
                key={service.src}
              >
                <Card style={{ width: "20rem" }}>
                  <CardImg className="service-image" src={service.src} top />
                  <CardBody>
                    <CardTitle tag="h3" className="text-danger">
                      {service.name}
                    </CardTitle>
                    <CardText>{service.title}</CardText>

                    <Link to={service.link}>
                      <Button color="primary" className="service-button">
                        <i className="now-ui-icons arrows-1_minimal-right" />
                        <span className="nav-name">Pilih Layanan</span>
                      </Button>
                    </Link>
                  </CardBody>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>
    </>
  );
};
export default Services;
