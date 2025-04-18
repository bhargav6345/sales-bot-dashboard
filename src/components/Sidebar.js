import React, { useState } from "react";
import "./Sidebar.css";

const Sidebar = ({ onProductSelect }) => {
  const [products, setProducts] = useState([
    { id: 1, name: "Product 1" },
    { id: 2, name: "Product 2" },
    { id: 3, name: "Product 3" }
  ]);
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [newProductName, setNewProductName] = useState("");

  const handleAddProduct = () => {
    if (!isAddingProduct) {
      setIsAddingProduct(true);
      return;
    }

    if (newProductName.trim()) {
      const newProduct = {
        id: products.length + 1,
        name: newProductName.trim()
      };
      setProducts([...products, newProduct]);
      setNewProductName("");
      setIsAddingProduct(false);
    }
  };

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h3>Sales Bot</h3>
      </div>

      <div className="products-section">
        <div className="products-header">
          <span className="section-title">
            <span className="section-icon">📦</span>
            Products
          </span>
        </div>

        <div className="products-list">
          {products.map((product) => (
            <button 
              key={product.id}
              className="product-item"
              onClick={() => onProductSelect(product.name)}
            >
              <span className="product-icon">•</span>
              {product.name}
            </button>
          ))}
        </div>

        <div className="add-product-section">
          {isAddingProduct ? (
            <div className="new-product-input">
              <input
                type="text"
                placeholder="Enter product name"
                value={newProductName}
                onChange={(e) => setNewProductName(e.target.value)}
                autoFocus
              />
              <div className="input-actions">
                <button 
                  className="confirm-btn"
                  onClick={handleAddProduct}
                >
                  ✓
                </button>
                <button 
                  className="cancel-btn"
                  onClick={() => {
                    setIsAddingProduct(false);
                    setNewProductName("");
                  }}
                >
                  ✕
                </button>
              </div>
            </div>
          ) : (
            <button className="add-product-btn" onClick={handleAddProduct}>
              <span className="plus-icon">+</span>
              New Product
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
