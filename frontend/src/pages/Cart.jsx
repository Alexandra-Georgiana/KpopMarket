import React, {useState} from 'react';
import { useCart } from '../comonents/CartContext'; 
import NotFound from "../assets/NotFound.png";  
import { NavLink } from 'react-router-dom';

const Cart = () => {
  const { cartItems, removeFromCart, decreaseQuantity, increaseQuantity } = useCart();
  const [checkout, setCheckOut] = useState(false);

  // Calculate total price of the cart
  const totalPrice = cartItems.reduce((total, item) => {
    const itemPrice = parseFloat(item.new_price.slice(1)); 
    if (isNaN(itemPrice)) return total;  
    return total + itemPrice * item.quantity;
  }, 0);

  return (
    <div className="cart-page-container" style={{ padding: '200px', marginTop: '80px' }}>
      <h2 className="title" style={{ marginTop: '-150px', fontSize: '40px', fontWeight: '300' }}>Your Cart</h2>
      
      {cartItems.length === 0 ? (
        <div style={{ display: 'flex', alignItems: 'center', marginTop: '100px' }}>
          <p className="empty" style={{ fontSize: '20px', marginRight: '20px' }}>
            Your cart is empty
          </p>
          <img
            src={NotFound}
            alt="Not Found"
            style={{
              width: '200px',
              height: '200px',
              objectFit: 'contain',
              marginTop: '-60px',
              marginLeft: '-50px',
            }}
          />
        </div>
      ) : (
        <div className="cartItems" style={{ marginTop: '50px' }}>
          {cartItems.map(item => (
            <div
              key={item.id}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '40px',
                borderBottom: '1px solid gray',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <img
                  src={item.image}
                  alt={item.name}
                  style={{
                    width: '50px',
                    height: '50px',
                    objectFit: 'cover',
                    borderRadius: '5px',
                    marginRight: '10px',
                  }}
                />
                <span>{item.name}</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center' }}>
                <span style={{ marginLeft: '10px', fontWeight: 'bold' }}>
                  {item.new_price}
                </span>
                <button
                  onClick={() => removeFromCart(item.id)}
                  style={{
                    backgroundColor: '#D5006D',
                    color: 'white',
                    padding: '5px 10px',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    marginLeft: '10px',
                  }}
                >
                  Remove
                </button>

                <button
                  onClick={() => decreaseQuantity(item.id)}
                  style={{
                    color: 'black',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    marginRight: '12px',
                    marginLeft: '30px',
                  }}
                >
                  -
                </button>

                <span>{item.quantity}</span>

                <button
                  onClick={() => increaseQuantity(item.id)}
                  style={{
                    color: 'black',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    marginLeft: '12px',
                  }}
                >
                  +
                </button>
              </div>
            </div>
          ))}

          <div style={{ marginTop: '20px' }}>
            <p style={{ marginBottom: '5px', color: 'black' }}>
              Total: ${totalPrice.toFixed(2)}
            </p>
            <NavLink to="/checkout">
              <button
                style={{
                  backgroundColor: '#D5006D',
                  color: '#fff',
                  padding: '10px 20px',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer',
                }}
              >
                Proceed to Checkout
              </button>
            </NavLink>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
