import React, { useState, useEffect } from "react";

function CountComponent({ url, title }: any) {
  const [count, setCount] = useState("Loading");
  useEffect(() => {
    fetch(`${process.env.REACT_APP_SRS_BE_ROOT_URL}${url}`)
      .then((response) => response.json())
      .then((response) => setCount("" + Math.ceil(response.count)))
      .catch((error) => {
        console.log(error);
        setCount("Error");
      });
  });
  return (
    <tr>
      <td>{title}</td>
      <td>{count}</td>
    </tr>
  );
}

export default CountComponent;
