import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { Link } from "react-router-dom";
import {
  Button,
  Col,
  Container,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Row,
} from "reactstrap";

import manDress from "../images/man.png";
import womanDress from "../images/woman.png";

import "./Services.css";
import Cart from "./Cart";
import { useCart } from "react-use-cart";
import Swal from "sweetalert2";

const WashAndFoldMan = [
  {
    id: "2101",
    ac: "d-block",
    dc: "d-none",
    name: "Kanvas",
    service: "Soft Clean",
    category: "Sepatu Pria",
    price: 35000,
    quantity: 1,
  },

  {
    id: "2102",
    ac: "d-block",
    dc: "d-none",
    name: "Kulit",
    service: "Soft Clean",
    category: "Sepatu Pria",
    price: 35000,
    quantity: 1,
  },

  {
    id: "2103",
    ac: "d-block",
    dc: "d-none",
    name: "Suede",
    category: "Sepatu Pria",
    service: "Soft Clean",
    price: 35000,
    quantity: 1,
  },

];

const WashAndFoldWoman = [
  {
    id: "2201",
    ac: "d-block",
    dc: "d-none",
    name: "Kanvas",
    category: "Sepatu Wanita",
    service: "Soft Clean",
    price: 30000,
    quantity: 1,
  },

  {
    id: "2202",
    ac: "d-block",
    dc: "d-none",
    name: "Kulit",
    category: "Sepatu Wanita",
    service: "Soft Clean",
    price: 30000,
    quantity: 1,
  },

  {
    id: "2203",
    ac: "d-block",
    dc: "d-none",
    name: "Suede",
    category: "Sepatu Wanita",
    service: "Soft Clean",
    price: 30000,
    quantity: 1,
  },

];

const SoftClean = () => {
  // ADD-TO-CART
  const { addItem } = useCart();
  const addItemHandlar = (item, id) => {
    item.id = id;
    addItem(item);
    Swal.fire({
      icon: "success",
      text: item.name + " Dimasukkan ke keranjang.",
      showConfirmButton: false,
      timer: 1000,
    });
  };

  return (
    <>
      <section id="WashAndFold" className="py-5">
        <Container>
          <div className="row justify-content-between py-3">
            <div className="col-md-8">
              <h2 className="text-title"> Soft Clean</h2>
            </div>
            <div className="col-md-4">
              <span className="mr-3">Ingin Memilih Layanan Lain ?</span>
              <Dropdown className="btn-group">
                <DropdownToggle
                  aria-expanded={false}
                  aria-haspopup={true}
                  caret
                  color="primary"
                  data-toggle="dropdown"
                  type="button"
                >
                  Pilih Layanan
                </DropdownToggle>
                <DropdownMenu>
                <Link to="/deepclean" className="s">
                    <DropdownItem className="sd">Deep Clean</DropdownItem>
                  </Link>
                  <Link to="/softclean" className="s">
                    <DropdownItem className="sd">Soft Clean</DropdownItem>
                  </Link>
                  <Link to="/unyellowing" className="s">
                    <DropdownItem className="sd">Unyellowing</DropdownItem>
                  </Link>
                </DropdownMenu>
              </Dropdown>
            </div>
          </div>
          <Row className="mb-4">
            <Col md={7} className="my-3">
              <div>
                <Accordion className="p-2">
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <img src={manDress} className="mr-3" alt="" />
                    <Typography>Sepatu Pria</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <List component="nav" aria-label="mailbox folders">
                      {WashAndFoldMan.map((item) => (
                        <div key={item.id}>
                          <Divider className="mb-3" />
                          <ListItem>
                            <h5 className="item-name">{item.name}</h5>
                            <ListItemText primary="" />
                          </ListItem>
                          <ListItem>
                            <Typography>
                              <span className="price">Rp. {item.price}</span> /
                              Pasang
                            </Typography>
                            <ListItemText secondary="" />
                            <div className={item.ac}>
                              <Button
                                className="btn-round"
                                color="primary"
                                onClick={() => {
                                  addItemHandlar(item, item.id);
                                }}
                              >
                                <i class="fa-solid fa-cart-shopping"></i> Tambah
                                
                              </Button>
                            </div>

                            <div className={item.dc}>
                              <div className="cart-controller">
                                {item.quantity > 1 ? (
                                  <button className="btnQ">-</button>
                                ) : (
                                  <button className="btnQ">-</button>
                                )}
                                <span className="quantity">
                                  {" "}
                                  {item.quantity}
                                </span>
                                <button className="btnQ">+</button>
                              </div>
                            </div>
                          </ListItem>
                        </div>
                      ))}
                    </List>
                  </AccordionDetails>
                </Accordion>
                <Accordion className="p-2">
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                  >
                    <img src={womanDress} className="mr-3" alt="" />
                    <Typography>Sepatu Wanita</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <List component="nav" aria-label="mailbox folders">
                      {WashAndFoldWoman.map((item) => (
                        <div key={item.id}>
                          <Divider className="mb-3" />
                          <ListItem>
                            <h5 className="item-name">{item.name}</h5>
                            <ListItemText primary="" />
                          </ListItem>
                          <ListItem>
                            <Typography>
                              <span className="price">Rp. {item.price}</span> /
                              Pasang
                            </Typography>
                            <ListItemText secondary="" />
                            <div className={item.ac}>
                              <Button
                                className="btn-round"
                                color="primary"
                                onClick={() => {
                                  addItemHandlar(item, item.id);
                                }}
                              >
                                <i class="fa-solid fa-cart-shopping"></i>Tambah
                                
                              </Button>
                            </div>

                            <div className={item.dc}>
                              <div className="cart-controller">
                                {item.quantity > 1 ? (
                                  <button className="btnQ">-</button>
                                ) : (
                                  <button className="btnQ">-</button>
                                )}
                                <span className="quantity">
                                  {" "}
                                  {item.quantity}
                                </span>
                                <button className="btnQ">+</button>
                              </div>
                            </div>
                          </ListItem>
                        </div>
                      ))}
                    </List>
                  </AccordionDetails>
                </Accordion>
              </div>
            </Col>
            <Col md={5}>
              <Cart />
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default SoftClean;
