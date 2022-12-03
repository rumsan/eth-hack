import React from "react";

import Error from "../components/ui/ErrorPage/Error-page";
import CommonSection from '../components/ui/Common-section/CommonSection'

const ErrorPg = () => {
  return (
    <>
      <CommonSection title="404 Error"/>
      <Error />
    </>
  );
};

export default ErrorPg;
