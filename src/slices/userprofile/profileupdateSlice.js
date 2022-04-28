
import { createSlice,createEntityAdapter, createAsyncThunk } from '@reduxjs/toolkit';
import axios from "../../baseAxios";

  export const fetchUserprofileUpdateListData = createAsyncThunk(
    'userProfileupdate/getuserProfileupdate',
    async (_, thunkAPI) => {
   try {
       const response = await axios(
        {
          method: "POST",
          url: `users/profile_update/api_key/${process.env.REACT_APP_API_SECURITY_KEY}/`,
          data: {
            id: 'usr7298ac1214aae6d0c30c0e70aff3ca8e',
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
  
  const userprofileupdateAdapter = createEntityAdapter({
    selectId:(userProfileupdate) =>userProfileupdate.id,
  })

  console.log(fetchUserprofileUpdateListData);
  const userProfileupdateSlice = createSlice({
    name: 'userProfileupdate',
    initialState:userprofileupdateAdapter.getInitialState({loading:false}),
    reducer:{},
    extraReducers: {
      [fetchUserprofileUpdateListData.pending]: (state, action) => {
        state.loading = true;
        state.error = null;
      },
      [fetchUserprofileUpdateListData.fulfilled]: (state, {payload}) => {
        state.loading = false;
        userprofileupdateAdapter.setAll(state,payload)
      },
      [fetchUserprofileUpdateListData.rejected]: (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      },
    },
  });

// export const { logout } = itemSlice.actions;
export const userProfileupdateSelectors = userprofileupdateAdapter.getSelectors((state) => state.userProfileupdate)
export default userProfileupdateSlice.reducer;