import { useState } from 'react';
import { useCart } from '../comonents/CartContext.jsx';
import CheckOut from '../assets/CheckOut.png';
import PlacedOrd from '../assets/PlacedOrd.png';

const Checkout = () => {
    const { cartItems } = useCart();
    const [orderPlaced, setOrderPlaced] = useState(false); // Order confirmation state


    // Default shipping cost
    const [shippingCost, setShippingCost] = useState(0);

    // Calculate total price
    const totalItemsPrice = cartItems.reduce((total, item) => {
        const itemPrice = parseFloat(item.new_price.slice(1)); // Parse price
        if (isNaN(itemPrice)) return total; // Skip invalid price
        return total + itemPrice * item.quantity;
    }, 0);

    // Overall total including shipping
    const overallTotal = totalItemsPrice + shippingCost;

    const [address, setAddress] = useState({
        name: '',
        email: '',
        phone: '',
        street: '',
        city: '',
        postalCode: '',
        country: ''
    });

    const [paymentMethod, setPaymentMethod] = useState('');
    const [deliveryMethod, setDeliveryMethod] = useState('');

    const handleAddressChange = (e) => {
        const { name, value } = e.target;
        setAddress((prevAddress) => ({
            ...prevAddress,
            [name]: value
        }));
    };

    const handlePaymentChange = (e) => {
        setPaymentMethod(e.target.value);
    };

    const handleDeliveryChange = (e) => {
        const selectedMethod = e.target.value;
        setDeliveryMethod(selectedMethod);

        // Update shipping cost dynamically
        if (selectedMethod === 'standard') {
            setShippingCost(5.99);
        } else if (selectedMethod === 'express') {
            setShippingCost(12.99);
        } else {
            setShippingCost(0);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!deliveryMethod) return; // Prevent submission if no delivery method is selected

        console.log('Submitting Order:', {
            address,
            paymentMethod,
            deliveryMethod,
            cartItems,
            totalItemsPrice,
            shippingCost,
            overallTotal
        });
        // Show order confirmation
        setOrderPlaced(true);

        // Clear form after submission
        setTimeout(() => {
            setOrderPlaced(false);
        }, 3000); // Hide confirmation after 3 seconds
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', padding: '50px', maxWidth: '900px', margin: 'auto' }}>
            
            {orderPlaced && (
                <div style={{
                    position: 'fixed',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    background: 'linear-gradient(135deg, #ff758c, #ff7eb3)',
                    color: 'white',
                    padding: '40px 60px',
                    borderRadius: '20px',
                    fontSize: '28px',
                    fontWeight: 'bold',
                    width: '400px',
                    height: '350px', 
                    zIndex: 1000,
                    textAlign: 'center',
                    boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.2)',
                    width: '400px'
                }}>
                     Hurray! Your order was placed successfully!
                     <img src={PlacedOrd} alt="PlacedOrd" style={{ width: '100%', borderRadius: '10px', marginTop: '-100px'}} />
                </div>
                
            )}


            {/* Left Container - Checkout Form */}
            <div className="checkout-container" style={{ padding: '200px', marginTop: '-50px', marginLeft: '-520px' }}>
                <h2 style={{ fontSize: '30px', fontWeight: '300' }}>Checkout</h2>

                <form onSubmit={handleSubmit}>
                    {/* Shipping Address Section */}
                    <section>
                        <h3 style={{ marginTop: '20px' }}>Shipping Address</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '400px' }}>
                            <input type="text" name="name" placeholder="Full Name" value={address.name} onChange={handleAddressChange} required style={{ background: '#fcd7dd', padding: '5px', borderRadius: '5px', border: '1px solid #ccc' }} />
                            <input type="email" name="email" placeholder="Email" value={address.email} onChange={handleAddressChange} required style={{ background: '#fcd7dd', padding: '5px', borderRadius: '5px', border: '1px solid #ccc' }} />
                            <input type="tel" name="phone" placeholder="Phone Number" value={address.phone} onChange={handleAddressChange} required style={{ background: '#fcd7dd', padding: '5px', borderRadius: '5px', border: '1px solid #ccc' }} />
                            <input type="text" name="street" placeholder="Street Address" value={address.street} onChange={handleAddressChange} required style={{ background: '#fcd7dd', padding: '5px', borderRadius: '5px', border: '1px solid #ccc' }} />
                            <input type="text" name="city" placeholder="City" value={address.city} onChange={handleAddressChange} required style={{ background: '#fcd7dd', padding: '5px', borderRadius: '5px', border: '1px solid #ccc' }} />
                            <input type="text" name="postalCode" placeholder="Postal Code" value={address.postalCode} onChange={handleAddressChange} required style={{ background: '#fcd7dd', padding: '5px', borderRadius: '5px', border: '1px solid #ccc' }} />
                            <input type="text" name="country" placeholder="Country" value={address.country} onChange={handleAddressChange} required style={{ background: '#fcd7dd', padding: '5px', borderRadius: '5px', border: '1px solid #ccc' }} />
                        </div>
                    </section>

                    {/* Payment Method Section */}
                    <section>
                        <h3 style={{ marginTop: '10px' }}>Payment Method</h3>
                        <div>
                            <label style={{ marginRight: '10px', color: '#52527a' }}>
                                <input type="radio" value="creditCard" checked={paymentMethod === 'creditCard'} onChange={handlePaymentChange} />
                                Credit Card
                            </label>
                            <label style={{ marginRight: '10px', color: '#52527a' }}>
                                <input type="radio" value="paypal" checked={paymentMethod === 'paypal'} onChange={handlePaymentChange} />
                                Cash on Deliver
                            </label>
                        </div>
                    </section>

                    {/* Delivery Method Section */}
                    <section>
                        <h3 style={{ marginTop: '10px' }}>Delivery Method</h3>
                        <div>
                            <label style={{ marginRight: '10px', color: '#52527a' }}>
                                <input type="radio" value="standard" checked={deliveryMethod === 'standard'} onChange={handleDeliveryChange} />
                                Standard Delivery (3-5 days) - $5.99
                            </label>
                            <label style={{ marginRight: '10px', color: '#52527a' }}>
                                <input type="radio" value="express" checked={deliveryMethod === 'express'} onChange={handleDeliveryChange} />
                                Express Delivery (1-2 days) - $12.99
                            </label>
                        </div>
                    </section>

                    {/* Order Summary with Shipping Cost */}
                    <section>
                        <h3 style={{ marginTop: '10px' }}>Order Summary</h3>
                        <div style={{ border: '1px solid #ddd', padding: '10px', borderRadius: '5px', background: '#fcd7dd', width:'100%' }}>
                            {cartItems.length > 0 ? (
                                <ul style={{ listStyleType: 'none', padding: 0 }}>
                                    {cartItems.map((item) => (
                                        <li key={item.id} style={{ 
                                            display: 'flex', 
                                            alignItems: 'center', 
                                            padding: '10px 0', 
                                            borderBottom: '1px solid #ddd' 
                                        }}>
                                            <img 
                                                src={item.image} 
                                                alt={item.name} 
                                                style={{ 
                                                    width: '50px', 
                                                    height: '50px', 
                                                    objectFit: 'cover', 
                                                    marginRight: '10px', 
                                                    borderRadius: '5px' 
                                                }} 
                                            />
                                            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                                                <p style={{ margin: '0', fontSize: '14px', fontWeight: '500', flex: 1 }}>
                                                    {item.name}
                                                </p>
                                                
                                                <p style={{ 
                                                    margin: '0', 
                                                    fontSize: '14px', 
                                                    color: '#333', 
                                                    whiteSpace: 'nowrap' 
                                                }}>
                                                    ${parseFloat(item.new_price.slice(1)) * item.quantity} ({item.quantity})
                                                </p>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p>Your cart is empty.</p>
                            )}
                            <p>Shipping: ${shippingCost.toFixed(2)}</p>
                            <p style={{ fontWeight: 'bold', marginTop: '10px' }}>Total: ${overallTotal.toFixed(2)}</p>
                        </div>
                    </section>

                    <div>
                        <button type="submit" disabled={!deliveryMethod} style={{
                            backgroundColor: !deliveryMethod ? '#ccc' : '#D5006D',
                            color: '#fff',
                            padding: '10px 20px',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: !deliveryMethod ? 'not-allowed' : 'pointer',
                        }}>Place Order</button>
                    </div>
                </form>
            </div>

            {/* Right Container - Image */}
            <div style={{ flex: '0.6', display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '240px', marginRight: '-520px' }}>
                <img src={CheckOut} alt="Checkout" style={{ width: '100%', borderRadius: '10px', marginTop: '-100px', marginLeft:'-600px' }} />
            </div>
        </div>
    );
};

export default Checkout;
