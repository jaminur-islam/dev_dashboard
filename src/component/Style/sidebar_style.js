import { makeStyles } from "@material-ui/core";

export const useStyle = makeStyles({
  // admin start
  box: {
    background: "#E5E7EA",
    height: "100%",
    padding: "15px 10px",
    overflowX: "hidden",
  },
  admin_content: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  admin_details: {
    display: "flex",
    alignItems: "center",
  },
  admin_details_text: {
    marginLeft: "20px",
    "& span": {
      fontWeight: "bold",
      color: "#08243E",
      fontSize: "18px",
    },
  },

  admin_img: {
    height: "50px",
    width: "50px",
    borderRadius: "50%",
  },
  header_select_tag: {
    height: "20px",
    border: "none",
    backgroundColor: "#E5E7EA",
    outline: "none",
  },
  // admin end

  // sidebar list start
  sidebar_container: {
    padding: "10px 25px",
  },

  sidebar_item: {
    display: "flex",
    alignItems: "center",
    marginTop: "30px",
    color: "#333333",
    "&:hover": {
      color: "#08243E",
    },
  },

  // remove before style on accordion

  accordion_item: {
    boxShadow: "none !important",
    outline: "none !important",
    border: "none !important",
    background: "#E5E7EA !important ",
    "& div:hover": {
      color: "#08243E",
      "& span": {
        color: "#08243E",
      },
    },
    "& a": {
      textDecoration: "none",
      fontSize: "15px",
      fontWeight: "bold",
    },
    "&.css-1elwnq4-MuiPaper-root-MuiAccordion-root:before": {
      display: "none",
    },
    "&:hover": {
      color: "#08243E",
    },
  },

  accordion_content: {
    padding: "0px 10px",
  },

  sidebar_link: {
    marginLeft: "15px",
    textDecoration: "none",
    color: "#6D6D6D",
    fontSize: "18px",
    fontWeight: 600,
    "&:hover": {
      color: "#08243E",
    },
  },

  link_list: {
    display: "flex",
    flexDirection: "column",
    marginLeft: "20px",
  },

  // Storage usage style
  storage_usage: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "50px",
    "& p": {
      color: "#112D46",
      fontWeight: "bold",
      margin: "0",
      marginBottom: "5px",
    },
    "& span": {
      color: "#444444",
      fontWeight: "bold",
      marginBottom: "5px",
    },
  },
});
