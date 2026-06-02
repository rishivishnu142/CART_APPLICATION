import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",

  initialState: {
    items: [],
  },

  reducers: {

    addItem: (state, action) => {

      const existing = state.items.find(
        (item) => item.id === action.payload.id
      );

      // ✅ clean price safely
      const cleanPrice = parseFloat(
        String(action.payload.price).replace(/[^0-9.]/g, "")
      );

      if (existing) {
        existing.qty += 1;
      } else {
        state.items.push({
          ...action.payload,
          price: isNaN(cleanPrice) ? 0 : cleanPrice,
          qty: 1
        });
      }
    },

    removeItem: (state, action) => {
      state.items = state.items.filter(
        (item) => item.id !== action.payload
      );
    },

    decrementItem: (state, action) => {

      const existing = state.items.find(
        (item) => item.id === action.payload
      );

      if (existing) {
        if (existing.qty === 1) {
          state.items = state.items.filter(
            (item) => item.id !== action.payload
          );
        } else {
          existing.qty -= 1;
        }
      }
    },

    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const {
  addItem,
  removeItem,
  decrementItem,
  clearCart,
} = cartSlice.actions;

// ✅ SELECTORS (SAFE)

export const selectCartItems = (state) =>
  state.cart.items;

export const selectCartTotal = (state) =>
  state.cart.items.reduce(
    (total, item) => {
      const price = Number(item.price) || 0;
      const qty = Number(item.qty) || 0;
      return total + price * qty;
    },
    0
  );

export const selectCartCount = (state) =>
  state.cart.items.reduce(
    (count, item) => count + (Number(item.qty) || 0),
    0
  );

export default cartSlice.reducer;