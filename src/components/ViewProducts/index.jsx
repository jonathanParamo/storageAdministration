import { useDispatch, useSelector } from "react-redux"
import { Toaster, toast } from "react-hot-toast"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { useEffect } from "react"
import axios from "axios"
import "./styles.css"

const ViewProducts = () => {
  const token = localStorage.getItem("token")
  const [image, setImage] = useState("")
  const [name, setName] = useState("")
  const [amount, setAmount] = useState(0)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { products } = useSelector(({ ProductReducer }) => ({
    products: ProductReducer.products,
  }));


  useEffect(() =>{
    if(!token) navigate("/")
    // getProducts()
  }, [])

  // const getProducts = () => {
  //   const products = products?.filter(({ _id }) => productId === _id );
  //   setName(products[0].name)
  //   setImage(products[0].image)
  //   setAmount(products[0].amount)
  // }

  const handleDelete = async (_id) => {
    try {
      const {data} = await axios({
        method: 'PUT',
        baseURL: process.env.REACT_APP_SERVER,
        url: '/product/destroy',
        data: { _id },
        headers: {
          'Authorization': `Bearer ${token}`
        },
      })
      toast.success("Storage has delete")
      dispatch({type: "STORAGE_SUCCESS", payload: data })
    } catch (error) {
      toast.error("Error in the creation of the storage")
      dispatch({ type: "STORAGE_ERROR", payload: error })
    }
  }

  const hasData = !!products && products.length > 0;

  const editProduct = (id) => {
    dispatch({ type: 'UPDATE_PRODUCT', payload: id })
    dispatch({ type: 'CHANGE_SECTION', payload: 'update' })
  }

  return (
    <div className="MainContainer">
      {hasData ? products.map(({ image, name, amount, storageId, _id }) => {
        return (
          <div className="card" key={_id}>
            <div className="image-product">
              <img src={image} alt="product ilustration" />
            </div>
            <div className="cardSection">
              <label className="cardLabel">Product:</label>
              <p className="cardText">
                {name}
              </p>
            </div>
            <div className="cardSection">
              <label className="cardLabel">Amount:</label>
              <p className="cardText">{amount}</p>
            </div>
            <div className="cardSection">
              <label className="cardLabel">Category:</label>
              <p className="cardText">{storageId}</p>
            </div>
            <div className="cardButton">
              <button
                className="editProduct"
                onClick={() => editProduct(_id)}
              >
                Edit product
              </button>
              <button
                className="deleteProduct"
                onClick={() => handleDelete(_id)}
              >
                Delete product
              </button>
            </div>
          </div>
        )
      }) : (
        <Toaster
          position="button-center"
        />
      )}
    </div>
  )
}

export default ViewProducts