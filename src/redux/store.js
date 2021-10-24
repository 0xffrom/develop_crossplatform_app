import {
  applyMiddleware,
  combineReducers,
  createStore
} from "redux"
import thunkMiddleware from 'redux-thunk'
import {
  todos
} from "./todos"


const rootReducer = combineReducers({
  todos: todos
})

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware))
