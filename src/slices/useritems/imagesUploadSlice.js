
import { createSlice,createEntityAdapter, createAsyncThunk } from '@reduxjs/toolkit';
import axios from "../../baseAxios";

  export const uploaditemImagesData = createAsyncThunk(
    'itemImages/uploaditemImages',
    async (_, thunkAPI) => {
   try {
       const response = await axios(
        {
          method: "POST",
          url: `images/upload_item/api_key/${process.env.REACT_APP_API_SECURITY_KEY}/`,
          data: _ ,
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
  
  const itemImagesUploadAdapter = createEntityAdapter({
    selectId:(itemImagesUpload) =>itemImagesUpload.id,
  })

  console.log(uploaditemImagesData);
  const imagesUploadSlice = createSlice({
    name: 'itemImagesUpload',
    initialState:itemImagesUploadAdapter.getInitialState({loading:false}),
    reducer:{},
    extraReducers: {
      [uploaditemImagesData.pending]: (state, action) => {
        state.loading = true;
        state.error = null;
      },
      [uploaditemImagesData.fulfilled]: (state, {payload}) => {
        state.loading = false;
        itemImagesUploadAdapter.setAll(state,payload)
      },
      [uploaditemImagesData.rejected]: (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      },
    },
  });

// export const { logout } = itemSlice.actions;
export const itemImagesuploadSelectors = itemImagesUploadAdapter.getSelectors((state) => state.itemImagesUpload)
export default imagesUploadSlice.reducer;