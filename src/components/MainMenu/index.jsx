import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
import LogOut from "../LogOut"
import "./styles.css"

const MainMenu = () => {
  const token = localStorage.getItem("token")
  const navigate = useNavigate()

  useEffect(() =>{
    if(!token) navigate("/")
  }, [])

  return (
    <div className="containerMainMenu">
      <div className="logoMainMenu">
        Logo
      </div>
      <input
        className="searchMainMenu"
        placeholder="Search"
        type="search"
        name="search"
      />
      <div className="containerButtonsMainMenu">
        <button
          className="butonsMainMenu"
          onClick={() => navigate('/createNewProduct')}
        >
          Create a product
        </button>
        <button
          className="butonsMainMenu"
          onClick={() => navigate('/myproducts')}
        >
          My products
        </button>
        <button
          className="butonsMainMenu"
          onClick={() => navigate('/myProfile')}
        >
          My profile
        </button>
      </div>
      <LogOut />
    </div>
  )
}

export default MainMenu