
import { TitleOutlined } from '@material-ui/icons';
import { createSlice,createEntityAdapter, createAsyncThunk } from '@reduxjs/toolkit';
import axios from "../../baseAxios";

//Fetch All User Items
  export const fetchUserItemListData = createAsyncThunk(
    'userItem/getUserItems',
    async (_, thunkAPI) => {
   try {
       const response = await axios(
        {
          method: "POST",
          url: `items/search/api_key/${process.env.REACT_APP_API_SECURITY_KEY}/`,
          data: {
            // added_user_id: 'c4ca4238a0b923820dcc509a6f75849b',
            //added_user_id: 'usrfbceafda0e2617e6152cf48a8013d9e2',
            added_user_id: _ ,

          },
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

//Delete a User Item
  export const deleteItemData = createAsyncThunk(
    'userItem/DeleteItem',
    async (_, thunkAPI) => {
    try {
       await axios(
        {
          method: "POST",
          url: `items/item_delete/api_key/${process.env.REACT_APP_API_SECURITY_KEY}/`,
          data: {
            item_id: _ ,
          },
        }
       ); 
      //  console.log({itemId:_});
      return (_);
      } catch (error) {
        return thunkAPI.rejectWithValue({ error: error.message });
       }
    }
  );
  
  //Update Item 
  export const patchItem = createAsyncThunk(
    'userItem/patchItem',
    async (_, postData,thunkAPI) => {
      try {
         await axios(
          {
            method: "POST",
            url: `items/add/api_key/${process.env.REACT_APP_API_SECURITY_KEY}/`,
            data: {
              item_id: _ ,
              title:postData.title,
            }
          }
         ); 
        // console.log({id:_,data:postData});
        return (_,postData.title);
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
      [deleteItemData.pending]: (state, action) => {
        state.loading = true;
        state.error = null;
      },
      [deleteItemData.rejected]: (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      },
      [deleteItemData.fulfilled]: (state, {payload:id}) => {
        state.loading = false;
        // console.log('item delete sucess');
        useritemsAdapter.removeOne(state,id)
      },
      [patchItem.pending](state){
        state.loading =true;
      },
      [patchItem.fulfilled](state,{payload}){
        state.loading = false;
        // useritemsAdapter.updateOne(state,{id:payload.id, changes:payload.changes})
      }
    },
  });

// export const { logout } = itemSlice.actions;
export const userItemsSelectors = useritemsAdapter.getSelectors((state) => state.userItems)
export default userItemSlice.reducer;