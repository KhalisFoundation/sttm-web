import { compose, createStore, applyMiddleware } from 'redux';
import createDebounce from 'redux-debounced';
import reducer from '../reducers';
import thunk from 'redux-thunk';
import { initialState } from './initialState';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancer = composeEnhancers(applyMiddleware(createDebounce(), thunk));
const store = createStore(reducer, initialState, enhancer);

export default store;
