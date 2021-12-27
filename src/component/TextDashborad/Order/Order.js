import React, { useEffect, useState } from "react";
import { Grid } from "@material-ui/core";

const Order = () => {
  const [data, setData] = useState([]);
  console.log(data);
  useEffect(() => {
    fetch("http://localhost:5000/upload")
      .then((res) => res.json())
      .then((result) => {
        setData(result);
      })
      .catch((error) => {
        console.log(error.message);
      })
      .finally(() => {
        console.log("good working");
      });
  }, []);
  return (
    <div>
      <Grid container>
        {data.map((dat) => {
          return (
            <Grid key={dat._id} item md={3}>
              <img src={dat.Image} width="100" height="100" alt="" />
              <li>Name : {dat.title}</li>
              <li>Id : {dat._id}</li>
              <li>Slug : {dat.slug}</li>
              <li>Price : {dat.price}</li>
              <li>Category: {dat.category}</li>
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
};

export default Order;
