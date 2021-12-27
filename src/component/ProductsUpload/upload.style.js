import { makeStyles } from "@material-ui/core";

export const useStyle = makeStyles({
  // upload form style
  upload_form: {
    width: "50%",
    marginTop: "20px",
    display: "flex",
    flexDirection: "column",
    rowGap: "15px",
    "& input": {
      padding: "10px",
    },
  },
});
