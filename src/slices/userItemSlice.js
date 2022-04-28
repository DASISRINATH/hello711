
import { createSlice,createEntityAdapter, createAsyncThunk } from '@reduxjs/toolkit';
import axios from "../baseAxios";

  export const fetchUserItemListData = createAsyncThunk(
    'userItem/getUserItems',
    async (_, thunkAPI) => {
   try {
       const response = await axios(
        {
          method: "POST",
          url: `items/search/api_key/${process.env.REACT_APP_API_SECURITY_KEY}/`,
          data: {
            added_user_id: 'usr7298ac1214aae6d0c30c0e70aff3ca8e',
          }
        }
       ); 
       console.log(response.config);
        const data = await response.data;
        return data;
       } catch (error) {
        return thunkAPI.rejectWithValue({ error: error.message });
       }
    }
  );
  
  const useritemsAdapter = createEntityAdapter({
    selectId:(userItem) =>userItem.id,
  })

  console.log(fetchUserItemListData);
  const userItemSlice = createSlice({
    name: 'userItem',
    initialState:useritemsAdapter.getInitialState({loading:false}),
    reducer:{},
    extraReducers: {
      [fetchUserItemListData.pending]: (state, action) => {
        state.loading = true;
        state.error = null;
      },
      [fetchUserItemListData.fulfilled]: (state, {payload}) => {
        state.loading = false;
        useritemsAdapter.setAll(state,payload)
      },
      [fetchUserItemListData.rejected]: (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      },
    },
  });

// export const { logout } = itemSlice.actions;
export const userItemsSelectors = useritemsAdapter.getSelectors((state) => state.items)
export default userItemSlice.reducer;