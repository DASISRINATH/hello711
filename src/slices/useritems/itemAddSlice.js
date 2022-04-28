import { createSlice,createEntityAdapter, createAsyncThunk } from '@reduxjs/toolkit';
import axios from "../../baseAxios";

  export const fetchUserItemUploadData = createAsyncThunk(
    'itemUpload/getItemUpload',
    async (_, thunkAPI) => {
   try {
       await axios(
        {
          method: "POST",
          url: `items/add/api_key/${process.env.REACT_APP_API_SECURITY_KEY}/`,
          data: _ ,
        }
       ); 
      //  console.log(response.config);
        // const data = await response.data;
        return (_);
       } catch (error) {
        return thunkAPI.rejectWithValue({ error: error.message });
       }
    }
  );
  
  const itemuploadAdapter = createEntityAdapter({
    selectId:(itemUpload) => itemUpload.added_user_id,
  })

  console.log(fetchUserItemUploadData);
  const itemUploadSlice = createSlice({
    name: 'itemUpload',
    initialState:itemuploadAdapter.getInitialState({loading:false}),
    reducer:{},
    extraReducers: {
      [fetchUserItemUploadData.pending]: (state, action) => {
        state.loading = true;
        state.error = null;
      },
      [fetchUserItemUploadData.fulfilled]: (state, {payload:id}) => {
        state.loading = false;
        //itemuploadAdapter.addOne(state,id)
      },
      [fetchUserItemUploadData.rejected]: (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      },
    },
  });

// export const { logout } = itemSlice.actions;
export const itemUploadSelectors = itemuploadAdapter.getSelectors((state) => state.itemUpload)
export default itemUploadSlice.reducer;