import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type { AppState } from "../../app/store";

export type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
};

interface ProductState {
  list: Product[];
  loading: boolean;
  error: boolean;
}

const initialState: ProductState = {
  list: [] as Product[],
  loading: false,
  error: false,
};

export const getProducts = createAsyncThunk("products/list", async () => {
  const response = await axios.get("https://fakestoreapi.com/products");

  return response.data;
});

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProducts.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.list = payload;
      })
      .addCase(getProducts.rejected, (state) => {
        state.loading = false;
        state.error = true;
      });
  },
});

export const selectProducts = (state: AppState) => state.products.list;

export const createSelectProductById =
  (id: number) =>
  (state: AppState): Product | undefined => {
    return state.products.list.find((product) => product.id == id);
  };

export default productsSlice.reducer;
