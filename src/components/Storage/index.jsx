import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"
import Loader from "../Loader"
import "./styles.css"

const Storages = () => {
  const [validation, setValidation] = useState("")
  const [loading, setLoading] = useState(false)
  const [category, setCategory] = useState("")
  const token = localStorage.getItem("token")
  const [amount, setAmount] = useState(0)
  const [name, setName] = useState("")
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {
    error,
  } = useSelector(({StorageReducer})=> ({
    error: StorageReducer.error,
  }))

  useEffect(() =>{
    if(!token) navigate("/")
  }, [])

  const validationData = () => {
    setLoading(true)
    if(!name) {
      setValidation("Title's required")
      setLoading(false)
      return (false)
    }
    if(!category) {
      setValidation("Category's required")
      setLoading(false)
      return (false)
    }
    if(!amount) {
      setValidation("Amount's required")
      setLoading(false)
      return (false)
    }
    setValidation('')
  }

  const handleSubmit = async () => {
    if(validationData()) {
      try {
        const {data} = await axios({
          method: 'POST',
          baseURL: process.env.REACT_APP_SERVER,
          url: '/storages/create',
          data: { name, category, amount, },
          headers: {
            'Authorization': `Bearer ${token}`
          },
        })
        dispatch({type: "STORAGE_SUCCESS", payload: data })
        setLoading(false)
      } catch (error) {
        dispatch({ type: "STORAGE_ERROR", payload: error })
        setLoading(false)
      }
    }
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
            onChange={e => {setName(e.target.value)}}
          />
        </div>
        <div className="categoryStorage">
          <label className="categoryTitle">Category store: </label>
          <input
            className="inputOption"
            name="amount"
            placeholder="For example cereals"
            onChange={e => {setCategory(e.target.value)}}
          />
        </div>
        <div className="amountStore">
          <label className="amountTitle">Amount store:</label>
          <input
            type="number"
            className="inputOption"
            name="amount"
            placeholder="Number of items"
            onChange={e => setAmount(e.target.value)}
          />
        </div>
        {!loading ?
          <button
            className='createStorage'
            onClick={handleSubmit}
          >
            Create storage
          </button> : <Loader />
        }
        {validation && <p>{validation}</p>}
        {error && <p>Algo salio mal.</p>}
      </div>
    </div>
  )
}

export default Storages