import React from 'react';
import './styles.css';

const ProductCard = ({ image, name, amount, storageId, editProduct, deleteProduct }) => {
  return (
    <div className="product-card">
      <div className="product-image-container">
        <img src={image} alt={name} className="product-image" />
      </div>
      <h2 className="product-title">{name}</h2>
      <div className="cardSection">
        <p className="cardLabel">Amount:</p>
        <p className="cardLabel"> {amount}</p>
      </div>
      <div className="cardSection">
        <p className="cardLabel">Storage:</p>
        <p className="cardLabel">{storageId}</p>
      </div>
      <div className="product-buttons">
        <button
          className="editProduct"
          onClick={editProduct}
        >
          Edit
        </button>
        <button
          className="deleteProduct"
          onClick={deleteProduct}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
