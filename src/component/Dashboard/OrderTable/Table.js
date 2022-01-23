import { Button } from "@material-ui/core";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SearchIcon from "@mui/icons-material/Search";
import SystemUpdateAltIcon from "@mui/icons-material/SystemUpdateAlt";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import Paper from "@mui/material/Paper";
import { styled, alpha } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { visuallyHidden } from "@mui/utils";
import PropTypes from "prop-types";
import * as React from "react";
import { makeStyles } from "@material-ui/core";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import axios from "axios";
import Swal from "sweetalert2";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import UseAlert from "../../Hooks/UseAlert";

const TableStyle = makeStyles((theme) => ({
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

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: "ID",
    numeric: false,
    disablePadding: true,
    label: "ID",
  },
  {
    id: "Name",
    numeric: true,
    disablePadding: false,
    label: "Name",
  },
  {
    id: "Number",
    numeric: true,
    disablePadding: false,
    label: "Number",
  },
  {
    id: "Address",
    numeric: true,
    disablePadding: false,
    label: "Address",
  },
  {
    id: "Payment",
    numeric: true,
    disablePadding: false,
    label: "Payment",
  },
  {
    id: "Status",
    numeric: true,
    disablePadding: false,
    label: "Status",
  },
  {
    id: "menu",
    numeric: true,
    disablePadding: false,
    label: "",
  },
];
//===========================/////==========Table Head==============/////
function EnhancedTableHead(props) {
  const classes = TableStyle();
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow className={classes.table_cell_style}>
        <TableCell style={{ border: "none" }} padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "select all desserts",
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            className={classes.table_cell_map}
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

// ================/////========== Table select toolbar==============/////
const EnhancedTableToolbar = (props) => {
  const classes = TableStyle();
  const { numSelected, selected, load, setLoad, setSelected, tableData } =
    props;
  // ============================ handle selected order deleted ============================//
  const handleSelectOrderDelete = () => {
    Swal.fire({
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
            setSelected([]);
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
  return (
    <Toolbar
      className={classes.table_head_padding}
      sx={{
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h6"
          id="tableTitle"
          component="div"
          className={classes.order_count}
        >
          Orders ({tableData?.length})
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton onClick={handleSelectOrderDelete}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton className={classes.filter_table}>
            <FilterAltIcon />
            <span>Filters ({tableData?.length})</span>
          </IconButton>
        </Tooltip>
      )}
      {/* Search Field  */}

      <Search className={classes.search_box}>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          placeholder="Search…"
          inputProps={{ "aria-label": "search" }}
        />
      </Search>
      <Button variant="outlined" className={classes.export_btn}>
        <SystemUpdateAltIcon></SystemUpdateAltIcon> Export Table
      </Button>
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

//===========================/////========== Main Table==============/////
export default function EnhancedTable() {
  const classes = TableStyle();
  const [tableData, setTableData] = React.useState([]);
  const [selectValue, setSelectValue] = useState("");
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState([]);
  const [load, setLoad] = useState(true);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const open = Boolean(anchorEl);
  const handleOneClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  //===================================== Get all order form database =======================//
  React.useEffect(() => {
    fetch("https://aqueous-falls-80276.herokuapp.com/order")
      .then((resp) => resp.json())
      .then((resp) => {
        setTableData(resp);
      });
  }, [load]);
  // https://animfahad32.github.io/fakeData/FakeClothingData.json

  //======================================handle order Status=================================//
  const handleOrderStatus = (e, id) => {
    const value = e.target.value;
    setSelectValue(value);
    axios
      .put(`https://aqueous-falls-80276.herokuapp.com/updateOrder/${id}`, {
        status: value,
      })
      .then((result) => {
        setLoad(!load);
      });
  };
  //======================================handle order Delete =================================//
  const handleOrderDelete = (id) => {
    Swal.fire({
      title:
        "<h3 style='font-size: 21px; color: #fff'>" +
        "Do you want to delete it ?" +
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
        axios
          .delete(`https://aqueous-falls-80276.herokuapp.com/deleteOrder/${id}`)
          .then((result) => {
            if (result?.data?.deletedCount > 0) {
              const newTableData = tableData.filter((data) => data._id !== id);
              setTableData(newTableData);
              Swal.fire({
                icon: "success",
                title:
                  "<h5 style='color:#fff; font-size: 20px'>" +
                  "Successfully Delete Order" +
                  "</h5>",
                background: "#3C4A49",
                padding: "1rem 0rem 2rem",
              });
            }
          });
      }
    });
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = tableData.map((n) => n._id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - tableData.length) : 0;
  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2, p: 2 }}>
        <EnhancedTableToolbar
          numSelected={selected.length}
          selected={selected}
          setSelected={setSelected}
          load={load}
          setLoad={setLoad}
          tableData={tableData}
        />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? "small" : "medium"}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={tableData.length}
            />
            <TableBody>
              {/* if you don't need to support IE11, you can replace the `stableSort` call with: rows.slice().sort(getComparator(order, orderBy)) */}
              {stableSort(tableData, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row._id);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      className={classes.table_data}
                      hover
                      // onClick={(event) => handleClick(event, row._id)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row._id}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          onClick={(event) => handleClick(event, row._id)}
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{
                            "aria-labelledby": labelId,
                          }}
                        />
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                        <Link to={`/dashboard/orderDetails/${row._id}`}>
                          {row._id}
                        </Link>
                      </TableCell>
                      <TableCell align="right">({row.name})</TableCell>
                      <TableCell align="right">{row.phone}</TableCell>
                      <TableCell align="right">{row?.address}</TableCell>
                      <TableCell align="right">{row.payment}</TableCell>
                      <TableCell align="right">
                        <select
                          defaultValue={row?.status || selectValue}
                          autoComplete="off"
                          onChange={(e) => {
                            handleOrderStatus(e, row._id);
                          }}
                          style={{
                            padding: "7px 0px",
                            borderRadius: "5px",
                            fontSize: " 14px",
                          }}
                        >
                          {row.status == "processing" && (
                            <option value="processing" disabled>
                              processing
                            </option>
                          )}

                          {row.status == "Delivered" ? (
                            <option value="OnGoing" disabled>
                              OnGoing
                            </option>
                          ) : (
                            <option value="OnGoing">OnGoing</option>
                          )}
                          <option value="Delivered">Delivered</option>
                          {/* <option value="processing">processing</option> */}
                        </select>
                      </TableCell>
                      <TableCell align="right">
                        {/* ==================== handle   ====================    */}
                        {/* ==================== delete   ====================    */}
                        {/* ==================== order    ====================    */}
                        <MenuItem
                          onClick={() => handleOrderDelete(row._id)}
                          style={{
                            backgroundColor: "red",
                            color: "white",
                            padding: "5px",
                            borderRadius: "5px",
                          }}
                        >
                          Delete
                        </MenuItem>
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={tableData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}
