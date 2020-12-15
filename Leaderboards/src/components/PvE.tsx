import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import * as c from "../Constants";
import PvEEntry from "./PvEEntry";

function PvE({ type }: any) {
  var playerCounts = [] as Object[],
    defMap = 0;
  if (type === 1) {
    playerCounts.push({ name: "1", value: 1 });
    defMap = 67;
  } else if (type === 2) {
    playerCounts.push({ name: "1", value: 1 });
    playerCounts.push({ name: "2", value: 2 });
    defMap = 9;
  } else if (type === 4) {
    playerCounts.push({ name: "1", value: 1 });
    playerCounts.push({ name: "2", value: 2 });
    playerCounts.push({ name: "3", value: 3 });
    playerCounts.push({ name: "4", value: 4 });
    defMap = 10;
  } else if (type === 12) {
    playerCounts.push({ name: "12", value: 12 });
    defMap = 37;
  }

  var resultsPerPageRef = React.createRef<any>(),
    timeRangeRef = React.createRef<any>(),
    mapRef = React.createRef<any>(),
    playerCountRef = React.createRef<any>();

  const [resultsPerPage, setResultsPerPage] = useState(15);
  const [timeRanges, setTimeRanges] = useState(Object);
  const [timeRange, setTimeRange] = useState(0);
  const [maps, setMaps] = useState(Object);
  const [map, setMap] = useState(0);
  const [difficulties, setDifficulties] = useState(Object);
  const [players, setPlayers] = useState(Object);
  const [player, setPlayer] = useState(0);
  const [entries, setEntries] = useState([] as Object[]);
  const [searched, setSearched] = useState(0);
  const [page, setPage] = useState(0);
  const [usedNextOrPrev, setUsedNextOrPrev] = useState(false);
  const [nextLoad, setNextLoad] = useState(0);

  const handleSearch = async () => {
    let response = await fetch(
      `${
        process.env.REACT_APP_SRL_BE_ROOT_URL
      }/api/leaderboards/pve-count/${type}/${player === 0 ? type : player}/${
        map === 0 ? defMap : map
      }/${timeRange}`
    );
    let json = await response.json();
    setSearched(parseInt(json.count));

    response = await fetch(
      `${process.env.REACT_APP_SRL_BE_ROOT_URL}/api/leaderboards/pve/${type}/${
        player === 0 ? type : player
      }/${map === 0 ? defMap : map}/${timeRange}/${page}/${resultsPerPage}`
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
        response = await fetch(
          `${process.env.REACT_APP_SRL_BE_ROOT_URL}/api/difficulties`
        );
        json = await response.json();
        setDifficulties(json);
        response = await fetch(
          `${process.env.REACT_APP_SRL_BE_ROOT_URL}/api/maps/${type}pve`
        );
        json = await response.json();
        setMaps(json);
        setPlayers(playerCounts);
        setPage((page) => page + 1);
      } else {
        await handleSearch();
      }
    })();
  }, [page, type]);

  const addEntry = (data: any) => {
    let diffName = "";
    for (let i = 0; i < difficulties.length; i++) {
      let diff = difficulties[i];
      if (diff.value === data.difficulty) {
        diffName = diff.name;
        break;
      }
    }
    setEntries((entries) => [
      ...entries,
      <PvEEntry type={type} data={data} difficulty={diffName} />,
    ]);
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
    setPlayer(playerCountRef.current.value);
    setMap(mapRef.current.value);
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
                <Form.Label>Map:</Form.Label>
                <Form.Control as="select" ref={mapRef} defaultValue={map}>
                  {Object.keys(maps).map((key) => (
                    <option
                      key={maps[key as any].value}
                      value={maps[key as any].value}
                    >
                      {maps[key as any].name}
                    </option>
                  ))}
                </Form.Control>
              </Form.Row>
              <Form.Row>
                <Form.Label>Players:</Form.Label>
                <Form.Control
                  as="select"
                  ref={playerCountRef}
                  defaultValue={player}
                >
                  {Object.keys(players).map((key) => (
                    <option
                      key={players[key as any].value}
                      value={players[key as any].value}
                      selected={
                        parseInt(players[key as any].value) === parseInt(type)
                      }
                    >
                      {players[key as any].name}
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
                {type === 1 ? <th>Player</th> : <th>Players</th>}
                <th>Time</th>
                <th>Difficulty</th>
              </tr>
            </thead>
            <tbody>{entries}</tbody>
          </Table>
        </div>
      </div>
    </div>
  );
}

export default PvE;
