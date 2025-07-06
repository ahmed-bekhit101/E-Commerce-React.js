import React from "react";
import { useCart } from "../CartContext/CartContext";
import { Link } from "react-router-dom";

export default function Cart() {
  const { cart, addToCart, removeFromCart, decrementQuantity } = useCart();

  // Calculate total price
  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (<><header className="header-img d-flex justify-content-center align-items-center text-center">
    <div>
      <h1 className="text-center">Cart</h1>
      <span className="fw-bold">
        Home <i class=" fw-bold bi bi-chevron-right"></i>{" "}
        <span className="fw-normal">Cart</span>
      </span>
    </div>
  </header> 
    
    <div className="container py-5">
      

      {cart.length === 0 ? (
        <p className="text-center fs-5">Your cart is empty.</p>
      ) : (
        <>
          <div className="row">
            <div className="col-lg-9">
              <table className="table table-hover text-center">
                <thead className="">
                  <tr  className="">
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
                          style={{ width: "50px", height: "50px" , backgroundColor: "#FFF9E5"}}
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
            <div className="col-lg-3 rounded p-2" style={{backgroundColor: '#FFF9E5'}}>
              <h2 className="fw-bold py-3 text-center">Cart Totals</h2>
              <div className="d-flex justify-content-around pb-3">
                <span className="fs-4 text-secondary">Total :</span>
                <span className="px-3 fs-4">RS. {Math.round(totalPrice * 100) / 100}</span> 
              </div>
              <div>
                
                <button className="btn btn-outline-dark mx-1"><Link to="/checkout" className="btn">Checkout</Link></button>
                <button className="btn btn-outline-dark  my-1  mx-1"><Link className="btn" to="/shop">Continue Shopping</Link></button>
                

                <div className="d-flex mt-5">
                  <span className="fs-6">
                    <i className="bi bi-info-circle"></i>{" "}
                    Clicking "Checkout" will redirect to the payment gateway.
                  </span>
                </div>

                <div className="d-flex mt-2">
                  <span className="fs-6">
                    <i className="bi bi-info-circle"></i>{" "}
                    Your order will be delivered to the address provided in your profile.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
    </>
  );
  
}

