import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {configureStore} from '@reduxjs/toolkit';
import {Provider} from 'react-redux';
import {api} from "./reduxSlices/Api.jsx"
import userReducer from "./reduxSlices/User.jsx"
import {setupListeners} from '@reduxjs/toolkit/query';
import modalReducer from './reduxSlices/Modal';



// Store is where we store all of out states and variables
// Provider allows us to access the store form anywhere in our app
// We have to pass a property called reducer passing in a object that contains all of our reducers
const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    user: userReducer,
    modal: modalReducer
  },
  middleware: (getDefault) => getDefault().concat(api.middleware)
})
setupListeners(store.dispatch)



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);



