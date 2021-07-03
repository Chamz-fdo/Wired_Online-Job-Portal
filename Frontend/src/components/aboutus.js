import React from "react";
import pasidalee from "../pasidalee.jpeg";
import chamathsara from "../chamathsara.jpeg";
import charithma from "../charithma.jpeg";
import uvini from "../Uvini.jpeg";
import ashen from "../ashen.jpeg";
import logo from "../logo.png";
import { Container, Row, Col } from "react-bootstrap";
import "./aboutus.css";

function AboutUs() {
  return (
    <div className="container">
      <div>
        <h2>About Us</h2>

        <p className="description">
          We are a leading digital recruitment agency connecting the best talent
          with the corporate world.
        </p>
      </div>
      <hr />

      <div className="team">
        <h3>Our Team</h3>

        <Container>
          <Row>
            <Col className="image">
              <img src={ashen} alt="Ashen" />
              <p className="name">Ashen</p>
            </Col>
            <Col className="image">
              <img src={pasidalee} alt="Pasidalee" />
              <p className="name">Pasidalee</p>
            </Col>
            <Col className="image">
              <img src={chamathsara} alt="Chamathsara" />
              <p className="name">Chamathsara</p>
            </Col>
            <Col className="image">
              <img src={charithma} alt="Charithma" />
              <p className="name">Charithma</p>
            </Col>
            <Col className="image">
              <img src={uvini} alt="Uvini" />
              <p className="name">Uvini</p>
            </Col>
          </Row>
        </Container>
      </div>
      <hr />
      <br />
      <p className="description2" style={{ textAlign: "center" }}>
        Looking for new job or need candidates for your company? then reach out
        to
      </p>
      <div className="logo">
        <img className="wiredlogo" src={logo} alt="logo" />

        <p style={{ textAlign: "center" }}>
          "Bridging aspiring candidates with aspiring companies"
        </p>
      </div>
    </div>
  );
}

export default AboutUs;
