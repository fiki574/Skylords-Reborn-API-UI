import React from "react";

function PvEEntry({ type, data, difficulty }: any) {
  let name = "";
  if (type === 1) {
    name = data.name;
  } else {
    for (let i = 0; i < data.players.length; i++) {
      name += data.players[i] + ", ";
    }
    name = name.substring(0, name.length - 2);
  }
  let min = 0,
    sec = 0,
    time = "";
  min = Math.floor(data.time / 10 / 60);
  sec = Math.floor(data.time / 10) % 60;
  time = `${min}m${sec}s`;
  return (
    <tr>
      <td>{name}</td>
      <td>{time}</td>
      <td>{difficulty}</td>
    </tr>
  );
}

export default PvEEntry;
