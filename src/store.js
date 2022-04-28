import { configureStore } from '@reduxjs/toolkit';
// import booksReducer from './reducers/booksReducer';
import itemReducer from './slices/items/itemSlice';
import itemImagesReducer from './slices/items/itemImagesSlice';
import locationReducer from './slices/items/locationsSlice';
import userItemReducer from './slices/useritems/userItemSlice'
import itemUploadReducer from './slices/useritems/itemAddSlice';
import imagesUploadReducer from './slices/useritems/imagesUploadSlice';
import loginUserReducer from './slices/userprofile/loginuserdataSlice';
import userProfileupdateReducer from './slices/userprofile/profileupdateSlice';
import filterSliceReducer from './slices/items/filter/filterSlice'

const store = configureStore({
  reducer: {
     items: itemReducer,
     itemimages: itemImagesReducer,
     locations: locationReducer,
     userItems:userItemReducer,
     itemUpload:itemUploadReducer,
     itemImagesUpload:imagesUploadReducer,
     loginuser:loginUserReducer,
     userProfileupdate:userProfileupdateReducer,
     filter:filterSliceReducer,
    },
});

export default store;
