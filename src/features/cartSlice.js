import { createSlice } from "@reduxjs/toolkit";

const Totalcart = (cartItems) => {
  return cartItems.reduce(
    (acc, { prix, cartQuantity }) => {
      acc.total += prix * cartQuantity;
      acc.quantity += cartQuantity;
      return acc;
    },
    { total: 0, quantity: 0 }
  );
};

// Initialiser l'état du panier à partir de localStorage
const initialCartItems = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : [];

const initialTotals = Totalcart(initialCartItems);

const initialState = {
  cartItems: initialCartItems,
  cartTotalQuantity: initialTotals.quantity,
  cartTotalAmount: initialTotals.total,
};


const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const existingIndex = state.cartItems.findIndex(
        (item) => item._id === action.payload._id
      );

      if (existingIndex >= 0) {
        state.cartItems[existingIndex] = {
          ...state.cartItems[existingIndex],
          cartQuantity: state.cartItems[existingIndex].cartQuantity + 1,
        };
     
      } else {
        let tempProductItem = { ...action.payload, cartQuantity: 1 };
        state.cartItems.push(tempProductItem);
      
        
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      getTotals()
    },
    decreaseCart(state, action) {
      const itemIndex = state.cartItems.findIndex(
        (item) => item._id === action.payload._id
      );

      if (state.cartItems[itemIndex].cartQuantity > 1) {
        state.cartItems[itemIndex].cartQuantity -= 1;

      } else if (state.cartItems[itemIndex].cartQuantity === 1) {
        const nextCartItems = state.cartItems.filter(
          (item) => item._id !== action.payload._id
        );

        state.cartItems = nextCartItems;

      }

      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    removeFromCart(state, action) {
      state.cartItems.map((cartItem) => {
        if (cartItem._id === action.payload._id) {
          const nextCartItems = state.cartItems.filter(
            (item) => item._id !== cartItem._id
          );

          state.cartItems = nextCartItems;

        }
        localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        return state;
      });
    },
    getTotals(state) {
      const { total, quantity } = Totalcart(state.cartItems);
      state.cartTotalQuantity = quantity;
      state.cartTotalAmount = total;
    },
    clearCart(state, action) {
      state.cartItems = [];
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    
    },
  },
});


// Middleware pour appeler getTotals après chaque action de modification du panier
export const cartMiddleware = ({ dispatch }) => (next) => (action) => {
  const result = next(action);

  if (
    action.type === addToCart.type ||
    action.type === removeFromCart.type ||
    action.type === decreaseCart.type ||
    action.type === clearCart.type
  ) {
    dispatch(getTotals());
  }

  return result;
};

export const cartReducer = cartSlice.reducer;
export const { addToCart, decreaseCart, removeFromCart, getTotals, clearCart } =
  cartSlice.actions;

