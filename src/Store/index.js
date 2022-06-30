import thunk from 'redux-thunk'
import logger from 'redux-logger'
import { StorageReducer } from './StorageReducer'
import { createStore, combineReducers, applyMiddleware } from 'redux'

const appReducers = combineReducers({
  StorageReducer,
})

const rootReducer = (state, action) => {
  if(action.type === 'USER_LOGOUT'){
    state = undefined
  }
  return appReducers(state, action)
}

const middlewares = applyMiddleware(thunk, logger)

export const store = createStore(rootReducer, middlewares)