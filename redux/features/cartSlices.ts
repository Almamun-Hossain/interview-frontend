import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { CartInterface, CartUpdate, ProuductInterface } from "@/types"
import axios from 'axios'
import { RootState } from "../store"
type InitialState = {
     carts: CartInterface[],
     isLoading: boolean,
     error: string | null,
     userId?: string | null
}

const initialState: InitialState = {
     carts: [],
     isLoading: false,
     error: null,
}

/**
 * * fetch carts for a user
 */
export const fetchCarts = createAsyncThunk('carts/fetch', async (userId: string | null) => {
     try {
          let { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/carts/${userId}`)
          return data;
     } catch (error: any) {
          throw new Error("Failed to fetch the user carts")
     }
})


/**
 * * Add a products to user cart
 */

export const addToCarts = createAsyncThunk('carts/add', async (product: CartInterface) => {
     try {
          let { data } = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/carts`, product);
          return data;
     } catch (error: any) {
          throw new Error('Failed to add product to cart');
     }
});

/**
 * * Add a products to user cart
 */

export const removeFromCarts = createAsyncThunk('carts/remove', async (id: string | undefined) => {
     try {
          let { data } = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/carts/${id}`);
          return data;
     } catch (error: any) {
          throw new Error('Failed to add product to cart');
     }
});


/**
 * * update a products quantity to user cart
 */
export const updateProductQuantity = createAsyncThunk('carts/update', async (item: CartUpdate) => {
     try {
          let { data } = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/carts/${item.id}`, { quantity: item.quantity });
          return data;
     } catch (error: any) {
          throw new Error('Failed to add product to cart');
     }
});



export const cartSlice = createSlice({
     name: 'carts',
     initialState,
     reducers: {},
     extraReducers: (builder) => {
          // Handle the pending state while fetching carts
          builder.addCase(fetchCarts.pending, (state) => {
               state.isLoading = true;
               state.error = null;
          });

          // Handle the fulfilled state with the fetched carts
          builder.addCase(fetchCarts.fulfilled, (state, action: PayloadAction<CartInterface[]>) => {
               state.isLoading = false;
               state.error = null;
               state.carts = action.payload;
          });

          // Handle the rejected state if fetching carts fails
          builder.addCase(fetchCarts.rejected, (state, action) => {
               state.isLoading = false;
               state.error = action.error.message || 'Failed to fetch products.';
          });


          /**
           * * Handling Adding carts action
           */
          // Handle the pending state while add carts
          builder.addCase(addToCarts.pending, (state) => {
               state.isLoading = true;
               state.error = null;
          });

          // Handle the fulfilled state with the added carts
          builder.addCase(addToCarts.fulfilled, (state, action: PayloadAction<CartInterface>) => {
               const { _id, quantity } = action.payload;
               const existingProduct = state.carts.find((item) => item._id === _id);

               if (existingProduct) {
                    existingProduct.quantity = quantity;
               } else {
                    state.carts.push(action.payload)
               }
               state.isLoading = false;
               state.error = null;
          });

          // Handle the rejected state if adding carts fails
          builder.addCase(addToCarts.rejected, (state, action) => {
               state.isLoading = false;
               state.error = action.error.message || 'Failed to fetch products.';
          });


          /**
           * * Handling Remove carts action
           */

          // Handle the pending state while add carts
          builder.addCase(removeFromCarts.pending, (state) => {
               state.isLoading = true;
               state.error = null;
          });

          // Handle the fulfilled state with the added carts
          builder.addCase(removeFromCarts.fulfilled, (state, action: PayloadAction<CartInterface>) => {
               const { _id } = action.payload;
               state.carts = state.carts.filter((item) => item._id !== _id);

               state.isLoading = false;
               state.error = null;
          });

          // Handle the rejected state if adding carts fails
          builder.addCase(removeFromCarts.rejected, (state, action) => {
               state.isLoading = false;
               state.error = action.error.message || 'Failed to fetch products.';
          });


          /**
           * * Handling update item quantity carts action
           */

          // Handle the pending state while update carts quantity
          builder.addCase(updateProductQuantity.pending, (state) => {
               state.isLoading = true;
               state.error = null;
          });
          // Handle the fulfilled state with the update carts quantity
          builder.addCase(updateProductQuantity.fulfilled, (state, action: PayloadAction<CartInterface>) => {
               const { _id, quantity } = action.payload;
               const existingProduct = state.carts.find((item) => item._id === _id);

               if (existingProduct) {
                    existingProduct.quantity = quantity;
               }
               state.isLoading = false;
               state.error = null;
          });

          // Handle the rejected state if adding update carts fails
          builder.addCase(updateProductQuantity.rejected, (state, action) => {
               state.isLoading = false;
               state.error = action.error.message || 'Failed to fetch products.';
          });
     }
})

export default cartSlice.reducer;

export const selectCarts = (state: RootState) => state.carts.carts
export const selectLoading = (state: RootState) => state.carts.isLoading;
export const selectError = (state: RootState) => state.carts.error;