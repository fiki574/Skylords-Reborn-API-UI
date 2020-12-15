import React, { useState, useEffect } from "react";

function RefKeyComponent({ url, title, refkey }: any) {
  const [count, setCount] = useState("Loading");
  const [countTest, setCountTest] = useState("Loading");
  useEffect(() => {
    fetch(`${process.env.REACT_APP_SRS_BE_ROOT_URL}${url}`)
      .then((response) => response.json())
      .then((response) => setCount(response[0][refkey]))
      .catch((error) => {
        console.log(error);
        setCount("Error");
      });
    fetch(`${process.env.REACT_APP_SRS_BE_ROOT_URL}${url}/test`)
      .then((response) => response.json())
      .then((response) => setCountTest(response[0][refkey]))
      .catch((error) => {
        console.log(error);
        setCountTest("Error");
      });
  });
  return (
    <tr>
      <td>{title}</td>
      <td>{count}</td>
      <td>{countTest}</td>
    </tr>
  );
}

export default RefKeyComponent;
