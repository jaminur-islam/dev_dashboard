import React, { useEffect, useState } from "react";

const Catalog = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch("https://aqueous-falls-80276.herokuapp.com/products")
      .then((res) => res.json())
      .then((result) => {
        setData(result);
      });
  }, []);
  return (
    <div style={{ marginTop: "50px" }}>
      <div>
        {data.map((dat) => {
          return (
            <div key={dat._id}>
              <h1> {dat.description} </h1>
              <p>lorem ipsum dollar set amen</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Catalog;
