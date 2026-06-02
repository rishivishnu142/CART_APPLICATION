import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addItem,
  decrementItem,
  selectCartItems,
} from "../store/cartSlice";

function ProductCard({ product }) {

  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);

  if (!product) {
    return (
      <div style={{ padding: "20px" }}>
        <h2>No product selected</h2>
        <p>Go back and select a product</p>
      </div>
    );
  }

  const cartItem = cartItems.find(
    (item) => item.id === product.id
  );

  const qty = cartItem ? cartItem.qty : 0;

  // ✅ CLEAN PRICE ONCE (IMPORTANT FIX)
  const cleanPrice = parseFloat(
    String(product.price).replace(/[^0-9.]/g, "")
  );

  return (
    <div className="product-card">

      <div className="product-emoji">
        {product.emoji}
      </div>

      <h3 className="product-name">
        {product.name}
      </h3>

      <p className="product-desc">
        {product.description}
      </p>

      <p className="product-price">
        ₹{cleanPrice}
      </p>

      {qty === 0 ? (
        <button
          className="btn-add"
          onClick={() =>
            dispatch(
              addItem({
                ...product,
                price: cleanPrice
              })
            )
          }
        >
          Add To Cart
        </button>
      ) : (
        <div className="qty-controls">

          <button
            className="btn-qty"
            onClick={() =>
              dispatch(decrementItem(product.id))
            }
          >
            -
          </button>

          <span className="qty-display">
            {qty}
          </span>

          <button
            className="btn-qty"
            onClick={() =>
              dispatch(
                addItem({
                  ...product,
                  price: cleanPrice
                })
              )
            }
          >
            +
          </button>

        </div>
      )}

    </div>
  );
}

export default ProductCard;