import { createSlice,createEntityAdapter, createAsyncThunk } from '@reduxjs/toolkit';
import axios from "../../baseAxios";

  export const fetchItemListData = createAsyncThunk(
    'item/getItemsList',
    async (_, thunkAPI) => {
      try {
        console.log(_.sort)
        //const response = await axios.get(`items/get/api_key/${process.env.REACT_APP_API_SECURITY_KEY}/limit/1/`); 
        //const data = await response.data;
        const response = await axios(
          {
            method: "POST",
            url: `items/search/api_key/${process.env.REACT_APP_API_SECURITY_KEY}/limit/10/offset/${_.offset}/`,
            data: _.sort ,
          }
        ); 
        const data = await response.data;
        return data;
       } catch (error) {
        return thunkAPI.rejectWithValue({ error: error.message });
      }
    }
  );
  
  const itemsAdapter = createEntityAdapter({
    selectId:(item) =>item.id,
  })

  console.log(fetchItemListData);
  const itemSlice = createSlice({
    name: 'item',
    initialState:itemsAdapter.getInitialState({loading:false}),
    reducer:{},
    extraReducers: {
      [fetchItemListData.pending]: (state, action) => {
        state.loading = true;
        state.error = null;
      },
      [fetchItemListData.fulfilled]: (state, {payload}) => {
        state.loading = false;
        itemsAdapter.setAll(state,payload)
      },
      [fetchItemListData.rejected]: (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      },
    },
  });


// export const { logout } = itemSlice.actions;
export const itemsSelectors = itemsAdapter.getSelectors((state) => state.items)
export default itemSlice.reducer;