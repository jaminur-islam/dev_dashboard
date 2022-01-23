import React from "react";
import Swal from "sweetalert2";

const UseAlert = (props) => {
  const { selected, load, setLoad } = props;
  return Swal.fire({
    title:
      "<h3 style='font-size: 21px; color: #fff'>" +
      "Do you want to delete orders ?" +
      "</h3>",
    icon: "warning",
    showCancelButton: true,
    background: "#3C4A49",
    confirmButtonColor: "#d33",
    padding: "1rem 0rem 2rem",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      fetch("https://aqueous-falls-80276.herokuapp.com/deleteOrders", {
        method: "delete",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ selectOrder: selected }),
      })
        .then((res) => res.json())
        .then((result) => {
          setLoad(!load);
          Swal.fire({
            icon: "success",
            title:
              "<h5 style='color:#fff; font-size: 20px'>" +
              "Successfully Delete Orders" +
              "</h5>",
            background: "#3C4A49",
            padding: "1rem 0rem 2rem",
          });
        });
    }
  });
};

export default UseAlert;
