import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useCart } from "../CartContext/CartContext";
import { useFormik } from "formik";
import * as Yup from "yup";
useFormik

export default function ProductDetails() {

  const formik = useFormik({
    initialValues: {
      quantity: 1,
      size: "",
      color: "",
    },
    validationSchema: Yup.object({
      quantity: Yup.number()
        .min(1, "Minimum quantity is 1")
        .required("Quantity is required"),
      size: Yup.string().required("Please select a size"),
      color: Yup.string().required("Please select a color"),
    }),
    onSubmit: (values) => {
      addToCart({  ...product,
        quantity: values.quantity,
        size: values.size,
        color: values.color });
    },
  });
              

  const {cart, addToCart} = useCart();

  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(""); // State htmlFor main image
  const [quantity, setQuantity] = useState(1); // Default quantity is 1
  const [relatedProduct, setRelatedProduct] = useState([]);

  async function getrelatedProducts (){
    const response = await axios.get(`https://dummyjson.com/products`);
    setRelatedProduct(response.data.products);
  }
  useEffect(() => {
    getrelatedProducts();
  }, []);

  // Function to render the rating stars
  const renderRating = (rating) => {
    const fullStars = Math.floor(rating); // Full stars
    const halfStars = rating % 1 >= 0.5 ? 1 : 0; // Half star if decimal
    const emptyStars = 5 - fullStars - halfStars; // Remaining empty stars

    return (
      <>
        {[...Array(fullStars)].map((_, index) => (
          <i key={`full-${index}`} className="bi bi-star-fill text-warning px-1"></i> // Full star
        ))}
        {[...Array(halfStars)].map((_, index) => (
          <i key={`half-${index}`} className="bi bi-star-half text-warning px-1"></i> // Half star
        ))}
        {[...Array(emptyStars)].map((_, index) => (
          <i key={`empty-${index}`} className="bi bi-star text-warning px-1"></i> // Empty star
        ))}
      </>
    );
  };

  // Fetch product details
  useEffect(() => {
    async function fetchProduct() {
      const response = await axios.get(`https://dummyjson.com/products/${id}`);
      setProduct(response.data);
      setSelectedImage(response.data.images[0]); // Default to first image
    }
    fetchProduct();
  }, [id]);


  if (!product) return <p>Loading...</p>;

  return (
    <>
      {/* Breadcrumb Navigation */}
      <section className="container">
        <span className="d-flex flex-row align-items-center py-3">
          <Link to="/" className="text-secondary me-3">Home</Link>
          <i className="bi bi-chevron-right me-3"></i>
          <Link to="/shop" className="me-3">Shop</Link>
          <i className="bi bi-chevron-right me-3"></i>
          <span className="text-secondary fs-1 fw-light pb-2 me-3">|</span>
          {product.title}
        </span>
      </section>

      {/* Product Details */}
      <section className="container py-5">
        <div className="row align-items-center">
          {/* Image Gallery */}
          <div className="col-md-6 px-2">
            <div className="row">
              {/* Thumbnails */}
              <div className="col-md-2">
                {product.images.map((image, index) => (
                  <img
                    key={index}
                    className="w-100 mb-2 rounded"
                    src={image}
                    alt=""
                    onClick={() => setSelectedImage(image)}
                    style={{
                      cursor: "pointer",
                      backgroundColor: '#FFF9E5'
                    }}
                  />
                ))}
              </div>

              {/* Main Image */}
              <div className="col-md-10 p-1">
                <img className="w-100 rounded" src={selectedImage} alt="Selected Product"  style={{backgroundColor: '#FFF9E5'}}/>
              </div>
            </div>
          </div>

          {/* Product Info */}
          <div className="col-md-6 px-5">
            <h1 className="fw-normal pb-1">{product.title}</h1>
            <h3 className="text-secondary py-1">Price: RS. {product.price}</h3>
            <span className="d-flex align-items-center flex-row fs-5">
              {renderRating(product.rating)} <span className="text-secondary fs-1 fw-light pb-2 mx-3">|</span>
              <span className="text-secondary">{product.reviews.length} Customer Reviews</span>
            </span>
            <p>{product.description}</p>

            <form onSubmit={formik.handleSubmit}></form>

            <span className="text-secondary mt-1 mb-1 d-block">Color</span>
<div className="d-flex justify-content-between mb-1" style={{ maxWidth: "200px" }}>
  <input
    type="radio"
    className="btn-check"
    name="color"
    id="blue-outlined"
    value="blue"
    onChange={formik.handleChange}
    checked={formik.values.color === "blue"}
  />
  <label className="btn btn-outline-primary p-3" htmlFor="blue-outlined"></label>

  <input
    type="radio"
    className="btn-check"
    name="color"
    id="checked-outlined"
    value="gray"
    onChange={formik.handleChange}
    checked={formik.values.color === "gray"}
  />
  <label className="btn btn-outline-secondary p-3" htmlFor="checked-outlined"></label>

  <input
    type="radio"
    className="btn-check"
    name="color"
    id="success-outlined"
    value="green"
    onChange={formik.handleChange}
    checked={formik.values.color === "green"}
  />
  <label className="btn btn-outline-success p-3" htmlFor="success-outlined"></label>

  <input
    type="radio"
    className="btn-check"
    name="color"
    id="danger-outlined"
    value="red"
    onChange={formik.handleChange}
    checked={formik.values.color === "red"}
  />
  <label className="btn btn-outline-danger p-3" htmlFor="danger-outlined"></label>
</div>
{formik.touched.color && formik.errors.color && (
  <div className="text-danger">{formik.errors.color}</div>
)}

<span className="text-secondary mt-1 mb-2 d-block">Size</span>
<div className="d-flex justify-content-between mb-1" style={{ maxWidth: "200px" }}>
  <input
    type="radio"
    className="btn-check"
    name="size"
    id="blue-size"
    value="sm"
    onChange={formik.handleChange}
    checked={formik.values.size === "sm"}
  />
  <label className="btn btn-outline-dark p-2" htmlFor="blue-size">sm</label>

  <input
    type="radio"
    className="btn-check"
    name="size"
    id="checked-size"
    value="md"
    onChange={formik.handleChange}
    checked={formik.values.size === "md"}
  />
  <label className="btn btn-outline-dark p-2" htmlFor="checked-size">md</label>

  <input
    type="radio"
    className="btn-check"
    name="size"
    id="success-size"
    value="lg"
    onChange={formik.handleChange}
    checked={formik.values.size === "lg"}
  />
  <label className="btn btn-outline-dark p-2" htmlFor="success-size">lg</label>

  <input
    type="radio"
    className="btn-check"
    name="size"
    id="danger-size"
    value="xl"
    onChange={formik.handleChange}
    checked={formik.values.size === "xl"}
  />
  <label className="btn btn-outline-dark p-2" htmlFor="danger-size">xl</label>
</div>
{formik.touched.size && formik.errors.size && (
  <div className="text-danger">{formik.errors.size}</div>
)}

{/* Quantity Controls */}
<div className="d-flex align-items-center">
  {/* Input field with increment and decrement buttons inside */}
  <div className="input-group py-3" style={{ maxWidth: "200px" }}>
    {/* Decrement button */}
    <button
      onClick={() => formik.setFieldValue("quantity", Math.max(1, formik.values.quantity - 1))}
      className="btn btn-outline-secondary"
    >
      -
    </button>

    {/* Input field for quantity */}
    <input
      id="quantity"
      type="number"
      value={formik.values.quantity}
      min="1"
      onChange={formik.handleChange}
      className="form-control text-center py-3"
      readOnly
    />

    {/* Increment button */}
    <button
      onClick={() => formik.setFieldValue("quantity", formik.values.quantity + 1)}
      className="btn btn-outline-secondary"
    >
      +
    </button>
  </div>
</div>

{/* Add to Cart Button */}
<div className="d-flex mt-3">
  <button
    type="submit"
    className="btn btn-outline-dark px-5 py-3 fw-bold"
    onClick={formik.handleSubmit}
  >
    Add to Cart
  </button>
</div>

            
          </div>
        </div>
      </section>
      <section className="container">
        <div class="row flex-end">
          <div className="col-md-6">

          </div>
          <div className="col-md-6">
                <hr />
                <table className="text-secondary">
                
                <tr>
  <td className="py-2">Sku :</td>
  <td className="ps-5 py-2">{product.sku}</td>
</tr>

<tr>
  <td className="py-2">Category :</td>
  <td className="ps-5 py-2">{product.category}</td>
</tr>

<tr>
  <td className="py-2">Tag :</td>
  <td className="ps-5 py-2">{Array.isArray(product.tags) ? product.tags.join(", ") : product.tags}</td>
</tr>
<tr>
  <td className="py-2">Share :</td>
  <td className="ps-5 py-2"><i class="bi bi-facebook px-2"></i> <i class="bi bi-instagram px-2 "></i> <i class="bi bi-linkedin px-2"></i></td>
</tr>

                  
                </table>
          </div>
          
        </div>

      </section>
      <hr className="my-5" />
      <section className="container py-5">
        <h1 className="text-center ">Related Products</h1>
        <div className="row">
        {relatedProduct.length > 0 ? (
      relatedProduct
        .filter((item) => item.category === product.category)
        .filter((item) => item.id !== product.id)
        .slice(0,4) // Match category
        .map((product) => (
          <div key={product.id} className="col-lg-3 col-6 col-md-4 p-3">
                        <img
                          className="w-100"
                          src={product.thumbnail}
                          alt={product.title}
                        />
                        <h6 className="fs-6 text-secondary">{product.title}</h6>
                        <p className="fs-4">RS. {product.price}</p>
                        <div className="d-flex flex-sm-column flex-xl-row justify-content-between">
                      
                        <Link to={`/product/${product.id}`} className="btn btn-outline-dark">
                          View Details
                        </Link>
                        </div>
                      </div>
        ))
    ) : (
      <p>No related products found.</p>
    )}
        </div>

      </section>

      {/* Fixed Bottom Bar */}
            {cart.length > 0 && (
              <div className="fixed-bottom-bar">
                <div className="container d-flex justify-content-between align-items-center">
                  <span className="fw-bold">{cart.length} item(s) in cart</span>
                  <Link to="/cart" className="btn btn-dark">View Cart</Link>
                </div>
              </div>
            )}
    </>
  );
}
