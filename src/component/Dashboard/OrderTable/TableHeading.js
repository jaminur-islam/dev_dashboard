import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import { Button, Grid } from "@mui/material";
import React from "react";
import { makeStyles } from "@material-ui/core";

const OrderTableStyle = makeStyles((theme) => ({
  ordersHeading: {
    color: "#001D38",
    marginTop: "15px !important",
  },
  rightElements: {
    display: "flex",
    alignItems: "center",
    justifyContent: "end",
  },
  helpAdmin: {
    color: "#3B3B3B !important",
    fontWeight: "bold !important",
    marginLeft: "1% !important",
  },
  statsBtn: {
    marginRight: "3% !important",
    marginLeft: "1.9% !important",
    color: "#414141 !important",
    fontWeight: "bold !important",
    border: "1px solid #CDCDCD !important",
    textTransform: "none !important",
  },
  newCustomerBtn: {
    fontWeight: "bold !important",
    backgroundColor: "#5C3EC9 !important",
    textTransform: "none !important",
  },
}));

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
