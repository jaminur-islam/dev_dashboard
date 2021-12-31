import React, { useEffect, useState } from "react";

const Catalog = () => {
  const [data, setData] = useState([]);
  console.log(data);
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
          return <h1> {dat.description} </h1>;
        })}
      </div>
    </div>
  );
};

export default Catalog;
