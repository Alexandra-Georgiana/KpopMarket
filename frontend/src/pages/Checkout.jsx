import { useState } from 'react';
import { useCart } from '../comonents/CartContext.jsx';
import CheckOut from '../assets/CheckOut.png';
import PlacedOrd from '../assets/PlacedOrd.png';

const Checkout = () => {
    const { cartItems } = useCart();
    const [orderPlaced, setOrderPlaced] = useState(false);

    const [shippingCost, setShippingCost] = useState(0);
    const totalItemsPrice = cartItems.reduce((total, item) => {
        const itemPrice = parseFloat(item.new_price.slice(1));
        return isNaN(itemPrice) ? total : total + itemPrice * item.quantity;
    }, 0);
    const overallTotal = totalItemsPrice + shippingCost;

    const [address, setAddress] = useState({
        name: '', email: '', phone: '', street: '', city: '', postalCode: '', country: ''
    });

    const [cardDetails, setCardDetails] = useState({
        cardName: '', cardNumber: '', cvv: '', expiryDate: ''
    });

    const [paymentMethod, setPaymentMethod] = useState('');
    const [deliveryMethod, setDeliveryMethod] = useState('');

    const handleAddressChange = (e) => {
        const { name, value } = e.target;
        setAddress(prev => ({ ...prev, [name]: value }));
    };

    const handlePaymentChange = (e) => {
        setPaymentMethod(e.target.value);
    };

    const handleDeliveryChange = (e) => {
        const selectedMethod = e.target.value;
        setDeliveryMethod(selectedMethod);
        setShippingCost(selectedMethod === 'standard' ? 5.99 : selectedMethod === 'express' ? 12.99 : 0);
    };

    const handleCardDetailsChange = (e) => {
        const { name, value } = e.target;
        setCardDetails(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!deliveryMethod) return;

        console.log('Submitting Order:', { address, paymentMethod, deliveryMethod, cartItems, totalItemsPrice, shippingCost, overallTotal });
        setOrderPlaced(true);
        setTimeout(() => setOrderPlaced(false), 3000);
    };

    return (
        <div className="flex flex-col lg:flex-row justify-between items-start px-4 md:px-16 lg:px-32 py-12 mx-auto">
            
            {orderPlaced && (
                <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-pink-500 to-pink-400 text-white p-10 rounded-xl text-center shadow-lg z-50 w-80 h-80">
                    <p className="text-xl font-bold text-white">Hurray! Your order was placed successfully!</p>
                    <img src={PlacedOrd} alt="Placed Order" className="w-full rounded-lg" />
                </div>
            )}

            {/* Checkout Form */}
            <div className="checkout-container w-full lg:w-1/2 mt-[50px]">
                <h2 className="text-2xl font-light mb-6">Checkout</h2>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    {/* Shipping Address */}
                    <section>
                        <h3 className="text-lg font-medium mb-2">Shipping Address</h3>
                        <div className="grid grid-cols-1 gap-3">
                            {Object.keys(address).map((key) => (
                                <input
                                    key={key}
                                    type={key === "email" ? "email" : key === "phone" ? "tel" : "text"}
                                    name={key}
                                    placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
                                    value={address[key]}
                                    onChange={handleAddressChange}
                                    required
                                    className="w-full bg-pink-100 p-2 rounded border border-gray-300"
                                />
                            ))}
                        </div>
                    </section>

                    {/* Payment Method */}
                    <section>
                        <h3 className="text-lg font-medium mb-2">Payment Method</h3>
                        <div className="flex gap-4">
                            <label className="text-gray-700">
                                <input type="radio" value="creditCard" checked={paymentMethod === 'creditCard'} onChange={handlePaymentChange} />
                                Credit Card
                            </label>
                            <label className="text-gray-700">
                                <input type="radio" value="paypal" checked={paymentMethod === 'paypal'} onChange={handlePaymentChange} />
                                Cash on Delivery
                            </label>
                        </div>
                    </section>

                    {/* Card Details */}
                    {paymentMethod === 'creditCard' && (
                        <section>
                            <h3 className="text-lg font-medium mb-2">Credit Card Details</h3>
                            <div className="grid grid-cols-1 gap-3">
                                {Object.keys(cardDetails).map((key) => (
                                    <input
                                        key={key}
                                        type={key === 'expiryDate' ? 'date' : key === 'cvv' || key === 'cardNumber' ? 'number' : 'text'}
                                        name={key}
                                        placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
                                        value={cardDetails[key]}
                                        onChange={handleCardDetailsChange}
                                        required
                                        className="w-full bg-pink-100 p-2 rounded border border-gray-300"
                                    />
                                ))}
                            </div>
                        </section>
                    )}


                    {/* Delivery Method */}
                    <section>
                        <h3 className="text-lg font-medium mb-2">Delivery Method</h3>
                        <div className="flex gap-4">
                            <label className="text-gray-700">
                                <input type="radio" value="standard" checked={deliveryMethod === 'standard'} onChange={handleDeliveryChange} />
                                Standard (3-5 days) - $5.99
                            </label>
                            <label className="text-gray-700">
                                <input type="radio" value="express" checked={deliveryMethod === 'express'} onChange={handleDeliveryChange} />
                                Express (1-2 days) - $12.99
                            </label>
                        </div>
                    </section>

                    {/* Order Summary */}
                    <section>
                        <h3 className="text-lg font-medium mb-2">Order Summary</h3>
                        <div className="bg-pink-100 p-4 rounded border border-gray-300">
                            {cartItems.length > 0 ? (
                                <ul className="list-none p-0">
                                    {cartItems.map((item) => (
                                        <li key={item.id} className="flex justify-between items-center border-b py-2">
                                            <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded" />
                                            <p className="text-sm font-medium">{item.name}</p>
                                            <p className="text-sm">${(parseFloat(item.new_price.slice(1)) * item.quantity).toFixed(2)} ({item.quantity})</p>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p>Your cart is empty.</p>
                            )}
                            <p>Shipping: ${shippingCost.toFixed(2)}</p>
                            <p className="font-bold mt-2">Total: ${overallTotal.toFixed(2)}</p>
                        </div>
                    </section>

                    {/* Place Order Button */}
                    <button type="submit" disabled={!deliveryMethod} className={`p-3 text-white rounded ${!deliveryMethod ? 'bg-gray-400 cursor-not-allowed' : 'bg-pink-600'}`}>
                        Place Order
                    </button>
                </form>
            </div>

            {/* Checkout Image (below on mobile) */}
            <div className="w-full lg:w-1/2 flex justify-center mt-8 lg:mt-0">
                <img src={CheckOut} alt="Checkout" className="w-full max-w-md lg:max-w-xl rounded" />
            </div>
        </div>
    );
};

export default Checkout;
