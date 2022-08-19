import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
import LogOut from "../LogOut"
import logo from "./logo.png"
import "./styles.css"

const MainMenu = () => {
  const token = localStorage.getItem("token")
  const navigate = useNavigate()

  useEffect(() =>{
    if(!token) navigate("/")
  }, [])

  return (
    <div className="containerMainMenu">
      <div >
        <img src={logo} className="logoMainMenu"/>
      </div>
      <input
        className="searchMainMenu"
        placeholder="Search"
        type="search"
        name="search"
      />
      <div className="containerButtonsMainMenu">
        <p
          className="buttonsMainMenu"
          onClick={() => navigate('products')}
        >
          Products
        </p>
        <p
          className="buttonsMainMenu"
          onClick={() => navigate('storages')}
        >
          Storages
        </p>
        <p
          className="buttonsMainMenu"
          onClick={() => navigate('/profile')}
        >
          Profile
        </p>
      </div>
      <LogOut />
    </div>
  )
}

export default MainMenu