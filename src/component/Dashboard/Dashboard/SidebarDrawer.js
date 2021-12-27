import React from "react";
import img from "../../../img/profileimg.jpg";
import { Dashboard } from "@material-ui/icons";
import LocalGroceryStoreIcon from "@mui/icons-material/LocalGroceryStore";
import FolderIcon from "@mui/icons-material/Folder";
import PersonIcon from "@mui/icons-material/Person";
import CardTravelIcon from "@mui/icons-material/CardTravel";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import DisplaySettingsIcon from "@mui/icons-material/DisplaySettings";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  LinearProgress,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Box } from "@mui/system";
import { makeStyles } from "@material-ui/core";
import { Link } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import UploadFileIcon from "@mui/icons-material/UploadFile";
const useStyle = makeStyles({
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

const SidebarDrawer = () => {
  const { logout, user } = useAuth();
  const classes = useStyle();
  return (
    <Box className={classes.box}>
      {/* admin start */}
      <div className={classes.admin_content}>
        <div className={classes.admin_details}>
          <img className={classes.admin_img} src={img} alt="admin-img" />
          <div className={classes.admin_details_text}>
            <span>Body shop</span>
            <Typography>
              {user?.displayName?.split(" ")[0] || "sagor"}(admin){" "}
            </Typography>
          </div>
        </div>
        <select className={classes.header_select_tag}>
          <option disabled selected></option>
          <option>Option 1</option>
          <option>Option 2</option>
          <option>Option 3</option>
        </select>
      </div>
      {/* admin end */}

      {/* sidebar item start */}
      <div className={classes.sidebar_container}>
        <div className={classes.sidebar_item}>
          <Dashboard />
          <a className={classes.sidebar_link} href="#">
            Dashboard
          </a>
        </div>
        <div className={classes.sidebar_item}>
          <LocalGroceryStoreIcon />
          <Link to="/" className={classes.sidebar_link} href="#">
            Order
          </Link>
        </div>
        <div className={classes.sidebar_item}>
          <UploadFileIcon />
          <Link
            to="/dashboard/upload"
            className={classes.sidebar_link}
            href="#"
          >
            Upload products
          </Link>
        </div>
        <div className={classes.sidebar_item}>
          <FolderIcon />
          <Link
            to="/dashboard/catalog"
            className={classes.sidebar_link}
            href="#"
          >
            Catalog
          </Link>
        </div>
      </div>
      <div className={classes.accordion_content}>
        <Accordion
          className={classes.accordion_item}
          // style={{ background: "red" }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <PersonIcon />
            <span className={classes.sidebar_link}>Customers</span>
          </AccordionSummary>
          <AccordionDetails>
            <div className={classes.link_list}>
              <a href="#"> Home </a>
              <a href="#"> Home </a>
              <a href="#"> Home </a>
            </div>
          </AccordionDetails>
        </Accordion>
        <Accordion className={classes.accordion_item}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <CardTravelIcon />
            <span className={classes.sidebar_link}>Shipping</span>
          </AccordionSummary>
          <AccordionDetails>
            <div className={classes.link_list}>
              <a href="#"> Home </a>
              <a href="#"> Home </a>
              <a href="#"> Home </a>
            </div>
          </AccordionDetails>
        </Accordion>
        <Accordion className={classes.accordion_item}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <AttachMoneyIcon />
            <span className={classes.sidebar_link}>Payments</span>
          </AccordionSummary>
          <AccordionDetails>
            <div className={classes.link_list}>
              <a href="#"> Home </a>
              <a href="#"> Home </a>
              <a href="#"> Home </a>
            </div>
          </AccordionDetails>
        </Accordion>
        <Accordion className={classes.accordion_item}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <DisplaySettingsIcon />
            <span className={classes.sidebar_link}>Configuration</span>
          </AccordionSummary>
          <AccordionDetails>
            <div className={classes.link_list}>
              <a href="#"> Home </a>
              <a href="#"> Home </a>
              <a href="#"> Home </a>
            </div>
          </AccordionDetails>
        </Accordion>
        <button onClick={logout}> Logout </button>
        <br />

        <div className={classes.storage_usage}>
          <p>Storage usage</p>
          <span> 50% </span>
        </div>
        <LinearProgress color="success" variant="determinate" value={50} />
      </div>
      {/* sidebar item end */}
    </Box>
  );
};

export default SidebarDrawer;
