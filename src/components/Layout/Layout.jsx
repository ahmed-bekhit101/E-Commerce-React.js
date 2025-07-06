import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Navbar from "../Navbar/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../Footer/Footer";

export default function Layout() {
    const [state, setState] = useState(null);
    useEffect(() => {
        // Your code here
    }, []);
    
  return (
    <>
      <Navbar/>
      <Outlet></Outlet>
      <Footer/>
    </>
  )
}
