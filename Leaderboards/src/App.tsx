import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Tab, Tabs } from "react-bootstrap";
import "./index.css";
import PvP from "./components/PvP";
import PvE from "./components/PvE";

function App() {
  const [key, setKey] = useState("1v1");

  const body = {
    backgroundColor: "#343a40",
    height: "100%",
    width: "100%",
    color: "white",
  };

  return (
    <div style={body}>
      <div className="container">
        <Tabs
          className="myLink"
          id="controlled-tab"
          activeKey={key}
          onSelect={(k: React.SetStateAction<string>) => setKey(k)}
        >
          <Tab
            className="hideLink"
            disabled={true}
            eventKey=""
            title="________________________________________"
          ></Tab>
          <Tab eventKey="1v1" title="PvP 1vs1">
            <PvP type={"1v1"} />
          </Tab>
          <Tab eventKey="2v2" title="PvP 2vs2">
            <PvP type={"2v2"} />
          </Tab>
          <Tab eventKey="1pve" title="1P PvE">
            <PvE type={1} />
          </Tab>
          <Tab eventKey="2pve" title="2P PvE">
            <PvE type={2} />
          </Tab>
          <Tab eventKey="4pve" title="4P PvE">
            <PvE type={4} />
          </Tab>
          <Tab eventKey="12pve" title="12P PvE">
            <PvE type={12} />
          </Tab>
        </Tabs>
      </div>
    </div>
  );
}

export default App;
