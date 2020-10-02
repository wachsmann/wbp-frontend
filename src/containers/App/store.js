
import { reducer as reduxFormReducer } from 'redux-form';
import { sidebarReducer, themeReducer, rtlReducer } from '../../redux/reducers/index';
import { configureStore,combineReducers } from "@reduxjs/toolkit";
import rootReducer from '../../redux/reducers/index';

const reducer = combineReducers(rootReducer);
const store = configureStore({
  reducer,
  //middleware,
  devTools: process.env.NODE_ENV !== 'production',
})

export default store;

