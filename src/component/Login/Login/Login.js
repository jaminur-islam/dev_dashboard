import { Visibility, VisibilityOff } from "@material-ui/icons";
import { IconButton, OutlinedInput } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import { useFormStyle } from "../formStyle/formStyle";
import CloseIcon from "@mui/icons-material/Close";
import { Checkbox, Divider, FormControlLabel } from "@material-ui/core";

const Login = () => {
  const classes = useFormStyle();
  const { GoogleSingIn, signWithEmailPass } = useAuth();
  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm();
  const onSubmit = (data) => {
    reset();
    const { email, password } = data;
    console.log(email, password);
    signWithEmailPass(email, password, navigate);
  };

  const [values, setValues] = useState(false);

  const handleShowPassword = () => {
    setValues(!values);
  };

  return (
    <form className={classes._form} onSubmit={handleSubmit(onSubmit)}>
      <Box className={classes._form_header}>
        <h2> Log in </h2>
        <CloseIcon />
      </Box>
      <button
        className={classes._google_btn}
        onClick={() => GoogleSingIn(navigate)}
      >
        <i class="fab fa-google"></i>
        Login with google
      </button>
      <Divider className={classes.form_divider} />
      <label htmlFor="email">Email</label>
      <OutlinedInput
        type="email"
        placeholder="Your email *"
        {...register("email", { required: true })}
      />
      <label htmlFor="email">Password</label>
      <OutlinedInput
        placeholder="Your email *"
        type={values ? "text" : "password"}
        {...register("password", { required: true })}
        endAdornment={
          <IconButton
            aria-label="toggle password visibility"
            onClick={handleShowPassword}
            edge="end"
          >
            {values ? <Visibility /> : <VisibilityOff />}
          </IconButton>
        }
      />
      <FormControlLabel
        control={<Checkbox defaultChecked className={classes.checkbox} />}
        label="Remember me"
      />

      <input type="submit" className={classes.form_submit_btn} value="Log in" />

      {/* form footer */}
      <div className={classes.form_footer}>
        <Link to="/forget"> Forget Password </Link>
        <Divider className={classes.form_divider} />
        <span>Don't have an account?</span>
        <Link to="/register">Sign Up </Link>
      </div>
    </form>
  );
};

export default Login;
