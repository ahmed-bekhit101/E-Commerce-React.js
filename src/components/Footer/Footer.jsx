import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { NavLink } from "react-router-dom";

export default function Footer() {
    const [state, setState] = useState(null);
    useEffect(() => {
        // Your code here
    }, []);
    
  return (
    <>
      <footer>
        <section className="container-fluid" style={{ backgroundColor: "#FAF4F4" }}>
          <div className="container py-5 px-2">
            <div className="row">
              <div className="col-sm-4">
              <h3 className="py-2">Free Delivery</h3>
              <p className="text-secondary">Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, eaque!</p>
              </div>
              <div className="col-sm-4">
              <h3  className="py-2">90 Days Return</h3>
              <p className="text-secondary">Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, eaque!</p>
              </div>
              <div className="col-sm-4 col-6">
              <h3 className="py-2">Secure Payments</h3>
              <p className="text-secondary">Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, eaque!</p>
              </div>
            </div>
          </div>
        </section>
        <section className="container pt-5">
          <div className="row py-3">
            <div className="col-md-4 col-6 justify-content-center align-items-center d-flex flex-column"> 
                <p className="text-secondary"> Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  <br /> FL 573578 USA
                </p>
            </div>
            <div className="col-md-2 col-6">
                <span className="d-block text-secondary pb-3">Links</span>
                <ul className="navbar-nav  mb-2 mb-lg-0" >
        <li className="nav-item py-3">
          <NavLink className="nav-link active" aria-current="page" to="">Home</NavLink>
        </li>
        <li className="nav-item py-3">
          <NavLink className="nav-link" to="shop">Shop</NavLink>
        </li>
        <li className="nav-item py-3">
          <NavLink className="nav-link" to="about">About</NavLink>
        </li>
        <li className="nav-item py-3">
          <NavLink className="nav-link" to="contact">Contact</NavLink>
        </li>
      </ul>
            </div>
            <div className="col-md-2 col-6">
            <span className="d-block text-secondary pb-3">Help</span>
                <ul className="navbar-nav  mb-2 mb-lg-0" >
        <li className="nav-item py-3">
          <NavLink className="nav-link active" aria-current="page" to="">Payment Options</NavLink>
        </li>
        <li className="nav-item py-3">
          <NavLink className="nav-link" to="shop">Returns</NavLink>
        </li>
        <li className="nav-item py-3">
          <NavLink className="nav-link" to="about">Privacy Policies</NavLink>
        </li>
      </ul>
            </div>
            <div className="col-md-4 col-6">
          <span className="d-block text-secondary pb-3">News Letter</span>
          <div className="d-flex">
          <div className="form-floating pe-3">
           <input type="email" class="form-control form-control-made" id="floatingInput" placeholder="name@example.com"/>
           <label htmlForfor="floatingInput">Email address</label>
         </div>
          <button type="button" className="btn btn-outline-dark btn-subscribe px-3">Subscribe</button>
          </div>
          
            </div>
          </div>
          
        </section>
        <div className="container">
        <hr className=" py-1"/>
        <span className="fs-6">Lorem, ipsum dolor. All Rights Reserved</span>
        </div>
        
      </footer>
    </>
  )
}
