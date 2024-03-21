import React from "react";
import { Link } from "react-router-dom";
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
      setToken(response.token);
      localStorage.setItem("token", response.token);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  const validate = (values) => {
    const errors = {};

    if (!values.email) {
      errors.email = "Обязательное поля!";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      errors.email = "Неправильный email адрес";
    }

    if (!values.password) {
      errors.password = "Обязательное поля!";
    } else if (values.password.length < 6) {
      errors.password = "Минимум 6 символа для заполнения!";
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
    // onSubmit: values => console.log(JSON.stringify(values, null, 2))
  });

  return (
    <>
      <Header />
      <form
        className="loginForm"
        style={{
          display: "flex",
          flexDirection: "column",
          marginTop: "80px",
          alignItems: "center",
        }}
        onSubmit={formik.handleSubmit}
      >
        <h1 style={{ marginBottom: "18px" }}>Sign In</h1>
        <input
          className="loginForm-input"
          id="email"
          name="email"
          type="text"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="Email"
          style={{
            width: "550px",
            borderRadius: "15px",
            padding: "15px",
            marginBottom: "20px",
          }}
        />
        {formik.errors.email && formik.touched.email ? (
          <div className="errorInput">{formik.errors.email}</div>
        ) : null}

        <input
          className="loginForm-input"
          id="password"
          name="password"
          type="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="Password"
          style={{
            width: "550px",
            borderRadius: "15px",
            padding: "15px",
            marginBottom: "15px",
          }}
        />
        {formik.errors.password && formik.touched.password ? (
          <div className="errorInput">{formik.errors.password}</div>
        ) : null}

        <div className="submitButton">
          <button
            style={{
              width: "550px",
              backgroundColor: "#163A4E",
              padding: "15px",
              color: "#ffffff",
              borderRadius: "15px",
              marginTop: "18px",
              fontSize: "17px",
              border: "none",
            }}
            type="submit"
          >
            Sign In
          </button>
          <p
            style={{
              textAlign: "center",
              fontSize: "13px",
              fontWeight: "600",
              marginTop: "18px",
            }}
          >
            Don’t have an account?{" "}
            <Link to="/auth/signup">
              <span
                style={{
                  color: "#285975",
                  textDecoration: "underline",
                  cursor: "pointer",
                }}
              >
                Sign Up Here
              </span>
            </Link>
          </p>
          <p
            style={{
              color: "#8E8E93",
              marginTop: "13px",
              textAlign: "center",
              fontSize: "15px",
            }}
          >
            OR
          </p>
          <button
            style={{
              width: "550px",
              backgroundColor: "#E87070",
              padding: "15px",
              color: "#ffffff",
              borderRadius: "15px",
              marginTop: "16px",
              fontSize: "17px",
              border: "none",
            }}
            type="submit"
          >
            Sign In with Google
          </button>
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
      </form>
    </>
  );
};

export default SignIn;
