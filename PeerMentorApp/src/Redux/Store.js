import { createStore, combineReducers } from 'redux';
import { reducer as network } from 'react-native-offline';

const rootReducer = combineReducers({
  network,
});

const store = createStore(rootReducer);
export default store;