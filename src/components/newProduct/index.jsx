import { useDispatch, useSelector } from "react-redux"
import { Toaster, toast } from "react-hot-toast"
import axios from "axios"
import { useEffect } from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Loader from "../Loader"
import "./styles.css"


const NewProduct = () => {
  const [loading, setLoading] = useState(false)
  const [validation, setValidation] = useState("")
  const [amount, setAmount] = useState(0)
  const token = localStorage.getItem("token")
  const [destiny, setDestiny] = useState("")
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() =>{
    if(!token) navigate("/")
    dataStorages()
  }, [])

  const {
    error,
    storages,
  } = useSelector(({StorageReducer})=> ({
    error: StorageReducer.error,
    storages : StorageReducer.storages
  }))

  const dataStorages = async () => {
    const {data} = await axios({
      method: 'GET',
      baseURL: process.env.REACT_APP_SERVER,
      url: '/storages/getAll',
      headers: {
        'Authorization': `Bearer ${token}`
      },
    })
    dispatch({type: "STORAGE_SUCCESS", payload: data.storages })
  }

  const validationData = () => {
    setLoading(true)
    if(amount === 0){
      setValidation("amount cannot be 0")
      setLoading(false)
      return false
    }
    if(!storages) {
      setValidation("must be assigned to a storage")
      setLoading(false)
      return false
    }
    setValidation('')
    return true
  }

  const handleSubmit = async () => {
    // if(validationData()) {
    //   try {
    //     toast.success("The product was added")
    //     setLoading(false)
    //     cleanForm()
    //   } catch (error) {
    //     toast.error("Error in the added in the storage")
    //     dispatch({ type: "STORAGE_ERROR", payload: error })
    //     setLoading(false)
    //   }
    // }
  }
  console.log('xxx destiny: ', destiny);
  return (
    <div className="cardNewProduct">
      <div className="imageNewProduct">
        <img src="https://cutewallpaper.org/24/react-logo-png/view-page-24.html" alt="" />
      </div>
        <p className="productImage">Product image</p>
      <div className="amountProduct">
        <input
          className="inputAmount"
          type="number"
          placeholder="Units available"
          onChange={e => setAmount(e.target.value)}
          />
      </div>
      <div className="selectStorage">
        <p>Add to storage</p>
        <select onChange={(e) => setDestiny(e.target.value)}>
          {!!storages && storages.length > 0 ? storages.map(({ name }) => {
            return (
              <option value={name}>{name}</option>
            )
          }) : (
            <option>No existen bodegas</option>
          )}
        </select>
      </div>
      {!loading ?
        <button
          className="addNewProduct"
          onClick={handleSubmit}
        >
          Add product
        </button> : <Loader />
      }
      <Toaster
        position="button-right"
        duration="3000"
      />
      {validation && <p>{validation}</p>}
      {error && <p>Algo salio mal.</p>}
    </div>
  )
}

export default NewProduct