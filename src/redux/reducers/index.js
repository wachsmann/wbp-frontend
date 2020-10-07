import themeReducer from './themeReducer';
import sidebarReducer from './sidebarReducer';
import rtlReducer from './rtlReducer';
import authReducer from './authReducer'
import routingReducer from './routingReducer'
import { reducer as reduxFormReducer } from 'redux-form';
const rootReducer = {
  
  //sidebar:sidebarReducer,
  //rtl:rtlReducer,
  auth:authReducer,
  form: reduxFormReducer, // mounted under "form",
  //theme: themeReducer,
  routing:routingReducer 
 
};

export default rootReducer
