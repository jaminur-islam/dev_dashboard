import { makeStyles } from "@material-ui/core";

export const OrderTableStyle = makeStyles((theme) => ({
    ordersHeading: {
       color:"#001D38",
        marginTop: "50px !important",
    },
    rightElements:{
        display: "flex",
        alignItems: "center",
        justifyContent: "end"
    },
    helpAdmin: {
        color: "#3B3B3B !important",
        fontWeight: "bold !important",
        marginLeft: "1% !important"
    },
    statsBtn: {
        marginRight: "3% !important",
        marginLeft: "1.9% !important",
        color: "#414141 !important",
        fontWeight: "bold !important",
        border: "1px solid #CDCDCD !important",
        textTransform: "none !important",
    },
    newCustomerBtn:{
        fontWeight: "bold !important",
        backgroundColor:"#5C3EC9 !important",
        textTransform: "none !important",
    }

   
  })
  );