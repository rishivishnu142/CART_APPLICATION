import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import { useSelector } from "react-redux";

import Home from "./components/Home";
import ProductCard from "./components/ProductCard";
import Cart from "./components/Cart";
import products from "./data/products";
import { selectCartItems, selectCartTotal } from "./store/cartSlice";

import "./App.css";

function App() {
  const cartItems = useSelector(selectCartItems);
  const cartTotal = useSelector(selectCartTotal);
  const totalQuantity = cartItems.reduce(
    (sum, item) => sum + Number(item.qty || 0),
    0
  );

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-brand">
          <span className="header-emoji">🥕</span>
          <div>
            <h1 className="app-title">Vegetables Shop (Redux)</h1>
            <div className="redux-label">Redux Toolkit cart demo</div>
          </div>
        </div>

        <nav className="app-nav">
          <Link className="nav-link" to="/">
            Home
          </Link>
          <Link className="nav-link" to="/product">
            Products
          </Link>
          <Link className="nav-link" to="/cart">
            Cart
          </Link>
        </nav>
      </header>

      <main className="app-main">
        <Routes>
          <Route path="/" element={<Home />} />

          <Route
            path="/product"
            element={
              <>
                <div className="product-container">
                  {products && products.length > 0 ? (
                    products.map((product) => (
                      <ProductCard
                        key={product.id}
                        product={product}
                      />
                    ))
                  ) : (
                    <p>No products available</p>
                  )}
                </div>

                <div className="product-cart-summary">
                  <h3>Cart Summary</h3>
                  {cartItems.length === 0 ? (
                    <p className="summary-empty">No items added yet.</p>
                  ) : (
                    <>
                      <div className="cart-summary-row">
                        <span>Products added</span>
                        <strong>{cartItems.length}</strong>
                      </div>
                      <div className="cart-summary-row">
                        <span>Total quantity</span>
                        <strong>{totalQuantity}</strong>
                      </div>
                      <div className="cart-summary-row cart-summary-total">
                        <span>Grand total</span>
                        <strong>₹{cartTotal}</strong>
                      </div>
                      <div className="cart-summary-item-list">
                        {cartItems.map((item) => (
                          <div key={item.id} className="cart-summary-item">
                            {item.name} × {item.qty}
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </>
            }
          />

          <Route path="/cart" element={<Cart />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;