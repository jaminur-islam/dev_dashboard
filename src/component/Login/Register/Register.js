import { Button, Container, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";

const Register = () => {
  const { GoogleSingIn, createUser } = useAuth();
  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm();
  const onSubmit = (data) => {
    // reset();
    const { name, email, password } = data;
    createUser(name, email, password, navigate);
  };

  return (
    <Box>
      <Typography variant="h4" sx={{ textAlign: "center" }}>
        Register Form
      </Typography>
      <Container>
        <form
          onSubmit={handleSubmit(onSubmit)}
          style={{ display: "flex", flexDirection: "column" }}
        >
          <input
            type="text"
            placeholder="Your Name*"
            {...register("name", { required: true })}
          />
          <input
            type="email"
            placeholder="Your email*"
            {...register("email", { required: true })}
          />
          <input
            type="password"
            placeholder="Your password*"
            className="input-field"
            {...register("password", { required: true })}
          />

          <Link to="/login"> Login now </Link>
          <input type="submit" value="log in" />
          <Button onClick={() => GoogleSingIn(navigate)}>
            Login with google
          </Button>
        </form>
      </Container>
    </Box>
  );
};

export default Register;
