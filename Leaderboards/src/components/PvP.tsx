import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import * as c from "../Constants";
import PvPEntry from "./PvPEntry";

function PvP({ type }: any) {
  var resultsPerPageRef = React.createRef<any>(),
    timeRangeRef = React.createRef<any>();

  const [resultsPerPage, setResultsPerPage] = useState(15);
  const [timeRanges, setTimeRanges] = useState(Object);
  const [timeRange, setTimeRange] = useState(0);
  const [entries, setEntries] = useState([] as Object[]);
  const [searched, setSearched] = useState(0);
  const [page, setPage] = useState(0);
  const [usedNextOrPrev, setUsedNextOrPrev] = useState(false);
  const [nextLoad, setNextLoad] = useState(0);

  const handleSearch = async () => {
    let response = await fetch(
      `${process.env.REACT_APP_SRL_BE_ROOT_URL}/api/leaderboards/pvp-count/${type}/${timeRange}`
    );
    let json = await response.json();
    setSearched(parseInt(json.count));

    response = await fetch(
      `${process.env.REACT_APP_SRL_BE_ROOT_URL}/api/leaderboards/pvp/${type}/${timeRange}/${page}/${resultsPerPage}`
    );
    json = await response.json();
    for (let i = 0; i < json.length; i++) {
      let data = json[i];
      addEntry(data);
    }
    setUsedNextOrPrev(false);
  };

  useEffect(() => {
    (async () => {
      if (page < 1) {
        let response = await fetch(
          `${process.env.REACT_APP_SRL_BE_ROOT_URL}/api/ranges`
        );
        let json = await response.json();
        setTimeRanges(json);
        response = await fetch(
          `${process.env.REACT_APP_SRL_BE_ROOT_URL}/api/next-load`
        );
        json = await response.json();
        setNextLoad(parseInt(json.in));
        setPage((page) => page + 1);
      } else {
        await handleSearch();
      }
    })();
  }, [page]);

  const addEntry = (data: any) => {
    setEntries((entries) => [...entries, <PvPEntry type={type} data={data} />]);
  };

  const resetEntries = () => {
    setEntries([]);
  };

  const handleNext = () => {
    if (usedNextOrPrev === false) {
      let next = page + 1;
      if (next <= Math.ceil(searched / resultsPerPage)) {
        setUsedNextOrPrev(true);
        resetEntries();
        setPage((page) => page + 1);
      }
    }
  };

  const handlePrevious = () => {
    if (usedNextOrPrev === false) {
      if (page > 1) {
        setUsedNextOrPrev(true);
        resetEntries();
        setPage((page) => page - 1);
      }
    }
  };

  const handleNew = () => {
    resetEntries();
    setResultsPerPage(resultsPerPageRef.current.value);
    setTimeRange(timeRangeRef.current.value);
    setPage(0);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-12">
          <Form>
            <Form.Group>
              <Form.Row>
                <Form.Label>Results per page:</Form.Label>
                <Form.Control
                  as="select"
                  ref={resultsPerPageRef}
                  defaultValue={resultsPerPage}
                >
                  {Object.keys(c.searchResults).map((key) => (
                    <option
                      key={c.searchResults[key as any].value}
                      value={c.searchResults[key as any].value}
                    >
                      {c.searchResults[key as any].name}
                    </option>
                  ))}
                </Form.Control>
              </Form.Row>
              <Form.Row>
                <Form.Label>Time range:</Form.Label>
                <Form.Control
                  as="select"
                  ref={timeRangeRef}
                  defaultValue={timeRange}
                >
                  {Object.keys(timeRanges).map((key) => (
                    <option
                      key={timeRanges[key as any].value}
                      value={timeRanges[key as any].value}
                    >
                      {timeRanges[key as any].name}
                    </option>
                  ))}
                </Form.Control>
              </Form.Row>
              <Form.Row>
                <Form.Label>Action:</Form.Label>
                <Button variant="secondary" block onClick={handleNew}>
                  Search
                </Button>
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
                <th>Refresh</th>
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
                <td>In about {Math.ceil(nextLoad / 3600 / 1000)}h</td>
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
                {type === "1v1" ? <th>Player</th> : <th>Players</th>}
                <th>Rating</th>
                <th>ELO</th>
                <th>Activity</th>
                {type === "1v1" ? <th>Matches</th> : undefined}
                <th>Wins</th>
                <th>Losses</th>
              </tr>
            </thead>
            <tbody>{entries}</tbody>
          </Table>
        </div>
      </div>
    </div>
  );
}

export default PvP;
