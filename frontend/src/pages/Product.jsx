import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; 
import { ALL } from '../assets/all';  
import { FaStar, FaSearch } from 'react-icons/fa';
import { useCart } from '../comonents/CartContext';  // Corrected import for useCart hook

const Product = () => {
  const { id } = useParams();  
  const [product, setProduct] = useState(null);  
  const [loading, setLoading] = useState(true);  
  const [error, setError] = useState(null);  
  const [category, setCategory] = useState(null);  
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const navigate = useNavigate();  
  const { addToCart } = useCart(); // Corrected to useCart()

  useEffect(() => {
    let foundProduct = null;
    let productCategory = null;
    
    ALL.forEach(categoryItem => {
      const productInCategory = categoryItem.products.find(product => product.id === parseInt(id));
      if (productInCategory) {
        foundProduct = productInCategory;
        productCategory = categoryItem.category;
      }
    });

    if (foundProduct) {
      setProduct(foundProduct);
      setCategory(productCategory);
      setLoading(false);
    } else {
      setError('Product not found');
      setLoading(false);
    }
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  const handleAddToCart = () => {
    addToCart(product);
    alert(`${product.name} has been added to your cart!`);
  };

  return (
    <div className="product-page-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', padding: '90px' }}>
      <div style={{ width: '100%', fontSize: '18px', marginTop: "30px", color: '#888', paddingBottom: '20px' }}>
        <span style={{ cursor: 'pointer' }} onClick={() => navigate('/')}>Home</span> &gt;
        {category && <span> {category} &gt; </span>}
        <span> {product.name} </span>
      </div>

      <div className="product-page-content" style={{ display: 'flex', gap: '80px', marginTop: '20px' }}>
        
        {/* Product Image Container */}
        <div className="product-image" style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
          <div
            className="search-icon"
            onClick={toggleModal}
            style={{
              position: 'absolute',
              top: '10px',  
              right: '10px', 
              backgroundColor: '#D3D3D3',
              borderRadius: '50%',
              padding: '8px',
              cursor: 'pointer',
              zIndex: '10',
              transition: 'transform 0.3s ease',
            }}
          >
            <FaSearch style={{ fontSize: '24px' }} />
          </div>
          <img
            src={product.image}
            alt={product.name}
            style={{
              maxWidth: '500px',
              height: 'auto',
              objectFit: 'contain',
              borderRadius: '10px'
            }}
          />
        </div>

        {/* Product Details */}
        <div 
          className="product-details"
          style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            gap: '15px', 
            textAlign: 'left',
            paddingTop: '30px'
          }}
        >
          <h2 className="product-name" style={{ fontSize: '42px', fontWeight: '600' }}>{product.name}</h2>
          <div className="product-pricing" style={{ fontSize: '22px', margin: '10px 0' }}>
            <div className="new-price" style={{ color: 'black', fontWeight: 'bold' }}>{product.new_price}</div>
            {product.old_price && <div className="old-price" style={{ textDecoration: 'line-through', color: '#D5006D' }}>{product.old_price}</div>}
          </div>

          <div className="product-tax-note" style={{ fontSize: '14px', color: '#555' }}>
            <p>Taxes included</p>
          </div>

          <div className="product-rating" style={{ display: 'flex', alignItems: 'center' }}>
            {[...Array(5)].map((_, index) => (
              <FaStar key={index} className="star" style={{ color: 'transparent', fontSize: '22px', marginRight: '5px', stroke: 'black', strokeWidth: '50' }} />
            ))}
            <span style={{ marginLeft: '10px', fontSize: '16px', color: '#555' }}>(0 Reviews)</span>
          </div>

          {/* Line separator */}
          <div style={{ width: '300%', height: '1px', backgroundColor: 'gray', margin: '20px 0', marginLeft: "-10px" }} />

          <button 
            onClick={handleAddToCart} 
            style={{
              backgroundColor: '#D5006D', 
              color: '#fff', 
              fontSize: '18px', 
              padding: '15px', 
              border: 'none', 
              borderRadius: '5px', 
              cursor: 'pointer', 
              transition: 'background-color 0.3s ease'
            }}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#c40057'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#D5006D'}
          >
            Add to Cart
          </button>
        </div>
      </div>

      {/* Modal to show image */}
      {isModalOpen && (
        <div
          className="modal"
          style={{
            position: 'fixed',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: '1000'
          }}
          onClick={toggleModal} 
        >
          <div onClick={(e) => e.stopPropagation()} style={{ padding: '20px', borderRadius: '10px' }}>
            <img
              src={product.image}
              alt={product.name}
              style={{
                maxWidth: '90%',
                maxHeight: '90%',
                objectFit: 'contain',
                borderRadius: '10px'
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Product;
