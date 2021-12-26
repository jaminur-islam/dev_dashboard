import { makeStyles } from "@material-ui/core";

export const TableStyle = makeStyles((theme) => ({
  order_count: {
    color: "#001d38",
    fontWeight: "bold !important",
  },
  filter_table: {
    "& span": {
      fontSize: "15px",
      fontWeight: "700",
      color: "#3b3b3b",
      marginLeft: "5px",
    },
    "& svg": {
      color: "#3b3b3b",
      fontSize: "20px",
    },
  },
  export_btn: {
    width: "35%",
    "@media (max-width: 780px)": {
      width: "100%",
    },
    padding: "7.3px 0px",
    fontWeight: "bold",
    color: "#3b3b3b",
    "& svg": {
      marginRight: "10px",
    },
  },
  search_box: {
    border: "1px solid #D2D2D2",
    borderRadius: "5px",
  },
  table_cell_style: {
    backgroundColor: "#F1F1F1",
    "& th": {
      fontWeight: "700",
      color: "#555555",
    },
  },
  table_cell_map: {
    border: "none !important",
  },

  table_head_padding: {
    padding: "0px !important",
  },

  table_data: {
    "& th": {
      fontWeight: "600",
      color: "#555555",
    },
    "& td": {
      fontWeight: "600",
      color: "#555555",
    },
  },
}));
