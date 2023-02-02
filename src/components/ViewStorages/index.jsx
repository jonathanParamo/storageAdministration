import { getStorages } from "../../Store/StorageReducer"
import { getProducts } from "../../Store/ProductReducer"
import { useDispatch, useSelector } from "react-redux"
import { Toaster, toast } from "react-hot-toast"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
import axios from "axios"
import "./styles.css"

const ViewStorages = () => {
  const navigate = useNavigate()
  const token = localStorage.getItem("token")
  const dispatch = useDispatch()

  const {
    storages,
    products,
  } = useSelector(({StorageReducer, ProductReducer})=> ({
    storages : StorageReducer.storages,
    products : ProductReducer.products,
  }))

  useEffect(() =>{
    if(!token) navigate("/")
    dispatch(getStorages())
    dispatch(getProducts())
  }, [])

  const confirmDelete = (_id) => {
    const confirm = window.confirm("Are you sure you want to delete the storage?")
    const deleteStorage = products.filter(product => product.storageId === _id)

    if (!confirm) return
    if (confirm && deleteStorage.length) toast.error("Cannot delete a storage")
    if (confirm && !deleteStorage.length) handleDelete(_id)
  }

  const handleDelete = async (_id) => {
    try {
      const {data} = await axios({
        method: 'PUT',
        baseURL: process.env.REACT_APP_SERVER,
        url: '/storages/destroy',
        data: { _id },
        headers: {
          'Authorization': `Bearer ${token}`
        },
      })
      toast.success("Storage deleted")
      dispatch({type: "STORAGE_SUCCESS", payload: data })
    } catch (error) {
      toast.error("Error deleting the storage")
      dispatch({ type: "STORAGE_ERROR", payload: error })
    }
  }

  const hasData = !!storages && storages.length > 0;

  const editStorage = (id) => {
    dispatch({ type: 'UPDATE_STORAGE', payload: id })
    dispatch({ type: 'CHANGE_SECTION', payload: 'update' })
  }

  return (
    <div className="MainContainer">
      {hasData && storages.map(({ name, amount, category, _id }) => {
        return (
          <div className="card" key={_id}>
            <div className="cardSectionStorage">
              <label className="cardLabelStorage">Storage:</label>
              <div className="cardTextStorage">
                {name}
              </div>
            </div>
            <div className="cardSectionStorage">
              <label className="cardLabelStorage">Amount:</label>
              <div className="cardTextStorage">{amount}</div>
            </div>
            <div className="cardSectionStorage">
              <label className="cardLabelStorage">Category:</label>
              <div className="cardTextStorage">{category}</div>
            </div>
            <div className="cardStorageButton">
              <button
                className="editStorage"
                onClick={() => editStorage(_id)}
              >
                Edit
              </button>
              <button
                className="deleteStorage"
                onClick={() => confirmDelete(_id)}
              >
                Delete
              </button>
            </div>
          </div>
        )
      })}
      <Toaster
        position="button-center"
      />
    </div>
  )
}

export default ViewStorages