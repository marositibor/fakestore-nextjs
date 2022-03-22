import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { AppState } from "../../app/store";
import type { Product } from "../products/productsSlice";

export type CartItem = Product & {
  pcs: number;
};

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [] as CartItem[],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProduct: (state: CartState, action: PayloadAction<Product>): void => {
      const product = action.payload as CartItem;
      if (state.items.length === 0) {
        state.items = [{ ...product, pcs: 1 }];
      } else {
        let productFound = 0;
        let _items = state.items.map((item) => {
          if (item.id === product.id) {
            productFound = 1;
            console.log(item.pcs);
            return { ...item, pcs: item.pcs + 1 };
          } else {
            return item;
          }
        });
        if (!productFound) {
          _items = [..._items, { ...product, pcs: 1 }];
        }
        state.items = _items;
      }
    },
  },
});

export const getCartCount = (state: AppState) =>
  state.cart.items.reduce((pcs, item) => pcs + item.pcs, 0);

export const { addProduct } = cartSlice.actions;
export default cartSlice.reducer;
