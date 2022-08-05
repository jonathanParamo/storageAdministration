import { Route, Routes } from "react-router-dom"
import ProductMenu from "../ProductMenu"
import NewProduct from "../newProduct"
import MainMenu from "../MainMenu"
import Storage from "../Storage"
import * as React from "react"
import "./styles.css"

const Home = () => {

  return (
    <div className="containerDashboard">
      <MainMenu />
      <div className="containerProductMenuProducts">
        <ProductMenu />
        <div className="visualContent">
          <Routes>
            <Route path="mystorage" element={<Storage />} />
            <Route path="newproduct" element={<NewProduct />} />
          </Routes>
        </div>
      </div>
    </div>
  )
}

export default Home