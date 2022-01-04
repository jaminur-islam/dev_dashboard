import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import { Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import useAuth from "../../component/Hooks/useAuth";
import CancelIcon from "@mui/icons-material/Cancel";

const Administration = () => {
  const [updateAdmin, setUpdateAdmin] = useState(false);
  const [adminRequest, setAdminRequest] = useState([]);
  const [showAdmin, setShowAdmin] = useState("request");
  const { token, user } = useAuth();

  const allAdmin = adminRequest.filter((admin) => admin.role === "admin");
  const mainAdmin = allAdmin?.find((admin) => admin?.email === user.email);

  // Get all admin request
  useEffect(() => {
    axios("https://aqueous-falls-80276.herokuapp.com/adminRequest", {
      headers: {
        authorization: `Bearer ${token}`,
      },
    }).then((result) => {
      setAdminRequest(result.data);
    });
  }, [updateAdmin]);

  // confirm message handle
  const confirmMessage = (message) => {
    return window.confirm(message);
  };

  // Handle make admin request
  const handleMakeAdmin = (email) => {
    const confirm = confirmMessage("Are you sure ? You make him an admin");
    if (confirm) {
      const adminEmail = { email };
      axios
        .put("http://localhost:5000/adminRequest", adminEmail, {
          headers: {
            authorization: `Bearer ${token}`,
          },
        })
        .then((result) => {
          setUpdateAdmin(!updateAdmin);
        });
    }
  };
  // Handle delete admin request
  const handleDeleteAdminReq = (id) => {
    const confirm = confirmMessage("Are you sure? do you want to remove admin");
    if (confirm) {
      axios
        .delete(`https://aqueous-falls-80276.herokuapp.com/adminRequest/${id}`)
        .then((result) => {
          setUpdateAdmin(!updateAdmin);
        });
    }
  };

  // handle input value
  const [email, setEmail] = useState();
  const handleInputValue = (e) => {
    setEmail("");
    const email = e.target.value;
    setEmail(email);
  };

  return (
    <div style={{ margin: "40px" }}>
      <button onClick={() => setShowAdmin("request")}>Admin request</button>
      <button
        onClick={() => setShowAdmin("make")}
        style={{ marginLeft: "80px" }}
      >
        Make admin
      </button>
      {mainAdmin?.power === "main admin" &&
        mainAdmin?.email === "devweardatabase2@gmail.com" && (
          <button
            style={{ marginLeft: "80px" }}
            onClick={() => setShowAdmin("remove")}
          >
            Remove Admin
          </button>
        )}
      {showAdmin == "make" && (
        <div>
          <h1> Make admin</h1>
          <input type="email" onChange={handleInputValue} />
          <button onClick={() => handleMakeAdmin(email)}>Make admin</button>
        </div>
      )}

      {showAdmin == "request" && (
        <div>
          <h1> Admin Request</h1>
          <Grid container spacing={2}>
            {adminRequest.map((admin) => {
              return (
                <Grid key={admin._id} item md={4}>
                  <Box
                    sx={{
                      border: "2px solid green",
                      padding: "15px",
                      position: "relative",
                    }}
                  >
                    <Typography sx={{ fontSize: "30px" }}>
                      {admin.name}
                    </Typography>
                    <Typography sx={{ fontSize: "20px" }}>
                      {admin.email}
                    </Typography>

                    {!admin?.role ? (
                      <div
                        style={{
                          marginTop: "10px",
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <button
                          onClick={() => handleMakeAdmin(admin.email)}
                          style={{
                            background: "green",
                            border: "none",
                            padding: "8px 12px",
                            color: "white",
                            borderRadius: "5px",
                          }}
                        >
                          Accept
                        </button>
                        <button
                          onClick={() => handleDeleteAdminReq(admin._id)}
                          style={{
                            background: "red",
                            border: "none",
                            padding: "8px 12px",
                            color: "white",
                            borderRadius: "5px",
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    ) : (
                      <span
                        style={{
                          color: "green",
                          fontWeight: "bold",
                          fontSize: "16px",
                        }}
                      >
                        admin
                      </span>
                    )}
                  </Box>
                </Grid>
              );
            })}
          </Grid>
        </div>
      )}

      {showAdmin == "remove" && (
        <Grid container spacing={2}>
          {allAdmin.map((admin) => {
            return (
              <Grid key={admin._id} item md={4}>
                <Box
                  sx={{
                    border: "2px solid green",
                    padding: "15px",
                    position: "relative",
                  }}
                >
                  <Typography sx={{ fontSize: "30px" }}>
                    {admin.name}
                  </Typography>
                  <Typography sx={{ fontSize: "20px" }}>
                    {admin.email}
                  </Typography>
                  {admin?.role && (
                    <CancelIcon
                      sx={{
                        position: "absolute",
                        top: "10px",
                        right: "10px",
                      }}
                      onClick={() => handleDeleteAdminReq(admin._id)}
                    ></CancelIcon>
                  )}
                  {!admin?.role ? (
                    <div
                      style={{
                        marginTop: "10px",
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <button
                        onClick={() => handleMakeAdmin(admin.email)}
                        style={{
                          background: "green",
                          border: "none",
                          padding: "8px 12px",
                          color: "white",
                          borderRadius: "5px",
                        }}
                      >
                        Accept
                      </button>
                      <button
                        onClick={() => handleDeleteAdminReq(admin._id)}
                        style={{
                          background: "red",
                          border: "none",
                          padding: "8px 12px",
                          color: "white",
                          borderRadius: "5px",
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  ) : (
                    <span
                      style={{
                        color: "green",
                        fontWeight: "bold",
                        fontSize: "16px",
                      }}
                    >
                      admin
                    </span>
                  )}
                </Box>
              </Grid>
            );
          })}
        </Grid>
      )}
    </div>
  );
};

export default Administration;
