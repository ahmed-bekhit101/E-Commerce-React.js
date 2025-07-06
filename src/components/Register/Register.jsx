import { useFormik } from "formik";
import React from "react";
import * as yup from "yup";
import axios from "axios";
import yupPassword from 'yup-password';
import { Link, useNavigate } from "react-router-dom";
yupPassword(yup);

export default function Register() {
  const navigate = useNavigate();

  const validationSchema = yup.object().shape({
    name: yup
      .string()
      .required("Name is required")
      .min(3, "Name must be at least 3 characters")
      .max(30, "Name must be at most 30 characters"),
    email: yup
      .string()
      .email("Invalid email address")
      .required("Email is required"),
    password: yup
      .string()
      .required("Password is required")
      .min(8, "Password must contain 8+ characters with uppercase, lowercase, number, and special characters")
      .minLowercase(1, "Must have at least 1 lowercase letter")
      .minUppercase(1, "Must have at least 1 uppercase letter")
      .minNumbers(1, "Must have at least 1 number")
      .minSymbols(1, "Must have at least 1 special character"),
    rePassword: yup
      .string()
      .required("Confirmation is required")
      .oneOf([yup.ref("password")], "Passwords do not match"),
    phone: yup
      .string()
      .required("Phone is required")
      .matches(/^01[0125][0-9]{8}$/, "Invalid Egyptian phone number")
  });

  async function handleRegister(values) {
    try {
      const { data } = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signup", values);
      if (data.message === "success") {
        navigate("/login");
      } else {
        alert("Registration failed");
      }
    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong");
    }
  }

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: ""
    },
    validationSchema,
    onSubmit: handleRegister
  });

  return (
    <>
      <header className="header-img d-flex justify-content-center align-items-center text-center">
        <div>
          <h1 className="text-center">Register</h1>
          <span className="fw-bold">
            Home <i className="fw-bold bi bi-chevron-right"></i>{" "}
            <span className="fw-normal">My Account</span>
          </span>
        </div>
      </header>

      <form onSubmit={formik.handleSubmit} className="w-50 py-5 mx-auto">
        <h2 className="h1 pb-5 fw-bold">Register</h2>

        <div className="mb-3">
          <label htmlFor="name" className="form-label">Full Name</label>
          <input
            type="text"
            className={`form-control p-4 ${formik.touched.name && formik.errors.name ? "is-invalid" : ""}`}
            id="name"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <div className="invalid-feedback">{formik.errors.name}</div>
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email Address</label>
          <input
            type="email"
            className={`form-control p-4 ${formik.touched.email && formik.errors.email ? "is-invalid" : ""}`}
            id="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <div className="invalid-feedback">{formik.errors.email}</div>
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
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

        <div className="mb-3">
          <label htmlFor="rePassword" className="form-label">Confirm Password</label>
          <input
            type="password"
            className={`form-control p-4 ${formik.touched.rePassword && formik.errors.rePassword ? "is-invalid" : ""}`}
            id="rePassword"
            name="rePassword"
            value={formik.values.rePassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <div className="invalid-feedback">{formik.errors.rePassword}</div>
        </div>

        <div className="mb-3">
          <label htmlFor="phone" className="form-label">Phone</label>
          <input
            type="text"
            className={`form-control p-4 ${formik.touched.phone && formik.errors.phone ? "is-invalid" : ""}`}
            id="phone"
            name="phone"
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <div className="invalid-feedback">{formik.errors.phone}</div>
        </div>

        <div className="form-check pt-3 py-4">
          <input className="form-check-input" type="checkbox" id="gridCheck" />
          <label className="form-check-label" htmlFor="gridCheck">
            I agree to the <Link to="">Terms and Conditions</Link>
          </label>
        </div>

        <button type="submit" className="btn btn-outline-dark px-5 py-3">
          Register
        </button>

        <label className="form-check-label d-block py-2" htmlFor="gridCheck">
          Already have an Account? <Link to="/login">Login</Link>
        </label>
      </form>
    </>
  );
}
