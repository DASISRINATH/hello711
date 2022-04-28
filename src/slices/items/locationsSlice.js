import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from "../../baseAxios";

  export const fetchLocationsData = createAsyncThunk(
    'location/getLocations',
    async (_, thunkAPI) => {
      try {
      //  const response = await axios.get('https://api.test.takengo.risee.in/index.php/rest/items/get/api_key/1fWwZNrzUiOW2pWEffgy3fXS1R7khL/limit/10/');
       const response = await axios.get(`itemlocations/get/api_key/${process.env.REACT_APP_API_SECURITY_KEY}/`); 
      // const response = await fetch('https://randomuser.me/api/');
        const data = await response.data;
        return data;
      } catch (error) {
        return thunkAPI.rejectWithValue({ error: error.message });
      }
    }
  );

  console.log(fetchLocationsData);
  const locationSlice = createSlice({
    name: 'location',
    initialState:{
    list:[],
    },
  
    extraReducers: {
      [fetchLocationsData.pending]: (state, action) => {
        state.loading = true;
        state.error = null;
      },
      [fetchLocationsData.fulfilled]: (state, action) => {
        state.location = action.payload;
        state.loading = false;
      },
      [fetchLocationsData.rejected]: (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      },
    },
  });


// export const { logout } = itemSlice.actions;

export default locationSlice.reducer;