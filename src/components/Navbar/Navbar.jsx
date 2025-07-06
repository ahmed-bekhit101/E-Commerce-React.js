import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useCart } from "../CartContext/CartContext";

export default function Navbar() {
  const { cart, removeFromCart, addToCart, decrementQuantity } = useCart();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
    window.location.reload();
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-transparent">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">LOGO</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarText">
            <ul className="navbar-nav mb-2 mb-lg-0 d-flex justify-content-center flex-grow-1">
              <li className="nav-item px-5">
                <NavLink className="nav-link" aria-current="page" to="">Home</NavLink>
              </li>
              <li className="nav-item px-5">
                <NavLink className="nav-link" to="shop">Shop</NavLink>
              </li>
              <li className="nav-item px-5">
                <NavLink className="nav-link" to="contact">Contact</NavLink>
              </li>
            </ul>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 d-flex flex-row">
              {token ? (
                <>
                  <li className="nav-item px-2">
                    <button onClick={handleLogout} className="btn btn-link nav-link text-dark p-0">
                      <i className="bi bi-box-arrow-right fs-5"></i>
                    </button>
                  </li>
                  <li className="nav-item px-2">
                    <div className="nav-link position-relative" onClick={togglePopup} style={{ cursor: "pointer" }}>
                      <i className="bi bi-cart fs-5"></i>
                      <span className="badge position-absolute top-0 end-0 rounded-pill bg-danger ms-1">
                        {cart.length}
                      </span>
                    </div>
                  </li>
                </>
              ) : (
                <li className="nav-item px-2">
                  <NavLink className="nav-link" to="login">
                    <i className="bi bi-person-circle fs-5"></i>
                  </NavLink>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>

      {isPopupOpen && (
        <div
          className="position-fixed top-0 end-0 p-4 bg-white shadow-lg rounded-3 w-75 w-md-50"
          style={{ zIndex: 1050, maxHeight: "80vh", overflowY: "auto", overflowX: "auto" }}
        >
          <h5>Your Cart</h5>
          {cart.length === 0 ? (
            <p className="text-center fs-5">Your cart is empty.</p>
          ) : (
            <div className="row">
              <div className="col-lg-12">
                <table className="table table-hover text-center">
                  <thead>
                    <tr>
                      <th>Image</th>
                      <th>Product</th>
                      <th>Color</th>
                      <th>Size</th>
                      <th>Price</th>
                      <th>Quantity</th>
                      <th>Total</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cart.map((item) => (
                      <tr key={`${item.id}-${item.size}-${item.color}`}>
                        <td className="align-middle">
                          <img
                            src={item.thumbnail}
                            alt={item.title}
                            style={{ width: "50px", height: "50px", backgroundColor: "#FFF9E5" }}
                            className="rounded"
                          />
                        </td>
                        <td className="align-middle">{item.title}</td>
                        <td className="align-middle">
                          <span
                            style={{
                              display: "inline-block",
                              width: "20px",
                              height: "20px",
                              backgroundColor: item.color,
                              borderRadius: "50%",
                            }}
                          ></span>
                        </td>
                        <td className="align-middle">{item.size}</td>
                        <td className="align-middle">RS. {item.price}</td>
                        <td className="align-middle">
                          <div className="d-flex align-items-center">
                            <button
                              className="btn btn-outline-dark mx-2"
                              onClick={() => addToCart({ ...item, quantity: 1 })}
                            >
                              +
                            </button>
                            {item.quantity}
                            <button
                              className="btn btn-outline-dark mx-2"
                              onClick={() => decrementQuantity(item)}
                            >
                              -
                            </button>
                          </div>
                        </td>
                        <td className="align-middle">
                          RS. {Math.round(item.price * item.quantity * 100) / 100}
                        </td>
                        <td className="align-middle">
                          <button
                            className="btn btn-outline-danger"
                            onClick={() => removeFromCart(item)}
                          >
                            <i className="bi bi-trash"></i>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          <div className="d-flex justify-content-between mt-3">
            <button className="btn btn-outline-dark" onClick={togglePopup}>
              Close
            </button>
            <NavLink to="/cart" className="btn btn-outline-dark" onClick={() => setIsPopupOpen(false)}>
              Go to Cart
            </NavLink>
            <NavLink to="/checkout" className="btn btn-outline-dark" onClick={() => setIsPopupOpen(false)} disabled={cart.length === 0}>
              Go to Checkout
            </NavLink>
          </div>
        </div>
      )}
    </>
  );
}
