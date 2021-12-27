import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import { Button, Grid } from "@mui/material";
import React from "react";
import { OrderTableStyle } from "../Style/OrderTableStyle";

const TableHeading = () => {
  const classes = OrderTableStyle();
  return (
    <Grid
      container
      spacing={2}
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      className={classes.ordersHeading}
    >
      <Grid item md={6}>
        <h1>Orders</h1>
      </Grid>
      <Grid item md={6} className={classes.rightElements}>
        <SportsSoccerIcon />
        <span className={classes.helpAdmin}>Help</span>
        <Button variant="outlined" className={classes.statsBtn}>
          Order Statistics
        </Button>
        <Button
          variant="contained"
          disableElevation
          className={classes.newCustomerBtn}
        >
          New Customer
        </Button>
      </Grid>
    </Grid>
  );
};

export default TableHeading;
