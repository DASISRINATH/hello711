import { createSlice,createEntityAdapter, createAsyncThunk } from '@reduxjs/toolkit';
import axios from "../baseAxios";

  export const fetchItemImagesListData = createAsyncThunk(
    'itemImages/getItemImagesList',
    async (_, thunkAPI) => {
      try {
       const response = await axios.get(`images/get/api_key/${process.env.REACT_APP_API_SECURITY_KEY}/img_parent_id/${_}/`); 
        const data = await response.data;
        return data;
       } catch (error) {
        return thunkAPI.rejectWithValue({ error: error.message });
      }
    }
  );
  
  const itemImagesAdapter = createEntityAdapter({
    selectId:(itemImages) =>itemImages.img_id,
  })

  console.log(fetchItemImagesListData);
  const itemImagesSlice = createSlice({
    name: 'itemImages',
    initialState:itemImagesAdapter.getInitialState({loading:false}),
    reducer:{},
    extraReducers: {
      [fetchItemImagesListData.pending]: (state, action) => {
        state.loading = true;
        state.error = null;
      },
      [fetchItemImagesListData.fulfilled]: (state, {payload}) => {
        state.loading = false;
        itemImagesAdapter.setAll(state,payload)
      },
      [fetchItemImagesListData.rejected]: (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      },
    },
  });


// export const { logout } = itemImagesSlice.actions;
export const itemImagesSelectors = itemImagesAdapter.getSelectors((state) => state.itemimages)
export default itemImagesSlice.reducer;