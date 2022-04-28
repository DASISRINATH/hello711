import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { fetchItemListData } from '../itemSlice'

const sliceName = 'filter'

const filterSlice = createSlice({
  name: sliceName,
  initialState: {
    page: 1,
  },
  reducers: {
    setPageState: (state, action) => {
      state.page = action.payload
    },
  },
})

const {
  setPageState,
} = filterSlice.actions


export const setPage = createAsyncThunk(
  `${sliceName}/setPage`,
  (payload, { dispatch }) => {
    dispatch(setPageState(payload))
    dispatch(fetchItemListData())
  }
)

export default filterSlice.reducer
