import { useFormik } from "formik";
import React from "react";
import * as yup from "yup";
import axios from "axios";
import yupPassword from 'yup-password';
import { Link, useNavigate } from "react-router-dom";
yupPassword(yup); // Extend Yup with password rules




export default function PasswordRecovery() {

  let navigate = useNavigate();

    const validationSchema = yup.object().shape({
      email: yup
        .string()
        .email("Invalid email address")
        .required("Email is required"),
    });
  
    async function handleRegister(Values) {
      let { data } = await axios.post("", Values);
      if (data.message === "success") {
        navigate("/recoveryCode");
      } else {

      }
    }
  
    const formik = useFormik({
      initialValues: {
        email: "",
      },
      validationSchema,
      onSubmit: handleRegister,
    });
    
  return (
    <>
      <header className="header-img d-flex justify-content-center align-items-center text-center">
        <div>
          <h1 className="text-center">Reset Password</h1>
          <span className="fw-bold">
            Home <i class=" fw-bold bi bi-chevron-right"></i>{" "}
            <span className="fw-normal">My Account</span>
          </span>
        </div>
      </header>
      <form onSubmit={formik.handleSubmit} className="w-50 py-5 mx-auto">
        <h2 className="h1 pb-5 fw-bold">Recover Password</h2>
  
                <div className="mb-3">
                  <label htmlFor="email-address" className="form-label">
                    Email address
                  </label>
                  <input
                    type="email"
                    className={`form-control p-4 ${formik.touched.email && formik.errors.email ? " is-invalid" : null}`}
                    id="email-address"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  <div id="validationServerUsernameFeedback" className="invalid-feedback">
        {formik.errors.email}
      </div>
                </div>
                
                <p className="w-75">A link to set a new password will be sent to your email address. <br /> <br />
                Your personal data will be used to support your experience throughout this website, to manage access to your account, and for other purposes described in our <Link to="">Terms and Conditions</Link>.</p>


                
                <button type="submit" class="btn btn-outline-dark px-5 py-3">
                  Submit
                </button>
              
              </form>
    </>
  )
}
