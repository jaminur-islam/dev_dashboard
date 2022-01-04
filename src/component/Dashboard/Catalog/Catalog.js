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
          return <h1 key={dat._id}> {dat.description} </h1>;
        })}
      </div>
    </div>
  );
};

export default Catalog;
