import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"
import Loader from "../Loader"
import "./styles.css"

const Storages = () => {
  const [validationAmount, setValidationAmount] =useState(false)
  const [validation, setValidation] = useState(false)
  const [loading, setLoading] = useState(false)
  const [category, setCategory] = useState("")
  const token = localStorage.getItem("token")
  const [amount, setAmount] = useState(0)
  const [title, setTitle] = useState("")
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {
    storages,
  } = useSelector(({StorageReducer})=> ({
    storages: StorageReducer.storages,
  }))

  const {
    error,
  } = useSelector(({StorageReducer})=> ({
    error: StorageReducer.error,
  }))

  useEffect(() =>{
    if(!token) navigate("/")
  }, [])

  const handleSubmit = () => {
    setLoading(true)
    if(!title) {
      dispatch({ type: "STORAGE_ERROR", payload: error })
      setLoading(false)
    }
    if(amount === 0) {
      setValidationAmount(true)
      setLoading(false)
    }

    const newStorage = {
      title,
      category,
      amount,
    }
    try {
      const {data} = axios({
        method: 'POST',
        baseURL: process.env.REACT_APP_SERVER,
        url: '/users/signup',
        data: newStorage,
      })
      dispatch({type: "NEW_STORAGE", payload: storages })
      setLoading(false)
    } catch (error) {
      dispatch({ type: "STORAGE_ERROR", payload: error })
      setLoading(false)
    }
    setLoading(false)
  }

  return (
    <div className="mainStore">
      <div className="cardMainStore">
        <p className="newStorage">New storage</p>
        <div className="titleStoreContainer">
          <label
            htmlFor="titleStore"
            className="titleStore"
          >
            Title store:
          </label>
          <input
            className="titleStoreInput"
            type="text"
            name="titleStore"
            id="titleStore"
            onChange={e => {
              setTitle(e.target.value)
              setValidation(false)
            }}
          />
        </div>
        <div className="categoryStorage">
          <p className="categoryTitle">Category store: </p>
          <select
            className="selectOption"
            name="amount"
            onClick={e => setCategory(e.target.value)}
          >
            <option value="food">Foods</option>
            <option value="homeAppliances">Home appliances</option>
            <option value="constructionMaterials">Construction materials</option>
          </select>
        </div>
        <div className="amountStore">
          <p className="amountTitle">Amount store:</p>
          <select
            className="selectOption"
            name="amount"
            onClick={e => setAmount(e.target.value)}
          >
            <option value=""></option>
            <option value="oneHundred">100 Units</option>
            <option value="twoHundredFifty">250 Units</option>
            <option value="fiveHundred">500 Units</option>
          </select>
        </div>
        {!loading ?
          <button
            className='createStorage'
            onClick={e => {
              handleSubmit()
              e.stopPropagation()
            }}
          >
            Create storage
          </button> : <Loader />
        }
        {error && <p>Title store is required.</p>}
        {validationAmount && <p>Title store is required.</p>}
        {error && <p>Algo salio mal.</p>}
      </div>
    </div>
  )
}

export default Storages