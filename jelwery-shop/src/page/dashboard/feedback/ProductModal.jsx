import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Modal from '../../../component/ui/Modal';



function ProductModal({ isOpen, onRequestClose, product }) {
  const [productDetails, setProductDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isOpen && product) {
      setLoading(true);
      axios.get(`https://localhost:7147/api/Product/get-Products-by-id?id=${product.productID}`)
        .then(response => {
          setProductDetails(response.data); // Assuming API returns the product details object
          setLoading(false);
        })
        .catch(error => {
          console.error("Error fetching product details:", error);
          setError(error);
          setLoading(false);
        });
    }
  }, [isOpen, product]);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Product Details"
      className="modal-content"
      overlayClassName="modal-overlay"
    >
      <div>
        <h2>Product Details</h2>
        {loading && <p>Loading...</p>}
        {error && <p>Error fetching product details</p>}
        {productDetails && (
          <>
            <p>Product ID: {productDetails.productID}</p>
            <p>Product Name: {productDetails.productName}</p>
            <p>Description: {productDetails.description}</p>
            {/* Add more product details as needed */}
          </>
        )}
        <button onClick={onRequestClose}>Close</button>
      </div>
    </Modal>
  );
}

export default ProductModal;
