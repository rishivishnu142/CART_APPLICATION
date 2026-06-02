import React from 'react';

import { useDispatch, useSelector } from 'react-redux';

import {
  removeItem,
  clearCart,
  selectCartItems,
  selectCartTotal,
  selectCartCount
} from '../store/cartSlice';

function Cart() {

  const dispatch = useDispatch();

  const items = useSelector(selectCartItems);
  const total = useSelector(selectCartTotal);
  const count = useSelector(selectCartCount);

  return (

    <div className="cart">

      <div className="cart-header">

        <span className="cart-icon">🛒</span>

        <h2 className="cart-title">Cart</h2>

        {count > 0 && (
          <span className="cart-badge">
            {count}
          </span>
        )}

      </div>

      {items.length === 0 ? (

        <p className="cart-empty">
          Your cart is empty. Add some products!
        </p>

      ) : (

        <>

          <ul className="cart-list">

            {items.map((item) => {
              const unitPrice = Number(item.price) || 0;
              const itemQty = Number(item.qty) || 0;
              const itemTotal = unitPrice * itemQty;

              return (
                <li key={item.id} className="cart-item">
                  <div className="cart-item-main">
                    <span className="cart-item-emoji">{item.emoji}</span>
                    <div className="cart-item-info">
                      <span className="cart-item-name">{item.name}</span>
                      <span className="cart-item-detail">
                        Quantity: {itemQty}
                      </span>
                      <span className="cart-item-detail">
                        Unit price: ₹{unitPrice}
                      </span>
                      <span className="cart-item-detail cart-item-subtotal">
                        Item total: ₹{itemTotal}
                      </span>
                    </div>
                  </div>

                  <div className="cart-item-actions">
                    <button
                      className="btn-remove"
                      onClick={() => dispatch(removeItem(item.id))}
                      aria-label={`Remove ${item.name}`}
                    >
                      ✕
                    </button>
                  </div>
                </li>
              );
            })}

          </ul>

          <div className="cart-summary-card">
            <h3 className="cart-summary-title">Order Summary</h3>
            <div className="cart-summary-row">
              <span>Total products</span>
              <strong>{items.length}</strong>
            </div>
            <div className="cart-summary-row">
              <span>Total quantity</span>
              <strong>{items.reduce((sum, item) => sum + Number(item.qty || 0), 0)}</strong>
            </div>
            <div className="cart-summary-row cart-summary-total">
              <span>Order total</span>
              <strong>₹{total}</strong>
            </div>
          </div>

          <div className="cart-footer">
            <button
              className="btn-clear"
              onClick={() => dispatch(clearCart())}
            >
              Clear Cart
            </button>
          </div>

        </>

      )}

    </div>

  );
}

export default Cart;