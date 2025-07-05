import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchItems = createAsyncThunk("Items/fetchItems", async () => {
  const response = await axios.get("http://localhost:8080/api/Items");
  return response.data;
});

export const approveItem = createAsyncThunk("Items/approveItem", async (id) => {
  await axios.put(`http://localhost:8080/api/admin/approve/${id}`);
  return id;
});

export const deleteItem = createAsyncThunk("Items/deleteItem", async (id) => {
  await axios.delete(`http://localhost:8080/api/admin/delete/${id}`);
  return id;
});

const ItemsSlice = createSlice({
  name: "items",
  initialState: {
    items: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchItems.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchItems.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchItems.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(approveItem.fulfilled, (state, action) => {
        state.items = state.items.map((Item) =>
          Item.id === action.payload ? { ...Item, status: "approved" } : Item
        );
      })
      .addCase(deleteItem.fulfilled, (state, action) => {
        state.items = state.items.filter((Item) => Item.id !== action.payload);
      });
  },
});

export default ItemsSlice.reducer;