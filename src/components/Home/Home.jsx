import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Home() {
    let [products, setProducts] = useState([]);

    async function getProducts(){
      const response = await axios.get("https://dummyjson.com/products")
      .then((response) => {
        setProducts(response.data.products);
      })
      
    }

    useEffect(() => {
        getProducts();
  
    }, []);
    
  return (
    <>
    <section className="container-fluid" style={{backgroundColor: '#FBEBB5'}}>
<section className="container">
   
      <header className="row align-items-center justify-content-center fs-1 py-5" >
                {products.length > 12 ? (<>
                <div className="col-sm-5">
                <h1 className="fw-bold ">{products[12].title}</h1>
                <button className="btn btn-outline-dark btn-subscribe mt-3"><Link to="/shop" className="btn fs-4">Go to Shop</Link></button>
                
                </div>
                    
                    <div className="col-sm-6">
                    <img className="w-100" src={products[12].thumbnail} alt="Product Thumbnail" />
                    </div>
                   
                    </>
                ) : (
                    <p>Loading...</p>
                )}
            </header>
            </section>
            </section>
            <section className="container-fluid" style={{backgroundColor:"#FAF4F4"}}>
            <section className="container py-5 justify-content-center">
              <div className="row">
                {products.length >12 ?<> <div className="col-sm-6 text-center">
                    <img className="w-75" src={products[13].thumbnail} alt="" />
                    <h2 className=" h5 ">{products[13].title}</h2>
                <button className="btn btn-outline-dark btn-subscribe"><Link to="/shop" className="btn">View More</Link></button>


                  </div>
                  <div className="col-sm-6 text-center">
                    <img className="w-75" src={products[14].thumbnail} alt="" />
                    <h2 className=" h5 ">{products[14].title}</h2>
                <button className="btn btn-outline-dark btn-subscribe"><Link to="/shop" className="btn">View More</Link></button>


                  </div></>: <p>Loading</p>}
                  
                  
              </div>
            </section>
            </section>
            
            <section className="container py-5">
              <div className="text-center">
                  <h2 className="fw-bold">Top Picks for You!</h2>
                  <p className="text-secondary my-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid quod est, hic corporis eaque molestiae.</p>
              </div>
              <div className="row mt-5">
                 {products.slice(11,15).map((product) => (
                   <div className="col-sm-3">
                    <img className="w-100" src={product.thumbnail} alt="" />
                    <h2 className=" h5 text-secondary">{product.title}</h2>
                    <h5 className=" fs-5 py-2"> RS. {product.price}</h5>
                
                 </div>

                 ))}

              </div>
              <div className="text-center mt-5">
              <button className="btn btn-outline-dark btn-subscribe"><Link to="/shop" className="btn">View More</Link></button>
              </div>

            </section>
            <section className="container-fluid"  style={{backgroundColor: '#FBEBB5'}}> 
              <div className="row align-items-center">
                  {products.length>11?<><div className="col-md-8 text-end">
                    <img src={products[11].thumbnail} className="w-100" alt="" />
                  </div>
                  <div className="col-md-4 text-center">
                    <span className="h4 d-block">New Arrivals</span>
                    <h1 className=" fw-bold my-3">{products[11].title}</h1>
                    <button className="btn btn-outline-dark"><Link to="/shop" className="btn">View More</Link></button>
                  </div></>:<p>Loading...</p>}
              </div>
            </section>
    </>
    
  )
  
}