const STORAGE_ERROR = 'STORAGE_ERROR'
const CANCEL_UPDATE = 'CANCEL_UPDATE'
const UPDATE_STORAGE = 'UPDATE_STORAGE'
const STORAGE_SUCCESS = 'STORAGE_SUCCESS'
const STORAGE_LOADING = 'STORAGE_LOADING'

const initialState = {
  storages: {},
  loading: false,
  error: null,
  storageId: '',
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
    case UPDATE_STORAGE:
      return {
        ...state,
        storageId: action.payload,
      }
    case CANCEL_UPDATE:
      return {
        ...state,
        storageId: '',
      }
    default:
      return state
  }
}