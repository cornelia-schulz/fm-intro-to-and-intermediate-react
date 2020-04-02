import { createStore } from 'redux';
import reducer from './reducers';

const store = createStore(
  reducer,
  
  // if redux dev tools are available, use them:
  typeof window === 'object' &&
    typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined' ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
  );

export default store;