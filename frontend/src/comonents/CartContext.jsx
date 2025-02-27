import React, { createContext, useState, useEffect, useContext } from 'react';

// Create Context
const CartContext = createContext();

// CartProvider to wrap around your app
const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Initialize cart from sessionStorage
  useEffect(() => {
    const storedCart = JSON.parse(sessionStorage.getItem('cart')) || [];
    setCartItems(storedCart);
  }, []);

  // Add item to cart
  const addToCart = (item) => {
    const itemIndex = cartItems.findIndex(cartItem => cartItem.id === item.id);
    let updatedCart;

    if (itemIndex >= 0) {
      // If item already exists in cart, increase quantity
      updatedCart = cartItems.map(cartItem => 
        cartItem.id === item.id 
          ? { ...cartItem, quantity: cartItem.quantity + 1 } 
          : cartItem
      );
    } else {
      // If item doesn't exist in cart, add it
      updatedCart = [...cartItems, { ...item, quantity: 1 }];
    }

    // Update sessionStorage and state
    sessionStorage.setItem('cart', JSON.stringify(updatedCart));
    setCartItems(updatedCart);
  };

  // Remove item from cart
  const removeFromCart = (id) => {
    const updatedCart = cartItems.filter(item => item.id !== id);
    sessionStorage.setItem('cart', JSON.stringify(updatedCart));
    setCartItems(updatedCart);
  };

  // Decrease item quantity in cart
  const decreaseQuantity = (id) => {
    const updatedCart = cartItems.map(item => {
      if (item.id === id && item.quantity > 1) {
        item.quantity -= 1;
      } else if (item.id === id && item.quantity === 1) {
        return null;
      }
      return item;
    }).filter(item => item !== null);

    sessionStorage.setItem('cart', JSON.stringify(updatedCart));
    setCartItems(updatedCart);
  };

  // Increase item quantity in cart
  const increaseQuantity = (id) => {
    const updatedCart = cartItems.map(item => {
      if (item.id === id) {
        item.quantity += 1;
      }
      return item;
    });

    sessionStorage.setItem('cart', JSON.stringify(updatedCart));
    setCartItems(updatedCart);
  };

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      decreaseQuantity,
      increaseQuantity
    }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use the CartContext
export const useCart = () => {
  return useContext(CartContext);
};

export default CartProvider;