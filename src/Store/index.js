import { createStore, combineReducers, applyMiddleware } from 'redux'
import { StorageReducer } from './StorageReducer'
import { ProductReducer } from './ProductReducer';
import { MenuReducer } from './MenuReducer';
import logger from 'redux-logger'
import thunk from 'redux-thunk'

const appReducers = combineReducers({
  StorageReducer,
  ProductReducer,
  MenuReducer,
})

const rootReducer = (state, action) => {
  if(action.type === 'USER_LOGOUT'){
    state = undefined
  }
  return appReducers(state, action)
}

const middlewares = applyMiddleware(thunk, logger)

export const store = createStore(rootReducer, middlewares)