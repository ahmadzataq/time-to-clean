import React from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Carousel,
  CarouselIndicators,
  CarouselItem,
  Col,
  Container,
  Row,
} from "reactstrap";

const items = [
  {
    src: require("../images/undraw_Online_shopping_re_k1sv.jpg"),
  },
  {
    src: require("../images/undraw_add_to_cart_vkjp.jpg"),
  },
  {
    src: require("../images/undraw_web_shopping_dd4l.jpg"),
  },
  {
    src: require("../images/undraw_On_the_way_re_swjt.jpg"),
  },
  {
    src: require("../images/undraw_window_shopping_b96y.jpg"),
  },
  {
    src: require("../images/undraw_takeout_boxes_ap54.jpg"),
  },
  {
    src: require("../images/undraw_meet_the_team_e5b7.jpg"),
  },
];

const Homeslideshow = () => {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [animating, setAnimating] = React.useState(false);

  const onExiting = () => {
    setAnimating(true);
  };
  const onExited = () => {
    setAnimating(false);
  };
  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };
  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  };
  const goToIndex = (newIndex) => {
    if (animating) return;
    setActiveIndex(newIndex);
  };

  return (
    <section id="Homeslideshow" className="mt-5">
      <Container>
        <Row>
          <Col md={7} className="mt-5">
            <h2>
              It's <span className="text-title"> Time To Clean !!! </span>{" "}
              <br />
            </h2>
            <p className="text-justify my-3">
            Time To Clean adalah Pelayanan Jasa Cuci Sepatu. Layanan kami menggabungkan keahlian 
            dan pengalaman yang kami peroleh selama periode waktu tertentu untuk memberikan 
            layanan pencucian sepatu anda agar bersih dalam waktu penyelesaian sesingkat mungkin.
            </p>
            <Link to="/services">
              <Button className="nav-name my-4" color="primary">
                Lihat Layanan
              </Button>
            </Link>
          </Col>

          <Col md={5}>
            <Carousel activeIndex={activeIndex} next={next} previous={previous}>
              <CarouselIndicators
                items={items}
                activeIndex={activeIndex}
                onClickHandler={goToIndex}
              />
              {items.map((item) => {
                return (
                  <CarouselItem
                    onExiting={onExiting}
                    onExited={onExited}
                    key={item.src}
                  >
                    <img
                      src={item.src}
                      alt={item.altText}
                      height="300px"
                      width="400px"
                      className="p-5"
                    />
                  </CarouselItem>
                );
              })}

              <a
                className="carousel-control-prev"
                data-slide="prev"
                onClick={(e) => {
                  e.preventDefault();
                  previous();
                }}
                role="button"
                href="/"
              >
                <i className="now-ui-icons arrows-1_minimal-left" />
              </a>
              <a
                className="carousel-control-next"
                data-slide="next"
                onClick={(e) => {
                  e.preventDefault();
                  next();
                }}
                role="button"
                href="/"
              >
                <i className="now-ui-icons arrows-1_minimal-right" />
              </a>
            </Carousel>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Homeslideshow;
