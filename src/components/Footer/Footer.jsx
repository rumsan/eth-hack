import React from "react";

import { Container, Row, Col, ListGroup, ListGroupItem } from "reactstrap";
import "./footer.css";

import { Link } from "react-router-dom";

const Navigation = [
  {
    display: "Home",
    url: "/",
  },
  {
    display: "Market",
    url: "/market",
  },
  {
    display: "Create",
    url: "/create",
  },

];

const RESOURCES = [
  {
    display: "Raktim",
    url: "https://www.linkedin.com/in/raktim-shrestha-63a780109/?originalSubdomain=np"
  },
  {
    display: "Anupama",
    url: "https://www.linkedin.com/in/anupama-koirala/",
  },
  {
    display: "Sailendra",
    url: "https://www.linkedin.com/in/sailendra-maharjan-b1773811a/",
  },
  {
    display: "Uttam",
    url: "https://www.linkedin.com/in/uttam-raj-giri-885536253/",
  },
];



const Footer = () => {
  return (
    <footer className="footer">
      <Container>
        <Row>
          <Col lg="4" md="6" sm="6" className="mb-4">
            <div className="logo">
              <h2 className=" d-flex gap-2 align-items-center ">
                <span>
                  <i className="ri-fire-fill"></i>
                </span>
                Ease NFTs
              </h2>
              <p>
               Ease NFTs, a marketplace where you can <strong>create, buy & sell</strong> NFTs with ease.
              </p>
            </div>
          </Col>

          <Col lg="2" md="3" sm="6" className="mb-4">
            <h5>Navigation</h5>
            <ListGroup className="list__group">
              {Navigation.map((item, index) => (
                <ListGroupItem key={index} className="list__item">
                  <Link to={item.url}> {item.display} </Link>
                </ListGroupItem>
              ))}
            </ListGroup>
          </Col>

          <Col lg="2" md="3" sm="6" className="mb-4">
            <h5>Our Team</h5>
            <ListGroup className="list__group">
              {RESOURCES.map((item, index) => (
                <ListGroupItem key={index} className="list__item">
                  <a href={item.url} target="_blank"> {item.display} </a>
                </ListGroupItem>
              ))}
            </ListGroup>
          </Col>

        
          <Col lg="4" md="6" sm="6" className="mb-4">
            <h5>Contact Us</h5>
            <ListGroup className="list__group">
                <ListGroupItem  className="list__item">
                  <span style={{color:'white'}}><i className="ri-home-4-fill"></i> 24 Parkview Road Randolph,
NJ 07869 USA</span>
                </ListGroupItem>
                <ListGroupItem  className="list__item">
                  <span style={{color:'white'}}><i className="ri-phone-line"></i>  +1 212 729 5703

</span>
                </ListGroupItem>
                <ListGroupItem  className="list__item">
                  <a style={{color:'white'}} href="mailto:team@rumsan.com" ><i className="ri-mail-line"></i> team@rumsan.com</a>
                </ListGroupItem>
            </ListGroup>
          </Col>

          <Col lg="12" className=" mt-4 text-center">
            <p className="copyright">
              Copyrights 2022 Developed by Rumsan Nepal. <a href="https://www.rumsan.com" style={{color:'white',textDecoration:'rgba(255, 255, 255, 0.772)'}}><strong>@rumsan</strong></a>. All Rights
              Reserved.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
