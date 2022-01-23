import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const OrderDetails = () => {
  const [orderData, setOrderData] = useState([]);
  console.log(orderData);
  const { id } = useParams();
  useEffect(() => {
    axios
      .get(`https://aqueous-falls-80276.herokuapp.com/singleOrder/${id}`)
      .then((result) => {
        setOrderData(result?.data);
        console.log(result.data.name);
      });
  }, []);
  return (
    <div style={{ marginTop: "40px" }}>
      <h1 style={{ color: "blue" }}> {`${orderData?.name}`} Order Details</h1>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell width={100}>Id</TableCell>
              <TableCell align="center">Name</TableCell>
              <TableCell align="center">Size</TableCell>
              <TableCell align="center">Color</TableCell>
              <TableCell align="center">Quantity</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orderData?.products?.map((row) => (
              <TableRow
                key={row.color || row.size}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row._id}
                </TableCell>
                <TableCell align="center">{row.name}</TableCell>
                <TableCell align="center">{row.size}</TableCell>
                <TableCell align="center">{row.color}</TableCell>
                <TableCell align="center">{row.quantity}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default OrderDetails;
