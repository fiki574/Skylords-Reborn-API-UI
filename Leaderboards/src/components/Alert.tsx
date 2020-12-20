import React, { useState } from "react";
import BAlert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";

function Alert() {
  const [show, setShow] = useState(true);
  return (
    <BAlert show={show} variant="warning">
      <BAlert.Heading>Backend is currently caching new data</BAlert.Heading>
      <p>
        It may take up to 10 minutes for new data to be cached and available.
      </p>
      <hr />
      <div className="d-flex justify-content-end">
        <Button onClick={() => setShow(false)} variant="outline-danger">
          OK
        </Button>
      </div>
    </BAlert>
  );
}

export default Alert;
