import React, { useEffect, useState } from 'react';
import { fetchProducts } from '../api/products';

const Items = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const loadProducts = async () => {
      const data = await fetchProducts();
      setProducts(data);
    };
    loadProducts();
  }, []);

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', padding: '20px' }}>
      {products.map((item) => (
        <div key={item._id} style={{ border: '1px solid #ccc', borderRadius: '12px', padding: '15px' }}>
          <img src={item.image} alt={item.title} style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '10px' }} />
          <h2>{item.title}</h2>
          <p><strong>Price:</strong> ₹{item.price}</p>
          <p>{item.description}</p>
        </div>
      ))}
    </div>
  );
};

export default Items;
