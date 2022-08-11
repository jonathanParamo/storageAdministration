import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { Toaster, toast } from "react-hot-toast"
import { useEffect, useState } from "react"
import Loader from "../Loader"
import axios from "axios"
import "./styles.css"

const Storages = ({ editMode, storageId }) => {
  const [validation, setValidation] = useState("")
  const [defaultValues, setDefaultValues] = useState([]);
  const [loading, setLoading] = useState(false)
  const [category, setCategory] = useState("")
  const token = localStorage.getItem("token")
  const [amount, setAmount] = useState(0)
  const [name, setName] = useState("")
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {
    error,
    storages,
  } = useSelector(({StorageReducer})=> ({
    error: StorageReducer.error,
    storages: StorageReducer.storages,
  }))

  useEffect(() =>{
    if(!token) navigate("/")
    if (editMode) setDefaultValues(storages?.filter(({ _id }) => storageId === _id ));
  }, [])

  const validationData = () => {
    setLoading(true)
    if(!name) {
      setValidation("Title's required")
      setLoading(false)
      return false
    }
    if(!category) {
      setValidation("Category's required")
      setLoading(false)
      return false
    }
    if(!amount) {
      setValidation("Amount's required")
      setLoading(false)
      return false
    }
    setValidation('')
    return true
  }

  const cleanForm = () => {
    setName("")
    setCategory("")
    setAmount("")
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
        toast.success("Storage successfully created")
        dispatch({type: "STORAGE_SUCCESS", payload: data })
        setLoading(false)
        navigate("/dashboard")
        cleanForm()
      } catch (error) {
        toast.error("Error in the creation of the storage")
        dispatch({ type: "STORAGE_ERROR", payload: error })
        setLoading(false)
      }
    }
  }

  const onCancel = () => {
    dispatch({ type: 'CANCEL_UPDATE' })
  }

  return (
    <div className="mainStore">
      <div className="cardMainStore">
        <p className="newStorage">{editMode ? 'Edit storage' : 'New storage'}</p>
        <div className="titleStoreContainer">
          <label
            htmlFor="titleStore"
            className="titleStore"
          >
            Code store:
          </label>
          <input
            className="titleStoreInput"
            placeholder="For example A25"
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
            {editMode ? 'Update' : 'Create'}
          </button> : <Loader />
        }
        {editMode && (
          <button
            className='createStorage'
            onClick={onCancel}
          >
            Cancel
          </button>
          )}
        <Toaster
          position="button-center"
          duration="3000"
        />
        {validation && <p>{validation}</p>}
        {error && <p>Algo salio mal.</p>}
      </div>
    </div>
  )
}

export default Storages