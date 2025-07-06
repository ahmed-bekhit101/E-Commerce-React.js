import axios from "axios";
import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";
import { useCart } from "../CartContext/CartContext";




export default function Shop() {

  const {cart, addToCart} = useCart();


  const [recentProducts, setRecentProducts] = useState([]); // Original product list
  const [filteredProducts, setFilteredProducts] = useState([]); // Filtered and sorted product list
  const [currentItems, setCurrentItems] = useState([]); // Current paginated items
  const [pageCount, setPageCount] = useState(0); // Total number of pages
  const [itemOffset, setItemOffset] = useState(0); // Offset for pagination
  const itemsPerPage = 12;

  const [sortOption, setSortOption] = useState(""); // Sorting state
  const [searchQuery, setSearchQuery] = useState(""); // Search query state
  const [categoryFilter, setCategoryFilter] = useState(""); // Category filter state
  const [dropdownVisible, setDropdownVisible] = useState(false); // Dropdown visibility state

  // Fetch products from API
  useEffect(() => {
    axios
      .get("https://dummyjson.com/products")
      .then((response) => {
        setRecentProducts(response.data.products);
        setFilteredProducts(response.data.products); // Initialize filtered products
        setPageCount(Math.ceil(response.data.products.length / itemsPerPage));
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);

  // Update filtered and paginated products based on filters, search, and sort
  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    let filtered = [...recentProducts];

    // Apply category filter
    if (categoryFilter) {
      filtered = filtered.filter(
        (product) =>
          product.category.toLowerCase() === categoryFilter.toLowerCase()
      );
    }

    // Apply search query filter
    if (searchQuery) {
      filtered = filtered.filter((product) =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply sorting
    if (sortOption === "price-asc") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortOption === "price-desc") {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sortOption === "alpha-asc") {
      filtered.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortOption === "alpha-desc") {
      filtered.sort((a, b) => b.title.localeCompare(a.title));
    }

    setFilteredProducts(filtered); // Update filtered products
    setCurrentItems(filtered.slice(itemOffset, endOffset)); // Update current page items
    setPageCount(Math.ceil(filtered.length / itemsPerPage)); // Update page count
  }, [recentProducts, categoryFilter, searchQuery, sortOption, itemOffset]);

  // Handle page change for pagination
  function handlePageClick(event) {
    const newOffset = (event.selected * itemsPerPage) % filteredProducts.length;
    setItemOffset(newOffset);
  }

  // Handle sorting change
  function handleSortChange(e) {
    setSortOption(e.target.value);
    setItemOffset(0); // Reset to the first page
  }

  // Handle search input change
  function handleSearchChange(e) {
    setSearchQuery(e.target.value);
    setItemOffset(0); // Reset to the first page
  }

  // Handle category filter change
  function handleCategoryFilter(category) {
    setCategoryFilter(category);
    setDropdownVisible(false); // Close dropdown
    setItemOffset(0); // Reset to the first page
  }

  // Reset filters, search, and sort
  function handleReset() {
    setSearchQuery("");
    setSortOption("");
    setCategoryFilter("");
    setDropdownVisible(false);
    setItemOffset(0);
    setFilteredProducts(recentProducts); // Reset filtered products
    setPageCount(Math.ceil(recentProducts.length / itemsPerPage));
  }

  return (
    <>
      <header className="header-img d-flex justify-content-center align-items-center text-center">
        <div>
          <h1 className="text-center">Shop</h1>
          <span className="fw-bold">
            Home <i className="fw-bold bi bi-chevron-right"></i>{" "}
            <span className="fw-normal">Shop</span>
          </span>
        </div>
      </header>
        <div className="container-fluid text-lg-center"  style={{backgroundColor: '#FAF4F4'}}>
        <div className="py-4 ">
          <div className="row">
          <div className="dropdown cursor-pointer col-lg-6 py-1">
            <span
              className="btn btn-outline-dark"
              onClick={() => setDropdownVisible(!dropdownVisible)} // Toggle dropdown visibility
            >
              <i
                className={
                  dropdownVisible ? "bi bi-chevron-down fs-5" : "bi bi-filter fs-5"
                }
              >
                {" "}
                Filter
              </i>
            </span>
            <span className="fs-5">
              <span className="fs-2 text-secondary"> | </span>
              <span>
                Showing {currentItems.length > 0 ? itemOffset + 1 : 0}-
                {currentItems.length > 0
                  ? Math.min(itemOffset + itemsPerPage, filteredProducts.length)
                  : 0}{" "}
                of {filteredProducts.length} products
              </span>
            </span>

            {/* Dropdown Menu */}
            {dropdownVisible && (
              <div className="dropdown-menu show">
                <button
                  className="dropdown-item"
                  onClick={() => handleCategoryFilter("beauty")}
                >
                  Beauty
                </button>
                <button
                  className="dropdown-item"
                  onClick={() => handleCategoryFilter("groceries")}
                >
                  Groceries
                </button>
                <button
                  className="dropdown-item"
                  onClick={() => handleCategoryFilter("furniture")}
                >
                  Furniture
                </button>
                <button
                  className="dropdown-item"
                  onClick={() => handleCategoryFilter("")} // Reset category filter
                >
                  All
                </button>
              </div>
            )}
          </div>
          <div className="d-flex flex-sm-column flex-lg-row align-items-start col-lg-6 py-1">
            {/* Search Bar */}
            <input
              type="text"
              className="form-control w-auto me-2 d-block mb-2 mb-lg-0"
              placeholder="Search by title..."
              value={searchQuery}
              onChange={handleSearchChange}
            />
            {/* Sort Dropdown */}
            <select
              className="form-select w-auto me-2 mb-2 mb-lg-0"
              value={sortOption}
              onChange={handleSortChange}
            >
              <option value="">Sort By</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="alpha-asc">Alphabetically: A to Z</option>
              <option value="alpha-desc">Alphabetically: Z to A</option>
            </select>

            {/* Reset Button */}
            <button
              className="btn btn-outline-danger ms-2 mb-2 mb-lg-0"
              onClick={handleReset}
            >
              Reset
            </button>
          </div>
          </div>
          {/* Category Filter Icon */}
          

          
        </div>
        </div>


      <section className="container">
        <div className="row justify-content-center">
          {currentItems.map((product) => (
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
          ))}
        </div>

         {/* Fixed Bottom Bar */}
      {cart.length > 0 && (
        <div className="fixed-bottom-bar">
          <div className="container d-flex justify-content-between align-items-center">
            <span className="fw-bold">🛒 {cart.length} item(s) in cart</span>
            <Link to="/cart" className="btn btn-dark">View Cart</Link>
          </div>
        </div>
      )}

        {/* Pagination */}
        <ReactPaginate
          previousLabel={null}
          nextLabel={"Next"}
          breakLabel={"..."}
          breakClassName={"page-item disabled"}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={3}
          onPageChange={handlePageClick}
          containerClassName={"pagination justify-content-center mt-4 pb-4"}
          pageClassName={"page-item"}
          pageLinkClassName={"mx-1 btn btn-outline-dark"}
          nextLinkClassName={" mx-5 btn btn-outline-dark"}
          activeLinkClassName={"fw-bold"}
        />
      </section>
    </>
  );
}
