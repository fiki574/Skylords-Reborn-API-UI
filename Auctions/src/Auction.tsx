import React from "react";

function Auction({ data }: any) {
  const numberWithCommas = (x: Number): String => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <tr>
      <td>{data.cardName}</td>
      <td>{numberWithCommas(data.startingPrice)}</td>
      <td>{numberWithCommas(data.currentPrice)}</td>
      <td>{numberWithCommas(data.buyoutPrice)}</td>
      <td>{data.endingOn}</td>
    </tr>
  );
}

export default Auction;
