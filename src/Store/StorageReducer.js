const STORAGE_ERROR = 'STORAGE_ERROR'
const CANCEL_UPDATE = 'CANCEL_UPDATE'
const UPDATE_STORAGE = 'UPDATE_STORAGE'
const STORAGE_SUCCESS = 'STORAGE_SUCCESS'
const STORAGE_LOADING = 'STORAGE_LOADING'
const STORAGE_SECTION = 'STORAGE_SECTION'

const initialState = {
  storages: {},
  loading: false,
  error: null,
  section: 'create',
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
    case STORAGE_SECTION:
      return {
        ...state,
        section: action.payload,
      }
    case UPDATE_STORAGE:
      return {
        ...state,
        section: 'update',
        storageId: action.payload,
      }
    case CANCEL_UPDATE:
      return {
        ...state,
        section: 'view',
        storageId: '',
      }
    default:
      return state
  }
}