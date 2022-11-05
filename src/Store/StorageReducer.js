import axios from "axios"
const token = localStorage.getItem('token');

const STORAGE_ERROR = 'STORAGE_ERROR'
const CANCEL_UPDATE = 'CANCEL_UPDATE'
const UPDATE_STORAGE = 'UPDATE_STORAGE'
const STORAGE_SUCCESS = 'STORAGE_SUCCESS'
const STORAGE_LOADING = 'STORAGE_LOADING'
const STORAGE_CAPACITY = 'STORAGE_CAPACITY'
const STORAGE_SEARCH = 'STORAGE_SEARCH'

const initialState = {
  storages: {},
  loading: false,
  error: null,
  storageId: '',
  capacity: 2000,
  storageSearch: {},
}

export const getStorages = () => {
  return async function(dispatch){
    try {
      const { data } = await axios({
        method: 'GET',
        baseURL: process.env.REACT_APP_SERVER,
        url: '/storages/getAll',
        headers: {
          'Authorization': `Bearer ${token}`
        },
      })
      dispatch({type: "STORAGE_SUCCESS", payload: data.storages })
    } catch (error) {
      dispatch({type: "STORAGE_ERROR", payload: error })
    }
  }
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
    case STORAGE_CAPACITY:
      return {
        ...state,
        capacity: action.payload,
      }
    case STORAGE_SEARCH:
      return {
        ...state,
        storageSearch: action.payload,
      }
    default:
      return state
  }
}