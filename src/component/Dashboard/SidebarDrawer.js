import React from "react";
import img from "../../img/profileimg.jpg";
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
import { useStyle } from "../Style/sidebar_style";
import { Link } from "react-router-dom";
import useFirebase from "../Hooks/useFirebase";
import useAuth from "../Hooks/useAuth";
import UploadFileIcon from "@mui/icons-material/UploadFile";

const SidebarDrawer = () => {
  const { logout, user } = useAuth();
  const { GoogleSingIn } = useFirebase();
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

        {/* <BorderLinearProgress variant="determinate" value={50} /> */}

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
