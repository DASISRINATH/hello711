import { createSlice,createEntityAdapter, createAsyncThunk } from '@reduxjs/toolkit';
import axios from "../../baseAxios";

  export const fetchloginuserListData = createAsyncThunk(
    'loginUser/getLoginUser',
    async (_, thunkAPI) => {
      try {
       const response = await axios.get(`users/get/api_key/${process.env.REACT_APP_API_SECURITY_KEY}/id/${_}/`,); 
        const data = await response.data;
        return data;
       } catch (error) {
        return thunkAPI.rejectWithValue({ error: error.message });
      }
    }
  );
  
  const loginuserdataAdapter = createEntityAdapter({
    selectId:(loginuser) =>loginuser.id,
  })

  console.log(fetchloginuserListData);
  const loginUserSlice = createSlice({
    name: 'loginuser',
    initialState:loginuserdataAdapter.getInitialState({loading:false}),
    reducer:{},
    extraReducers: {
      [fetchloginuserListData.pending]: (state, action) => {
        state.loading = true;
        state.error = null;
      },
      [fetchloginuserListData.fulfilled]: (state, {payload}) => {
        state.loading = false;
        loginuserdataAdapter.setAll(state,payload)
      },
      [fetchloginuserListData.rejected]: (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      },
    },
  });



export const loginuserSelectors = loginuserdataAdapter.getSelectors((state) => state.loginuser)
export default loginUserSlice.reducer;