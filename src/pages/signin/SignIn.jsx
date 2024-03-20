import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";

import { useAuthContext } from "../../context/AuthContextProvider";

import { signIn } from "../../api/api";

const SignIn = () => {
  const { token, setToken } = useAuthContext();
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    try {
      const response = await signIn(values);
      // setToken(response.token);
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
    <form className="loginForm" onSubmit={formik.handleSubmit}>
      <input
        className="loginForm-input"
        id="email"
        name="email"
        type="text"
        value={formik.values.email}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        placeholder="Email"
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
      />
      {formik.errors.password && formik.touched.password ? (
        <div className="errorInput">{formik.errors.password}</div>
      ) : null}

      <Link to="#" className="link">
        Забыли пароль
      </Link>

      <div className="submitButton">
        <button type="submit">Submit</button>
      </div>
    </form>
  );
};

export default SignIn;
