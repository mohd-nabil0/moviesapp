import {configureStore, applyMiddleware} from '@reduxjs/toolkit';
import reducer from './Reducer';

const middlewares = [
  /* other middlewares */
];
// if (__DEV__) {
//   const createDebugger = require('redux-flipper').default;
//   middlewares.push(createDebugger());
// }

applyMiddleware;

export default () =>
  configureStore({
    reducer,
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware().concat(middlewares),
  });
