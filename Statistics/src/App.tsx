import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Stats from "./Stats";

function App() {
  const body = {
    backgroundColor: "#343a40",
    height: "100%",
    width: "100%",
  };
  return (
    <div style={body}>
      <div className="container">
        <Stats />
      </div>
    </div>
  );
}

export default App;
