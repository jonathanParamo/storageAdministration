import { Outlet } from "react-router-dom"
import MainMenu from "../MainMenu"
import * as React from "react"
import "./styles.css"

const Home = () => {
  return (
    <div className="containerDashboard">
      <MainMenu />
      <Outlet />
    </div>
  )
}

export default Home