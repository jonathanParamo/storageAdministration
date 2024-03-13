import axios from "axios"

const CANCEL_UPDATE = 'CANCEL_UPDATE'
const PRODUCT_SUCCESS = 'PRODUCT_SUCCESS'
const UPDATE_PRODUCT = 'UPDATE_PRODUCT'
const PRODUCT_ERROR = 'PRODUCT_ERROR'

const initialState = {
  loading: false,
  error: null,
  products: {},
  productId: ''
}

export const getProducts = (token) => {
  return async function(dispatch){
    try {
      const { data } = await axios({
        method: 'GET',
        baseURL: process.env.REACT_APP_SERVER,
        url: '/products/getAll',
        headers: {
          'Authorization': `Bearer ${token}`
        },
      })
      dispatch({type: "PRODUCT_SUCCESS", payload: data.products })
    } catch (error) {
      dispatch({type: "PRODUCT_ERROR", payload: error })
    }
  }
}

export function ProductReducer(state = initialState, action){
  switch(action.type) {
    case UPDATE_PRODUCT:
      return {
        ...state,
        productId: action.payload,
      }
    case CANCEL_UPDATE:
      return {
        ...state,
        productId: '',
    }
    case PRODUCT_SUCCESS:
      return {
        ...state,
        products: action.payload,
      }
    case PRODUCT_ERROR:
      return {
        ...state,
        error: action.payload,
      }
    default:
      return state
  }
}