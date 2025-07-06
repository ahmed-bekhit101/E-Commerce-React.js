import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Select from "react-select";
import { useCart } from "../CartContext/CartContext";
import { useNavigate } from "react-router-dom"; // Import useNavigate

export default function CheckOut() {
  const [countries, setCountries] = useState([]);
  const { cart } = useCart();
  const navigate = useNavigate(); // Initialize navigate hook

  // Handling payment method dynamic fields
  const [paymentDetails, setPaymentDetails] = useState("");

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((res) => res.json())
      .then((data) => {
        const countryOptions = data.map((country) => ({
          value: country.cca2,
          label: country.name.common,
        }));
        setCountries(countryOptions);
      });
  }, []);

  // Formik setup with validation
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      zip: "",
      country: "",
      paymentMethod: "",
      cardNumber: "",
      cardExpiry: "",
      cardCvc: "",
      paypalEmail: "",
      bankAccount: "",
      bankName: "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string().min(2, "First name must be at least 2 characters").required("First name is required"),
      lastName: Yup.string().min(2, "Last name must be at least 2 characters").required("Last name is required"),
      email: Yup.string().email("Invalid email address").required("Email is required"),
      phone: Yup.string().matches(/^[0-9]+$/, "Phone number is not valid").min(10, "Phone number must be at least 10 digits").required("Phone number is required"),
      address: Yup.string().min(10, "Address must be at least 10 characters").required("Address is required"),
      city: Yup.string().required("City is required"),
      zip: Yup.string().required("Zip code is required"),
      country: Yup.string().required("Country is required"),
      paymentMethod: Yup.string().required("Please select a payment method"),
      cardNumber: Yup.string().when("paymentMethod", {
        is: "creditCard",
        then: Yup.string().required("Card number is required").min(16, "Card number must be 16 digits"),
      }),
      cardExpiry: Yup.string().when("paymentMethod", {
        is: "creditCard",
        then: Yup.string().required("Card expiry date is required"),
      }),
      cardCvc: Yup.string().when("paymentMethod", {
        is: "creditCard",
        then: Yup.string().required("Card CVC is required").min(3, "CVC must be 3 digits"),
      }),
      paypalEmail: Yup.string().when("paymentMethod", {
        is: "paypal",
        then: Yup.string().email("Invalid email address").required("PayPal email is required"),
      }),
      bankAccount: Yup.string().when("paymentMethod", {
        is: "bankTransfer",
        then: Yup.string().required("Bank account number is required"),
      }),
      bankName: Yup.string().when("paymentMethod", {
        is: "bankTransfer",
        then: Yup.string().required("Bank name is required"),
      }),
    }),
    onSubmit: (values) => {
      // Check if the cart is empty before submitting
      if (cart.length === 0) {
        alert("Your cart is empty. Please add items to the cart.");
        navigate("/"); // Navigate to home or shopping page if cart is empty
        return;
      }

      // After form submission, navigate to Order Success page
      navigate("/ordersuccess"); // Navigate to the order success page
    },
  });

  // Handling payment method selection
  const handlePaymentChange = (e) => {
    formik.setFieldValue("paymentMethod", e.target.value);
    setPaymentDetails(e.target.value);
  };

  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <>
      <header className="header-img d-flex justify-content-center align-items-center text-center">
        <div>
          <h1 className="text-center">Checkout</h1>
          <span className="fw-bold">Home <i className="fw-bold bi bi-chevron-right"></i> <span className="fw-normal">Checkout</span></span>
        </div>
      </header>

      <section className="container">
        <div className="row py-5">
          {/* Billing Details - First Column */}
          <div className="col-md-6" style={{ overflowY: "auto" }}>
            <form onSubmit={formik.handleSubmit} className="w-75 mx-auto">
              <h2 className="h1 fw-bold">Billing Details</h2>

              {/* First Name */}
              <div className="mb-3">
                <label htmlFor="firstName" className="form-label">First Name</label>
                <input type="text" className={`form-control p-4 ${formik.touched.firstName && formik.errors.firstName ? "is-invalid" : ""}`} id="firstName" name="firstName" value={formik.values.firstName} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                <div className="invalid-feedback">{formik.errors.firstName}</div>
              </div>

              {/* Last Name */}
              <div className="mb-3">
                <label htmlFor="lastName" className="form-label">Last Name</label>
                <input type="text" className={`form-control p-4 ${formik.touched.lastName && formik.errors.lastName ? "is-invalid" : ""}`} id="lastName" name="lastName" value={formik.values.lastName} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                <div className="invalid-feedback">{formik.errors.lastName}</div>
              </div>

              {/* Email */}
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email Address</label>
                <input type="email" className={`form-control p-4 ${formik.touched.email && formik.errors.email ? "is-invalid" : ""}`} id="email" name="email" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                <div className="invalid-feedback">{formik.errors.email}</div>
              </div>

              {/* Address */}
              <div className="mb-3">
                <label htmlFor="address" className="form-label">Address</label>
                <input type="text" className={`form-control p-4 ${formik.touched.address && formik.errors.address ? "is-invalid" : ""}`} id="address" name="address" value={formik.values.address} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                <div className="invalid-feedback">{formik.errors.address}</div>
              </div>

              {/* Country */}
              <div className="mb-3">
                <label htmlFor="country" className="form-label">Country</label>
                <Select
                  options={countries}
                  onChange={(selectedOption) => formik.setFieldValue("country", selectedOption?.value)}
                  onBlur={formik.handleBlur}
                  value={countries.find(country => country.value === formik.values.country)}
                  className={`${formik.touched.country && formik.errors.country ? "is-invalid" : ""}`}
                />
                {formik.errors.country && formik.touched.country && <div className="invalid-feedback">{formik.errors.country}</div>}
              </div>
            </form>
          </div>

          {/* Order Summary & Payment Method - Second Column */}
          <div className="col-md-6">
            <div className="order-summary">
              <h2 className="h1 fw-bold">Order Summary</h2>
              <table className="table">
                <thead>
                  <tr>
                    <th className="text-start">Product</th>
                    <th className="text-end">Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map((item) => (
                    <tr key={item.id}>
                      <td className="d-flex align-items-center py-2">
                        <div>
                          <div className="fs-6"><span className="text-secondary">{item.title.split(" ").slice(0, 2).join(" ")}...</span> x {item.quantity} = RS. {Math.round(item.price * item.quantity * 100) / 100}</div>
                        </div>
                      </td>
                      <td className="text-end">RS. {Math.round(item.price * item.quantity * 100) / 100}</td>
                    </tr>
                  ))}
                  <tr>
                    <td className="fw-bold">Total</td>
                    <td className="text-end fw-bold text-warning" style={{ fontSize: "1.5rem" }}>RS. {Math.round(totalPrice * 100) / 100}</td>
                  </tr>
                </tbody>
              </table>

              {/* Payment Method Selection */}
              <div className="mb-3">
                <label className="form-label">Payment Method</label>
                <select className={`form-select ${formik.touched.paymentMethod && formik.errors.paymentMethod ? "is-invalid" : ""}`} name="paymentMethod" value={formik.values.paymentMethod} onChange={handlePaymentChange} onBlur={formik.handleBlur}>
                  <option value="">Select Payment Method</option>
                  <option value="creditCard">Credit Card</option>
                  <option value="paypal">PayPal</option>
                  <option value="bankTransfer">Bank Transfer</option>
                  <option value="cashOnDelivery">Cash on Delivery</option>
                </select>
                {formik.errors.paymentMethod && formik.touched.paymentMethod && <div className="invalid-feedback">{formik.errors.paymentMethod}</div>}
              </div>

              {/* Payment Method Details */}
              {paymentDetails === "creditCard" && (
                <>
                  <div className="mb-3">
                    <label htmlFor="cardNumber" className="form-label">Card Number</label>
                    <input type="text" className={`form-control p-4 ${formik.touched.cardNumber && formik.errors.cardNumber ? "is-invalid" : ""}`} id="cardNumber" name="cardNumber" value={formik.values.cardNumber} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                    <div className="invalid-feedback">{formik.errors.cardNumber}</div>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="cardExpiry" className="form-label">Card Expiry</label>
                    <input type="text" className={`form-control p-4 ${formik.touched.cardExpiry && formik.errors.cardExpiry ? "is-invalid" : ""}`} id="cardExpiry" name="cardExpiry" value={formik.values.cardExpiry} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                    <div className="invalid-feedback">{formik.errors.cardExpiry}</div>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="cardCvc" className="form-label">Card CVC</label>
                    <input type="text" className={`form-control p-4 ${formik.touched.cardCvc && formik.errors.cardCvc ? "is-invalid" : ""}`} id="cardCvc" name="cardCvc" value={formik.values.cardCvc} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                    <div className="invalid-feedback">{formik.errors.cardCvc}</div>
                  </div>
                </>
              )}

              {paymentDetails === "paypal" && (
                <div className="mb-3">
                  <label htmlFor="paypalEmail" className="form-label">PayPal Email</label>
                  <input type="email" className={`form-control p-4 ${formik.touched.paypalEmail && formik.errors.paypalEmail ? "is-invalid" : ""}`} id="paypalEmail" name="paypalEmail" value={formik.values.paypalEmail} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                  <div className="invalid-feedback">{formik.errors.paypalEmail}</div>
                </div>
              )}

              {paymentDetails === "bankTransfer" && (
                <>
                  <div className="mb-3">
                    <label htmlFor="bankName" className="form-label">Bank Name</label>
                    <input type="text" className={`form-control p-4 ${formik.touched.bankName && formik.errors.bankName ? "is-invalid" : ""}`} id="bankName" name="bankName" value={formik.values.bankName} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                    <div className="invalid-feedback">{formik.errors.bankName}</div>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="bankAccount" className="form-label">Bank Account Number</label>
                    <input type="text" className={`form-control p-4 ${formik.touched.bankAccount && formik.errors.bankAccount ? "is-invalid" : ""}`} id="bankAccount" name="bankAccount" value={formik.values.bankAccount} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                    <div className="invalid-feedback">{formik.errors.bankAccount}</div>
                  </div>
                </>
              )}

              {paymentDetails && (
                <div className="mb-3">
                  <button type="submit" className="btn btn-primary w-100 p-4 fw-bold">Confirm Order</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
