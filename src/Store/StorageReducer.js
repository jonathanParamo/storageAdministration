
const STORAGE_ERROR = 'RECIPE_ERROR'
const STORAGE_SUCCESS = 'RECIPE_SUCCESS'
const STORAGE_LOADING = 'RECIPE_LOADING'

const initialState = {
  storages: {},
  loading: false,
  error: null,
}

export function StorageReducer(state = initialState, action){
  switch(action.type) {
    case STORAGE_LOADING:
      return {
        ...state,
        loading: action.payload,
      }
    case STORAGE_SUCCESS:
      return {
        ...state,
        storages: action.payload,
      }
    case STORAGE_ERROR:
      return {
        ...state,
        error: action.payload,
      }
    default:
      return state
  }
}