const initialState = {
  value: []
}

const SET_TODOS = 'SET_TODOS'
export const setTodosAC = (value) => ({
  type: SET_TODOS,
  value
})

const REMOVE_TODO = 'REMOVE_TODO'
export const removeTodoAC = (id) => ({
  type: REMOVE_TODO,
  id
})

const СHANGE_TODO = 'СHANGE_TODO'
export const changeTodoAC = (id, value) => ({
  type: СHANGE_TODO,
  id,
  value
})

const GET_TODOS = 'GET_TODOS'
export const getTodosAC = (value) => ({
  type: GET_TODOS,
  value
})


import AsyncStorage from '@react-native-async-storage/async-storage'

export const setTodos = (value) => {
  return async (dispatch) => {
    await AsyncStorage.getItem('todos')
      .then(data => {
        data = JSON.parse(data)
        AsyncStorage.setItem('todos', JSON.stringify(data ? [...data, value] : [value]))
        dispatch(setTodosAC(value))
      })
  }
}

export const changeTodo = (id, value) => {
  return async (dispatch) => {
    await AsyncStorage.getItem('todos')
      .then(data => {
        let ready = JSON.parse(data)
        ready.map(e => {
          if (e.id == id) {
            e.title = value
          }
          return e
        })
        AsyncStorage.setItem('todos', JSON.stringify(ready))
        dispatch(changeTodoAC(id, value))
      })
  }
}

export const removeTodo = (id) => {
  return async (dispatch) => {
    await AsyncStorage.getItem('todos')
      .then(data => {
        let res = JSON.parse(data).filter(e => e.id !== id)
        AsyncStorage.setItem('todos', JSON.stringify(res))
        dispatch(removeTodoAC(id))
      })
  }
}

export const getTodos = () => {
  return async (dispatch) => {
    try {
      const value = await AsyncStorage.getItem('todos')
      if (value) {
        dispatch(getTodosAC(JSON.parse(value)))
      }
    } catch (e) {}
  }
}

export const todos = (state = initialState, action) => {
  switch (action.type) {
    case GET_TODOS:
      return {
        ...state, value: action.value
      }
      case SET_TODOS:
        return {
          ...state, value: [...state.value, action.value]
        }
        case REMOVE_TODO:
          return {
            ...state, value: state.value.filter(e => e.id !== action.id)
          }
          case СHANGE_TODO:
            return {
              ...state, value: state.value.map(e => {
                if (e.id == action.id) {
                  e.title = action.value
                }
                return e
              })
            }
            default:
              return state
  }
}
