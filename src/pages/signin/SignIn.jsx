import React from "react";
import { Link } from "react-router-dom";
import { TextField, InputLabel, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";

import { useAuthContext } from "../../context/AuthContextProvider";
import { signIn } from "../../api/api";
import Header from "../../components/header/Header";

const SignIn = () => {
  const { token, setToken } = useAuthContext();
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    try {
      const response = await signIn(values);
      localStorage.setItem("token", response.token);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const validate = (values) => {
    const errors = {};

    if (!values.email) {
      errors.email = "Required!";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      errors.email = "Invalid email address";
    }

    if (!values.password) {
      errors.password = "Required!";
    } else if (values.password.length < 6) {
      errors.password = "Must be at least 6 characters!";
    }
    return errors;
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate,
    onSubmit: (values) => handleSubmit(values),
  });

  return (
    <>
      <Header />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "57px",
        }}
      >
        <h1>Sign In</h1>
        <div
          style={{
            marginBottom: "16px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <InputLabel
            htmlFor="email"
            sx={{ marginBottom: "17px", color: "black", fontWeight: "700" }}
          >
            Email Address
          </InputLabel>
          <TextField
            id="email"
            name="email"
            type="email"
            variant="outlined"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            style={{ width: "550px" }}
          />
        </div>
        <div
          style={{
            marginBottom: "16px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <InputLabel
            htmlFor="password"
            sx={{ marginBottom: "17px", color: "black", fontWeight: "700" }}
          >
            Password{" "}
            <span
              style={{
                color: "#E87070",
                marginLeft: "320px",
                cursor: "pointer",
              }}
            >
              Forgot Password?
            </span>
          </InputLabel>
          <TextField
            id="password"
            name="password"
            type="password"
            variant="outlined"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            style={{ width: "550px" }}
          />
        </div>
        <Button
          style={{
            backgroundColor: "#163A4E",
            padding: "15px",
            color: "#ffffff",
            width: "550px",
            borderRadius: "15px",
            marginTop: "12px",
          }}
          color="inherit"
          onClick={formik.handleSubmit}
        >
          Sign In
        </Button>
        <p style={{ fontWeight: "500", marginTop: "15px" }}>
          Don’t have an account?{" "}
          <Link
            to="/auth/signup"
            style={{ color: "#285975", textDecoration: "underline" }}
          >
            Sign Up Here
          </Link>
        </p>
        <p style={{ color: "#8E8E93", marginTop: "9px" }}>OR</p>
        <Button
          style={{
            backgroundColor: "#E87070",
            padding: "15px",
            color: "#ffffff",
            width: "550px",
            borderRadius: "15px",
            marginTop: "12px",
          }}
          color="inherit"
        >
          Sign In with Google
        </Button>
        <p
          style={{
            color: "#8E8E93",
            marginTop: "21px",
            textAlign: "center",
            fontSize: "13px",
            fontWeight: "600",
          }}
        >
          By signing up or signing in, you are agreeing to Levels.fyi's{" "}
          <span style={{ color: "#285975" }}>Terms of Use</span>
          <br /> and <span style={{ color: "#285975" }}>Privacy Policy</span>
        </p>
      </div>
    </>
  );
};

export default SignIn;
