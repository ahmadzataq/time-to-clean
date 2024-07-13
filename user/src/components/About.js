import React from "react";
import { Col, Container, Row } from "reactstrap";
const About = () => {
  return (
    <section id="about-us">
      <Container>
        <div className="d-flex justify-content-center mb-4">
          <h2 className="text-title head-title mt-5">Tentang Kami</h2>
        </div>
        <Row className="mt-5">
          <Col md={6} className="d-flex justify-content-center">
            {/* <h2 className="mx-4 my-4 ab">TIMETOCLEAN</h2> */}
            <img src={"default/about.jpg"} alt="" />
          </Col>
          <Col md={6}>
            <p className="text-justify mb-5">
              Time To Clean adalah Pelayanan Jasa Cuci Sepatu. Layanan kami 
              menggabungkan keahlian dan pengalaman yang kami peroleh selama 
              periode waktu tertentu untuk memberikan layanan pencucian sepatu 
              anda agar bersih dalam waktu penyelesaian sesingkat mungkin. 
              Time To Clean memberikan Anda Penjemputan dan Pengiriman gratis
              pada sepatu kotormu untuk daerah Depok dan sekitarnya. 
              Dengan Situs Web dan Nomor Telepon Kami, Anda tinggal menjadwalkan pemesanan 
              dan kami akan mengambilnya dari rumah anda!
            </p>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default About;
