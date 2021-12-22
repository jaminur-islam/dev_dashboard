import React from "react";
import { useStyle } from "../Style/Style";
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
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Box } from "@mui/system";

const SidebarDrawer = () => {
  const classes = useStyle();
  return (
    <Box className={classes.box}>
      <div className={classes.admin_content}>
        <div className={classes.admin_details}>
          <img className={classes.admin_img} src={img} alt="admin" />
          <div className={classes.admin_details_text}>
            <Typography
              sx={{ fontWeight: "bold", color: "#08243E", fontSize: "18px" }}
            >
              Body shop
            </Typography>
            <Typography>jaminur(admin) </Typography>
          </div>
        </div>

        <select className={classes.header_select_tag}>
          <option disabled selected></option>
          <option>Option 1</option>
          <option>Option 2</option>
          <option>Option 3</option>
        </select>
      </div>

      <div className={classes.sidebar_container}>
        <div className={classes.sidebar_item}>
          <Dashboard />
          <a className={classes.sidebar_link} href="#">
            Dashboard
          </a>
        </div>
        <div className={classes.sidebar_item}>
          <LocalGroceryStoreIcon />
          <a className={classes.sidebar_link} href="#">
            Order
          </a>
        </div>
        <div className={classes.sidebar_item}>
          <FolderIcon />
          <a className={classes.sidebar_link} href="#">
            Catalog
          </a>
        </div>
      </div>
      <div className={classes.accordion_content}>
        <Accordion
          className={classes.sidebar_hover}
          style={{
            boxShadow: "none",
            outline: "none",
            border: "none",
            background: "#E5E7EA",
          }}
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
            <div className={classes.item_list}>
              <a href="#"> Home </a>
              <a href="#"> Home </a>
              <a href="#"> Home </a>
            </div>
          </AccordionDetails>
        </Accordion>
        <Accordion
          className={classes.sidebar_hover}
          style={{
            boxShadow: "none",
            outline: "none",
            border: "none",
            background: "#E5E7EA",
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <CardTravelIcon />
            <span className={classes.sidebar_link}>Shipping</span>
          </AccordionSummary>
          <AccordionDetails>
            <div className={classes.item_list}>
              <a href="#"> Home </a>
              <a href="#"> Home </a>
              <a href="#"> Home </a>
            </div>
          </AccordionDetails>
        </Accordion>
        <Accordion
          className={classes.sidebar_hover}
          style={{
            boxShadow: "none",
            outline: "none",
            border: "none",
            background: "#E5E7EA",
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <AttachMoneyIcon />
            <span className={classes.sidebar_link}>Payments</span>
          </AccordionSummary>
          <AccordionDetails>
            <div className={classes.item_list}>
              <a href="#"> Home </a>
              <a href="#"> Home </a>
              <a href="#"> Home </a>
            </div>
          </AccordionDetails>
        </Accordion>
        <Accordion
          className={classes.sidebar_hover}
          style={{
            boxShadow: "none",
            outline: "none",
            border: "none",
            background: "#E5E7EA",
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <DisplaySettingsIcon />
            <span className={classes.sidebar_link}>Configuration</span>
          </AccordionSummary>
          <AccordionDetails>
            <div className={classes.item_list}>
              <a href="#"> Home </a>
              <a href="#"> Home </a>
              <a href="#"> Home </a>
            </div>
          </AccordionDetails>
        </Accordion>
      </div>
    </Box>
  );
};

export default SidebarDrawer;
