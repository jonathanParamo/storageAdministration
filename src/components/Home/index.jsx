import { Outlet } from "react-router-dom"
import ProductMenu from "../ProductMenu"
import MainMenu from "../MainMenu"
import * as React from "react"
import "./styles.css"

const Home = () => {

  return (
    <div className="containerDashboard">
      <MainMenu />
      <div className="containerProductMenuProducts">
        <ProductMenu />
        <div className="visualContent">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default Home