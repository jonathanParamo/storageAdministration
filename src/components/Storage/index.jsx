import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { Toaster, toast } from "react-hot-toast"
import { useEffect, useState } from "react"
import Loader from "../Loader"
import axios from "axios"
import "./styles.css"

const Storages = ({ editMode, storageId }) => {
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
    storages,
    capacity,
  } = useSelector(({StorageReducer})=> ({
    error: StorageReducer.error,
    storages: StorageReducer.storages,
    capacity: StorageReducer.capacity,
  }))

  useEffect(() =>{
    if(!token) navigate("/")
    if (editMode) getStorage()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const existStorageData = !!storages && storages.length > 0;

  const storageAmount = () => {
    const count = existStorageData && storages.map(storage => {
      return storage.amount
    })

    return count?.reduce((a, b)=> a + b, 0)
  }


  const storageSpace = () => {
    return capacity - storageAmount()
  }

  const validationData = () => {
    setLoading(true)
    if(storageAmount() >= capacity) {
      setValidation("se excedio la capacidad de la bodega")
      setLoading(false)
      return false
    }
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

  const getStorage = () => {
    const storage = storages?.filter(({ _id }) => storageId === _id );
    setName(storage[0].name)
    setCategory(storage[0].category)
    setAmount(storage[0].amount)
  }

  const handleCreate = async () => {
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
        cleanForm()
      } catch (error) {
        toast.error("Error in the creation of the storage")
        dispatch({ type: "STORAGE_ERROR", payload: error })
        setLoading(false)
      }
    }
  }

  const handleEdit = async () => {
    if(validationData()) {
      try {
        const {data} = await axios({
          method: 'PUT',
          baseURL: process.env.REACT_APP_SERVER,
          url: '/storages/update',
          data: { name, category, amount, _id: storageId },
          headers: {
            'Authorization': `Bearer ${token}`
          },
        })
        toast.success("Storage successfully updated")
        dispatch({type: "STORAGE_SUCCESS", payload: data })
        setLoading(false)
        cleanForm()
      } catch (error) {
        toast.error("Error in the edit of the storage")
        dispatch({ type: "STORAGE_ERROR", payload: error })
        setLoading(false)
      }
    }
  }

  const onCancel = () => {
    dispatch({ type: 'CANCEL_UPDATE' })
    dispatch({ type: 'CHANGE_SECTION', payload: 'view' })
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
            autoComplete="off"
            className="titleStoreInput"
            placeholder="For example A25"
            type="text"
            name="titleStore"
            id="titleStore"
            onChange={e => {setName(e.target.value)}}
            value={name}
          />
        </div>
        <div className="categoryStorage">
          <label className="categoryTitle">Category store: </label>
          <input
            autoComplete="off"
            className="inputOption"
            name="amount"
            placeholder="For example cereals"
            onChange={e => {setCategory(e.target.value)}}
            value={category}
          />
        </div>
        <div className="amountStore">
          <label className="amountTitle">Amount store:</label>
          <input
            autoComplete="off"
            type="number"
            className="inputOption"
            name="amount"
            placeholder="Number of items"
            onChange={e => setAmount(e.target.value)}
            value={amount}
          />
        </div>
        <p className="storageSpace">
          Available space: { existStorageData ? storageSpace() : 'wait...' }
        </p>
        {!loading ?
          <button
            className='createStorage'
            onClick={editMode ? handleEdit : handleCreate}
          >
            {editMode ? 'Update' : 'Create'}
          </button> : <Loader />
        }
        {editMode && (
          <>
            <button
              className='createStorage'
              onClick={onCancel}
              >
              Cancel
            </button>
            <p>{storageSpace()}</p>
          </>
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