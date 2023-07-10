import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { ProuductInterface } from "@/types"
import { RootState } from "../store"
import axios from "axios"

type InitialState = {
     products: ProuductInterface[],
     isLoading: boolean,
     success: boolean,
     error: string | null
}

const initialState: InitialState = {
     products: [],
     isLoading: false,
     success: false,
     error: null
}

/**
 * * Fetch product by create async thunk
 */
export const fetchProducts = createAsyncThunk('products/fetch', async () => {
     try {
          let { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/products`);
          return data;
     } catch (error) {
          throw new Error('Failed to fetch products.');
     }
})

/**
 * * Add product by create async thunk
 */
export const addProduct = createAsyncThunk('products/add', async (product: ProuductInterface) => {
     try {
          let { data } = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/products`, product);
          return data;
     } catch (error: any) {
          throw new Error(error.message || "Unable to add product");
     }
})


export const productSlice = createSlice({
     name: "carts",
     initialState,
     reducers: {},
     extraReducers: (builder) => {
          // Handle the pending state while fetching products
          builder.addCase(fetchProducts.pending, (state) => {
               state.isLoading = true;
               state.error = null;
          });

          // Handle the fulfilled state with the fetched products
          builder.addCase(fetchProducts.fulfilled, (state, action: PayloadAction<ProuductInterface[]>) => {
               state.isLoading = false;
               state.error = null;
               state.products = action.payload;
          });

          // Handle the rejected state if fetching products fails
          builder.addCase(fetchProducts.rejected, (state, action) => {
               state.isLoading = false;
               state.error = action.error.message || 'Failed to fetch products.';
          });


          /**
           * * Handle addProduct cases
           */
          builder.addCase(addProduct.pending, (state) => {
               state.isLoading = true;
               state.error = null;
          });
          builder.addCase(addProduct.fulfilled, (state, action: PayloadAction<ProuductInterface>) => {
               state.isLoading = false;
               state.error = null;
               state.success = true,
                    state.products.push(action.payload);
          });
          builder.addCase(addProduct.rejected, (state, action) => {
               state.isLoading = false;
               state.error = action.error.message || 'Failed to add product.';
               state.success = false;
          });

     }
})

export default productSlice.reducer;
export const selectProducts = (state: RootState) => state.products.products;
export const selectLoading = (state: RootState) => state.products.isLoading;
export const selectError = (state: RootState) => state.products.error;
export const selectSuccess = (state: RootState) => state.products.success;
