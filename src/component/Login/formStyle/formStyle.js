import { makeStyles } from "@material-ui/core";

export const useFormStyle = makeStyles({
  // form header style
  _form_header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    "& svg": {
      border: "1px solid #787E7C",
      color: "#737373",
      borderRadius: "50%",
      height: "18px",
      width: "18px",
    },
    "& h2": {
      color: "#181818",
    },
  },
  // form style
  _form: {
    marginTop: "20px",
    display: "flex",
    flexDirection: "column",
    background: "white",
    boxShadow: "3px 1px 8px 1px #969696",
    padding: "30px",
    rowGap: "10px",
    width: "320px",
    margin: "0 auto",
    "& input": {
      padding: "8px",
    },
    "& label": {
      fontWeight: "bold",
    },
  },

  checkbox: {
    color: "#0C82EC !important",
  },

  form_submit_btn: {
    color: "white",
    background: "#0085FF",
    border: "none",
    borderRadius: "5px",
    fontSize: "16px",
  },

  form_divider: {
    margin: "15px 0px 15px 0px !important",
  },
  _google_btn: {
    padding: "7px",
    fontSize: "18px",
    color: "#2C2C2C",
    borderRadius: "5px",
    border: "1px solid #C4C4C4",
    background: "white",
    "& i": {
      marginRight: "8px",
      color: "#2C2C2C",
    },
  },

  // Form footer style
  form_footer: {
    textAlign: "center",
    "& a": {
      textDecoration: "none",
      color: "#4F99D3",
      fontWeight: "bold",
      margin: "5px 0px",
      display: "inline-block",
    },
    "& span": {
      color: "#969696",
      display: "block",
      marginTop: "10px",
    },
  },
});
