import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Col } from "react-bootstrap";
import Auction from "./Auction";

function Auctions() {
  const searchResults = [
    { name: "10", value: 10 },
    { name: "15", value: 15 },
    { name: "20", value: 20 },
    { name: "25", value: 25 },
    { name: "30", value: 30 },
  ];

  var resultsPerPageRef = React.createRef<any>(),
    cardNameRef = React.createRef<any>(),
    minPriceRef = React.createRef<any>(),
    maxPriceRef = React.createRef<any>();

  const [auctions, setAuctions] = useState([] as Object[]);
  const [searched, setSearched] = useState(0);
  const [page, setPage] = useState(0);
  const [name, setName] = useState("");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000000);
  const [resultsPerPage, setResultsPerPage] = useState(15);
  const [usedNextOrPrev, setUsedNextOrPrev] = useState(false);

  useEffect(() => {
    (async () => {
      if (page < 1) {
        setPage((page) => page + 1);
      } else {
        await handleSearch();
      }
    })();
  }, [page]);

  const addAuction = (data: any) => {
    setAuctions((auctions) => [...auctions, <Auction data={data} />]);
  };

  const resetAuctions = () => {
    setAuctions([]);
  };

  const handleNext = () => {
    if (usedNextOrPrev === false) {
      let next = page + 1;
      if (next <= Math.ceil(searched / resultsPerPage)) {
        setUsedNextOrPrev(true);
        resetAuctions();
        setPage((page) => page + 1);
      }
    }
  };

  const handlePrevious = () => {
    if (usedNextOrPrev === false) {
      if (page > 1) {
        setUsedNextOrPrev(true);
        resetAuctions();
        setPage((page) => page - 1);
      }
    }
  };

  const handleNew = () => {
    resetAuctions();
    setName(cardNameRef.current.value);
    setMinPrice(minPriceRef.current.value);
    setMaxPrice(maxPriceRef.current.value);
    setResultsPerPage(resultsPerPageRef.current.value);
    setPage(0);
  };

  const handleSearch = async () => {
    let response = await fetch(
      `${process.env.REACT_APP_SRA_BE_ROOT_URL}/api/auctions/count?cardName=${name}&minBfpPrice=${minPrice}&maxBfpPrice=${maxPrice}`
    );

    let json = await response.json();
    setSearched(parseInt(json.count));

    response = await fetch(
      `${process.env.REACT_APP_SRA_BE_ROOT_URL}/api/auctions?cardName=${name}&minBfpPrice=${minPrice}&maxBfpPrice=${maxPrice}&page=${page}&number=${resultsPerPage}`
    );

    json = await response.json();
    for (let i = 0; i < json.length; i++) {
      let data = json[i];
      addAuction(data);
    }

    setUsedNextOrPrev(false);
  };

  const handleExport = async () => {
    let response = await fetch(
      `${process.env.REACT_APP_SRA_BE_ROOT_URL}/api/auctions/export`
    );
    let csvText = await response.text();
    const element = document.createElement("a");
    const file = new Blob([csvText], {
      type: "text/csv",
    });
    element.href = URL.createObjectURL(file);
    element.download = `sr-auctions-export.csv`;
    document.body.appendChild(element);
    element.click();
    element.remove();
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-12">
          <Form>
            <Form.Group>
              <Form.Row>
                <Col>
                  <Form.Label>Card name:</Form.Label>
                  <Form.Control as="input" ref={cardNameRef} />
                </Col>
              </Form.Row>
              <Form.Row>
                <Col>
                  <Form.Label>Min. price:</Form.Label>
                  <Form.Control
                    as="input"
                    ref={minPriceRef}
                    defaultValue={minPrice}
                  />
                </Col>
                <Col>
                  <Form.Label>Max. price:</Form.Label>
                  <Form.Control
                    as="input"
                    ref={maxPriceRef}
                    defaultValue={maxPrice}
                  />
                </Col>
                <Col>
                  <Form.Label>Results per page:</Form.Label>
                  <Form.Control
                    as="select"
                    ref={resultsPerPageRef}
                    defaultValue={resultsPerPage}
                  >
                    {Object.keys(searchResults).map((key) => (
                      <option
                        key={searchResults[key as any].value}
                        value={searchResults[key as any].value}
                      >
                        {searchResults[key as any].name}
                      </option>
                    ))}
                  </Form.Control>
                </Col>
              </Form.Row>
              <Form.Row>
                <Col>
                  <Form.Label>Action:</Form.Label>
                </Col>
              </Form.Row>
              <Form.Row>
                <Col>
                  <Button variant="secondary" block onClick={handleNew}>
                    Search
                  </Button>
                </Col>
                <Col>
                  <Button variant="secondary" block onClick={handleExport}>
                    Export
                  </Button>
                </Col>
              </Form.Row>
            </Form.Group>
          </Form>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-12">
          <Table striped bordered hover variant="dark" responsive>
            <thead>
              <tr>
                <th>Searched</th>
                <th>Page</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{searched}</td>
                <td>
                  <span>
                    {searched > 0
                      ? page + " / " + Math.ceil(searched / resultsPerPage)
                      : "0 / 0"}
                  </span>{" "}
                  <Button variant="secondary" onClick={handlePrevious}>
                    {" < "}
                  </Button>{" "}
                  <Button variant="secondary" onClick={handleNext}>
                    {" > "}
                  </Button>
                </td>
              </tr>
            </tbody>
          </Table>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-12">
          <Table striped bordered hover variant="dark" responsive>
            <thead>
              <tr>
                <th>Card</th>
                <th>Start</th>
                <th>Bid</th>
                <th>Buyout</th>
                <th>End</th>
              </tr>
            </thead>
            <tbody>{auctions}</tbody>
          </Table>
        </div>
      </div>
    </div>
  );
}

export default Auctions;
