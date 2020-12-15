import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Auctions from "./Auctions";

function App() {
  const body = {
    backgroundColor: "#343a40",
    height: "100%",
    width: "100%",
    color: "white",
  };

  return (
    <div style={body}>
      <Auctions />
    </div>
  );
}

export default App;
