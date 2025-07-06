import { createContext, useState, useContext, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // Retrieve the cart from localStorage when the app first loads
  const getCartFromLocalStorage = () => {
    const storedCart = localStorage.getItem('cart');
    return storedCart ? JSON.parse(storedCart) : []; // Parse the cart if it exists, otherwise return an empty array
  };

  const [cart, setCart] = useState(getCartFromLocalStorage()); // Initialize the cart from localStorage

  // Update the cart in localStorage whenever the cart state changes
  useEffect(() => {
    if (cart.length > 0) {
      localStorage.setItem('cart', JSON.stringify(cart)); // Store the cart data in localStorage as a JSON string
    } else {
      localStorage.removeItem('cart'); // Optionally remove cart data from localStorage when it's empty
    }
  }, [cart]);

  const addToCart = (item) => {
    // Check if the product already exists in the cart by its ID, size, and color
    const existingItemIndex = cart.findIndex(
      (cartItem) => cartItem.id === item.id && cartItem.size === item.size && cartItem.color === item.color
    );

    if (existingItemIndex !== -1) {
      // If the product exists, increment the quantity
      const updatedCart = [...cart];
      updatedCart[existingItemIndex].quantity += item.quantity; // Increase the quantity
      setCart(updatedCart); // Update the cart state
    } else {
      // If the product doesn't exist, add a new item with the specified quantity
      setCart([...cart, { ...item, quantity: item.quantity }]);
    }
  };

  const removeFromCart = (productToRemove) => {
    const updatedCart = cart.filter(
      (item) =>
        !(item.id === productToRemove.id && item.size === productToRemove.size && item.color === productToRemove.color)
    );
    setCart(updatedCart); // Update the cart state
  };

  const decrementQuantity = (productToDecrement) => {
    const updatedCart = cart
      .map((item) => {
        if (
          item.id === productToDecrement.id &&
          item.size === productToDecrement.size &&
          item.color === productToDecrement.color
        ) {
          if (item.quantity > 1) {
            item.quantity -= 1; // Decrement quantity
          } else {
            // If quantity is 1, remove the item from the cart
            return null;
          }
        }
        return item;
      })
      .filter((item) => item !== null); // Filter out null entries

    setCart(updatedCart); // Update the cart state
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, decrementQuantity }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
