import React from "react";

import "./error-page.css";

import { Container } from "reactstrap";

const Error = () => {
  return (
    <section className="error__section">
      <Container className="text-center">
        <h2>
        Error 404 : page not found
        </h2>
      </Container>
    </section>
  );
};

export default Error;
