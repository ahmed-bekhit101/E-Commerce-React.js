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
              <li className="nav-item px-3">
                <NavLink className="nav-link" to="">Home</NavLink>
              </li>
              <li className="nav-item px-3">
                <NavLink className="nav-link" to="shop">Shop</NavLink>
              </li>
              <li className="nav-item px-3">
                <NavLink className="nav-link" to="contact">Contact</NavLink>
              </li>
            </ul>
            <ul className="navbar-nav ms-auto d-flex flex-row align-items-center">
              {token ? (
                <>
                  <li className="nav-item px-2">
                    <button onClick={handleLogout} className="btn btn-link nav-link text-dark p-0">
                      <i className="bi bi-box-arrow-right fs-4"></i>
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
        <div className="position-fixed top-0 end-0 p-3 bg-white shadow-lg rounded-3" style={{ width: "100%", maxWidth: "400px", zIndex: 1050, height: "100vh", overflowY: "auto" }}>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5 className="mb-0">Your Cart</h5>
            <button className="btn-close" onClick={togglePopup}></button>
          </div>

          {cart.length === 0 ? (
            <p className="text-center fs-5">Your cart is empty.</p>
          ) : (
            <div className="d-flex flex-column gap-3">
              {cart.map((item) => (
                <div key={`${item.id}-${item.size}-${item.color}`} className="card">
                  <div className="card-body d-flex flex-column gap-2">
                    <div className="d-flex align-items-center gap-3">
                      <img src={item.thumbnail} alt={item.title} style={{ width: "60px", height: "60px", backgroundColor: "#FFF9E5" }} className="rounded" />
                      <div className="flex-grow-1">
                        <h6 className="mb-1">{item.title}</h6>
                        <div className="d-flex align-items-center gap-2">
                          <span className="badge bg-secondary">{item.size}</span>
                          <span className="rounded-circle border" style={{ width: "18px", height: "18px", backgroundColor: item.color }}></span>
                        </div>
                      </div>
                      <button className="btn btn-sm btn-outline-danger" onClick={() => removeFromCart(item)}>
                        <i className="bi bi-trash"></i>
                      </button>
                    </div>
                    <div className="d-flex justify-content-between align-items-center">
                      <span>Price: RS. {item.price}</span>
                      <span>Total: RS. {Math.round(item.price * item.quantity * 100) / 100}</span>
                    </div>
                    <div className="d-flex justify-content-center align-items-center">
                      <button className="btn btn-outline-dark btn-sm mx-2" onClick={() => decrementQuantity(item)}>-</button>
                      <span>{item.quantity}</span>
                      <button className="btn btn-outline-dark btn-sm mx-2" onClick={() => addToCart({ ...item, quantity: 1 })}>+</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="d-flex justify-content-between mt-4">
            <NavLink to="/cart" className="btn btn-outline-dark w-50 me-2" onClick={() => setIsPopupOpen(false)}>
              View Cart
            </NavLink>
            <NavLink to="/checkout" className="btn btn-dark w-50" onClick={() => setIsPopupOpen(false)} disabled={cart.length === 0}>
              Checkout
            </NavLink>
          </div>
        </div>
      )}
    </>
  );
}
