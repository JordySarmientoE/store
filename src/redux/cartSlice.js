import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  products: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addProducts(state, action) {
      const productExists = state.products.find(
        (producto) => action.payload.product.id === producto.id
      );
      if (productExists) {
        let productos = [...state.products];
        productos = productos.map((producto) => {
          return {
            ...producto,
            quantity:
              producto.id === action.payload.product.id
                ? producto.quantity + action.payload.quantity
                : producto.quantity,
          };
        });
        state.products = productos;
      } else {
        const productos = [...state.products];
        const producto = { ...action.payload.product };
        producto.quantity = 1;
        productos.push(producto);
        state.products = productos;
      }
    },
    cleanProducts(state) {
      state.products = [];
    },
    removeProduct(state, action) {
      let productos = [...state.products];
      productos = productos.filter(
        (producto) => producto.id !== action.payload.id
      );
      state.products = productos;
    },
    minusProducts(state, action) {
      let productos = [...state.products];
      productos = productos.map((producto) => {
        return {
          ...producto,
          quantity:
            producto.id === action.payload.product.id
              ? producto.quantity - action.payload.quantity
              : producto.quantity,
        };
      });
      state.products = productos;
    },
  },
});

export const { cleanProducts, addProducts, removeProduct, minusProducts } =
  cartSlice.actions;

export default cartSlice.reducer;
