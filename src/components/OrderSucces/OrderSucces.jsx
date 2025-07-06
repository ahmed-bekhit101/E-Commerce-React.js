import React from "react";
import { useNavigate } from "react-router-dom"; // Import the useNavigate hook

export default function OrderSuccess() {
  const navigate = useNavigate(); // Use navigate hook for navigation

  // Function to navigate back to the shop
  const goToShop = () => {
    navigate("/shop"); // Redirect to the shop page
  };

  // Function to navigate back to the home page
  const goToHome = () => {
    navigate("/"); // Redirect to the home page
  };

  return (
    <>
      <header className="header-img d-flex justify-content-center align-items-center text-center">
        <div>
          <h1 className="text-center">Order Successful</h1>
          <span className="fw-bold">Home <i className="fw-bold bi bi-chevron-right"></i> <span className="fw-normal">Order Success</span></span>
        </div>
      </header>

      <section className="container py-5">
        <div className="row">
          <div className="col-md-8 mx-auto text-center">
            <div className="alert alert-success">
              <h3 className="fw-bold">Thank you for your purchase!</h3>
              <p>Your order has been successfully placed. You will receive an email confirmation soon.</p>
            </div>

            <div className="d-flex justify-content-center gap-3 mt-5">
              <button className="btn btn-outline-dark py-3 px-5" onClick={goToShop}>
                Go to Shop
              </button>
              <button className="btn btn-outline-dark py-3 px-5" onClick={goToHome}>
                Back to Home
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
