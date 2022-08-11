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

  useEffect(() =>{
    if(!token) navigate("/")
    dataStorages()
  }, [])

  const {
    storages,
  } = useSelector(({StorageReducer})=> ({
    storages : StorageReducer.storages
  }))

  const dataStorages = async () => {
    try {
      const {data} = await axios({
        method: 'GET',
        baseURL: process.env.REACT_APP_SERVER,
        url: '/storages/getAll',
        headers: {
          'Authorization': `Bearer ${token}`
        },
      })
      dispatch({type: "STORAGE_SUCCESS", payload: data.storages })
    } catch (error) {
      toast.error("There are no storages")
    }
  }

  return (
    <div className="MainContainer">
      {!!storages && storages.length > 0 ? storages.map(({ name, amount, category, id }) => {
        return (
          <div className="cardStorages">
            <div className="nameStorage">
              <label className="labelStorage">Storage:</label>
              <p className="componentStorage"
                value={name}
                >
                {name}
              </p>
            </div>
            <div className="nameStorage">
              <label className="labelStorage">Amount:</label>
              <p className="componentStorage">{amount}</p>
            </div>
            <div className="nameStorage">
              <label className="labelStorage">Category:</label>
              <p className="componentStorage">{category}</p>
            </div>
            <div className="buttonsStorages">
              <button
                className="editStorage"
                value={id}
                // onClick={}
                >
                Edit storage
              </button>
              <button
                className="deleteStorage"
                value={id}
                // onClick={}
                >
                Delete storage
              </button>
            </div>
          </div>
        )
      }) : (
        <Toaster
          position="button-center"
        />
        // <p>No existen bodegas</p>
      )}
    </div>
  )
}

export default ViewStorages