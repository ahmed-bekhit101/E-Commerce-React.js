import axios from "axios";
import { useFormik } from "formik";
import React from "react";
import * as yup from "yup";

export default function Contact() {

  const validationSchema = yup.object().shape({
    name: yup
      .string()
      .min(3, "Minimum name length is 3 characters")
      .max(10, "Max name length is 3 characters")
      .required("Name is required"),
    email: yup
      .string()
      .email("Invalid email address")
      .required("Email is required"),
    subject: yup.string(),
    message: yup.string().required("Message is required"),
  });

  async function handleRegister(Values) {
    let { data } = await axios.post("", Values);
    if (data.message === "success") {
      
    } else {
    }
  }

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
    validationSchema,
    onSubmit: handleRegister,
  });

  return (
    <>
      <header className="header-img d-flex justify-content-center align-items-center text-center">
        <div>
          <h1 className="text-center">Contact</h1>
          <span className="fw-bold">
            Home <i class=" fw-bold bi bi-chevron-right"></i>{" "}
            <span className="fw-normal">Contact</span>
          </span>
        </div>
      </header>
      <section className="py-5 d-flex justify-content-center align-items-center text-center">
        <div className="w-50 py-5">
          <h2 className="fw-bold">Get In Touch With Us</h2>
          <p className="text-secondary">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Corporis
            nihil labore vel atque quam! Tempora nesciunt iste omnis obcaecati
            at quod ea, dolore mollitia temporibus.
          </p>
        </div>
      </section>
      <section className="container-fluid py-5">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <div className="">
                <div className="w-50 justify-content-center d-flex mx-5">
                  <span>
                    <i className="bi bi-geo-alt h4"></i>
                  </span>
                  <div className="px-2">
                    <h4>Address</h4>
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Quo, deserunt.
                    </p>
                  </div>
                </div>
                <div className="w-50 justify-content-center d-flex  mx-5">
                  <span>
                    <i class="bi bi-clock h4"></i>
                  </span>
                  <div className="px-2">
                    <h4>Working Time</h4>
                    <p>
                      Monday - Friday : 9:00 AM - 5:00 PM <br />
                      Saturday : 9:00 AM - 1:00 PM
                    </p>
                  </div>
                </div>
                <div className="w-50 justify-content-center d-flex  mx-5">
                  <span>
                    <i className="bi bi-phone h4"></i>
                  </span>
                  <div className="px-2">
                    <h4>Phone</h4>
                    <p>
                      Lorem ipsum dolor sit amet consectetur. <br />
                      Mobile : +91 123456789 <br />
                      Landline : 0123456789 <br />
                      Fax : 0987654321
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 justify-content-center">
              <form onSubmit={formik.handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    className={`form-control p-3${formik.touched.name && formik.errors.name ? " is-invalid" : null}`}
                    id="name"
                    placeholder="abc"
                    name="name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  <div id="validationServerUsernameFeedback" className="invalid-feedback">
        {formik.errors.name}
      </div>
                </div>
                
  
                <div className="mb-3">
                  <label htmlFor="email-address" className="form-label">
                    Email address
                  </label>
                  <input
                    type="email"
                    className={`form-control p-3${formik.touched.email && formik.errors.email ? " is-invalid" : null}`}
                    id="email-address"
                    placeholder="name@example.com"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  <div id="validationServerUsernameFeedback" className="invalid-feedback">
        {formik.errors.email}
      </div>
                </div>
                <div className="mb-3">
                  <label htmlFor="subject" className="form-label">
                    Subject
                  </label>
                  <input
                    type="text"
                    className={`form-control p-3${formik.touched.subject && formik.errors.subject ? " is-invalid" : null}`}
                    id="subject"
                    placeholder="Optional"
                    name="subject"
                    value={formik.values.subject}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  <div id="validationServerUsernameFeedback" className="invalid-feedback">
        {formik.errors.subject}
      </div>
                </div>
                <div className="mb-3">
                  <label htmlFor="message" className="form-label">
                    Message
                  </label>
                  <textarea
                    className={`form-control p-3${formik.touched.message && formik.errors.message ? " is-invalid" : null}`}
                    id="message"
                    rows="3"
                    name="message"
                    placeholder="Hi! Id like to enquire About..."
                    value={formik.values.message}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  ></textarea>
                  <div id="validationServerUsernameFeedback" className="invalid-feedback">
        {formik.errors.message}
      </div>
                </div>
                <button type="submit" class="btn btn-outline-dark px-5">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
