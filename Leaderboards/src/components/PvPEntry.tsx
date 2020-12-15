import React from "react";

function PvPEntry({ type, data }: any) {
  const numberWithCommas = (x: Number): String => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <tr>
      <td>
        {type === "1v1" ? data.name : data.players[0] + ", " + data.players[1]}
      </td>
      <td>{numberWithCommas(Math.ceil(data.rating))}</td>
      <td>{numberWithCommas(data.baseElo)}</td>
      <td>{Math.ceil(data.activity)}%</td>
      {type === "1v1" ? <td>{data.totalMatches}</td> : undefined}
      <td>{type === "1v1" ? data.winsLimited : data.wins}</td>
      <td>{type === "1v1" ? data.losesLimited : data.losses}</td>
    </tr>
  );
}

export default PvPEntry;
