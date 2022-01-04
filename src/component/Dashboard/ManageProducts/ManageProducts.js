import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@material-ui/core";
import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    let isMounted = true;
    axios("https://aqueous-falls-80276.herokuapp.com/products2").then(
      (result) => {
        setProducts(result.data);
      }
    );
    return () => {
      isMounted = false;
    };
  }, []);

  // handle delete
  const handleDelete = (id) => {
    const confirm = window.confirm("are you sure ?");
    if (confirm) {
      axios
        .delete(`https://aqueous-falls-80276.herokuapp.com/products2/${id}`)
        .then((result) => {
          const newProducts = products.filter((product) => product._id !== id);
          setProducts(newProducts);
        });
    }
  };
  return (
    <div style={{ margin: "40px" }}>
      <h1>Manage products</h1>

      <Grid container spacing={10}>
        {products.map((product) => {
          return (
            <Grid item key={product._id} md={4}>
              <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                  component="img"
                  alt="green iguana"
                  height="140"
                  image={product.imgUrl}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {product.name}
                  </Typography>
                  <Typography gutterBottom variant="h5" component="div">
                    Price: $ {product.price}
                  </Typography>
                  <Typography variant="body2">{product.description}</Typography>
                </CardContent>
                <CardActions
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <button
                    style={{
                      background: "red",
                      padding: " 8px 10px",
                      border: "none",
                      borderRadius: "5px",
                      color: "white",
                    }}
                    onClick={() => handleDelete(product._id)}
                  >
                    Delete
                  </button>
                  <Link
                    to={`/dashboard/productManage/${product._id}`}
                    style={{
                      background: "blue",
                      padding: " 8px 10px",
                      border: "none",
                      borderRadius: "5px",
                      color: "white",
                    }}
                  >
                    Update
                  </Link>
                </CardActions>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
};

export default ManageProducts;
