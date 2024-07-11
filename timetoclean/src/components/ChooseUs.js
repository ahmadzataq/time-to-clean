import {
  faLeaf,
  faLiraSign,
  faMedal,
  faMoneyBillAlt,
  faSoap,
  faTruck,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardText,
  CardTitle,
  Col,
  Container,
  Row,
} from "reactstrap";

const details = [
  {
    src: <FontAwesomeIcon icon={faTruck} />,
    name: "Pengiriman Gratis ",
    title:
      "Gratis pengiriman hasil cuci sepatu untuk daerah Depok dan sekitarnya. ",
  },
  {
    src: <FontAwesomeIcon icon={faSoap} />,
    name: "Higienis",
    title:
      "Sepatu dicuci secara higienis sehingga bebas kuman, bersih dan wangi.",
  },
  {
    src: <FontAwesomeIcon icon={faLiraSign} />,
    name: "Terjangkau",
    title:
      "Tanpa Biaya Tambahan, cukup membayar sama dengan harga yang ditetapkan oleh Time To Clean.",
  },
  {
    src: <FontAwesomeIcon icon={faLeaf} />,
    name: "Ramah Lingkungan",
    title:
      "Detail pencucian sepatu kami yang andal untuk hasil yang cepat, akurat, dan berkualitas tinggi.",
  },
  {
    src: <FontAwesomeIcon icon={faMedal} />,
    name: "Jaminan Kualitas",
    title:
      "Profesional dalam bisnis jasa cuci sepatu, kami selalu mengikuti perkembangan teknologi terkini.",
  },
  {
    src: <FontAwesomeIcon icon={faMoneyBillAlt} />,
    name: "Transparansi Harga",
    title:
      "Penyajian biaya secara jelas tanpa ada biaya tersembunyi, memastikan transparansi dan kejelasan bagi pelanggan.",
  },
];

const ChooseUs = () => {
  return (
    <section className="mb-3 mt-5" id="ChooseUs">
      <Container>
        <div className="d-flex justify-content-center mt-5">
          <h2 className="text-title head-title ">Kenapa Pilih Kami?</h2>
        </div>
        <Row>
          {details.map((item) => (
            <Col
              md={4}
              className="d-flex justify-content-center mt-4"
              key={item.name}
            >
              <Card className="card my-3" style={{ width: "20rem" }}>
                <CardHeader className="text-center mt-2 text-danger ch">
                  <span className="icon-size">{item.src}</span>
                </CardHeader>
                <CardBody>
                  <CardTitle tag="h4">{item.name}</CardTitle>
                  <CardText className="text-secondary">{item.title}</CardText>
                </CardBody>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default ChooseUs;
