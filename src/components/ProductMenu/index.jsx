import { useState } from "react"
import Loader from "../Loader"
import axios from "axios"
import "./styles.css"

const ProductMenu = () => {
  const [loading, setLoading] = useState(false)

  const handleSubmit = () => {
    setLoading(true)
    // if(foods()){
    //   try {
    //     const {data} = await axios({
    //       method: 'POST',
    //       baseURL: process.env.REACT_APP_SERVER,
    //       url: '',
    //       data: foods
    //     })
    //     setLoading(false)
    //   } catch (error) {
    //     alert('algo salio mal')
    //     setLoading(false)
    //   }
    // }
    // if(homeAppliances()){
    //   try {
    //     const {data} = await axios({
    //       method: 'POST',
    //       baseURL: process.env.REACT_APP_SERVER,
    //       url: '',
    //       data: homeAppliances
    //     })
    //     setLoading(false)
    //   } catch (error) {
    //     alert('algo salio mal')
    //     setLoading(false)
    //   }
    // }
    // if(constructionMaterials()){
    //   try {
    //     const {data} = await axios({
    //       method: 'POST',
    //       baseURL: process.env.REACT_APP_SERVER,
    //       url: '',
    //       data: constructionMaterials
    //     })
    //     setLoading(false)
    //   } catch (error) {
    //     alert('algo salio mal')
    //     setLoading(false)
    //   }
    // }
    // if(morePopular()){
    //   try {
    //     const {data} = await axios({
    //       method: 'POST',
    //       baseURL: process.env.REACT_APP_SERVER,
    //       url: '',
    //       data: morePopular
    //     })
    //     setLoading(false)
    //   } catch (error) {
    //     alert('algo salio mal')
    //     setLoading(false)
    //   }
    // }
  }

  return (
    <div className="containerProducMenu">
      <h2 className="titleProducts">Products</h2>
      <button
        className="btnProducts"
        onClick={() => {
          handleSubmit()
          //foods()
          ().stopPropagation()
        }}
      >
        Foods
      </button>
      <button
        className="btnProducts"
        onClick={() => {
          handleSubmit()
          //homeAppliances()
          ().stopPropagation()
        }}
        >
          Home appliances
      </button>
      <button
        className="btnProducts"
        onClick={() => {
          handleSubmit()
          //constructionMaterials()
          ().stopPropagation()
        }}
      >
        Construction materials
      </button>
      <button
        className="btnProducts"
        onClick={() => {
          handleSubmit()
          //morePopular()
          ().stopPropagation()
        }}
      >
        More popular
      </button>
    </div>
  )
}

export default ProductMenu