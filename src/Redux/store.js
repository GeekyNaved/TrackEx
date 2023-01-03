import thunk from 'redux-thunk';
import { applyMiddleware, createStore } from 'redux';
import rootReducer from './Reducers';



export default createStore(rootReducer, applyMiddleware(thunk));