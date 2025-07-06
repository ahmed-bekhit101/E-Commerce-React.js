import { useFormik } from "formik";
import React from "react";
import * as yup from "yup";
import axios from "axios";
import yupPassword from 'yup-password';
import { Link, useNavigate } from "react-router-dom";
yupPassword(yup);

export default function Login() {
  const navigate = useNavigate();

  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .email("Invalid email address")
      .required("Email is required"),
    password: yup.string()
      .required("Password is required")
      .min(8, 'Password must contain 6+ characters with number')
      .minNumbers(1, 'Password must contain at least 1 number')
  });

  async function handleRegister(values) {
    try {
      const { data } = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signin", values);

      if (data.token) {
        localStorage.setItem("token", data.token);
        navigate("/");
      } else {
        alert("Login failed");
      }
    } catch (error) {
      alert("Something went wrong");
    }
  }

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: handleRegister,
  });

  return (
    <>
      <header className="header-img d-flex justify-content-center align-items-center text-center">
        <div>
          <h1 className="text-center">Login</h1>
          <span className="fw-bold">
            Home <i className="fw-bold bi bi-chevron-right"></i>{" "}
            <span className="fw-normal">My Account</span>
          </span>
        </div>
      </header>

      <form onSubmit={formik.handleSubmit} className="w-50 py-5 mx-auto">
        <h2 className="h1 pb-5 fw-bold">Login</h2>

        <div className="mb-3">
          <label htmlFor="email-address" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className={`form-control p-4 ${formik.touched.email && formik.errors.email ? "is-invalid" : ""}`}
            id="email-address"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <div className="invalid-feedback">{formik.errors.email}</div>
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className={`form-control p-4 ${formik.touched.password && formik.errors.password ? "is-invalid" : ""}`}
            id="password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <div className="invalid-feedback">{formik.errors.password}</div>
        </div>

        <div className="form-check pt-3 py-4">
          <input className="form-check-input" type="checkbox" id="gridCheck" />
          <label className="form-check-label" htmlFor="gridCheck">
            Remember me
          </label>
        </div>

        <div className="d-flex align-items-center">
          <button type="submit" className="btn btn-outline-dark px-5 py-3">
            Log In
          </button>

          <div className="px-5">
            <p className="mt-3">
              Don't have an account? <Link to="/register">Register</Link>
            </p>
            <p className="mt-3">
              Forgot Password? <Link to="/passwordRecovery">Reset Password</Link>
            </p>
          </div>
        </div>
      </form>
    </>
  );
}
