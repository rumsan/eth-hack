import React from "react";
import { Container, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import "./hero-section.css";

import heroImg from "../../assets/images/hero.jpg";
import defaultImage from '../../assets/images/img-01.jpg'

const HeroSection = () => {
  return (
    <section className="hero__section">
      <Container>
        <Row>
          <Col lg="6" md="6">
            <div className="hero__content">
              <h2>
                Discover rare digital art and collect
                sell extraordinary<span>Ease NFTs</span>
              </h2>
            

              <div className="hero__btns d-flex align-items-center gap-4">
              <Link to="/market" className="btn-link">
                <button className=" explore__btn btn-text d-flex align-items-center gap-2">
                  <i className="ri-rocket-line"></i>
                  Explore
                </button></Link>
                <Link to="/create" className="btn-link"><button className="btn-text create__btn d-flex align-items-center gap-2">
                  <i className="ri-ball-pen-line"></i>
                  Create
                </button></Link>
              </div>
            </div>
          </Col>

          <Col lg="6" md="6">
            <div className="hero__img">
              <img src={heroImg} alt="" onError={({ currentTarget }) => {
    currentTarget.onerror = null;
    currentTarget.src=defaultImage;
  }} className="w-100" />
            </div>  
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default HeroSection;
