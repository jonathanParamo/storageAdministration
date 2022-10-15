import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import menuImage from './menu.png';
import LogOut from "../LogOut"
import logo from "./logo.png"
import "./styles.css"
import useResponsive from '../../helpers/useResponsive';

const MainMenu = () => {
  const { width } = useResponsive();
  const isMobile = width <= 720;
  const token = localStorage.getItem("token");
  const [openMenu, setOpenMenu] = useState(false);
  const navigate = useNavigate()

  useEffect(() =>{
    if(!token) navigate("/")
  }, [])
  console.log('xxx openMenu: ', openMenu);
  return (
    <div className="containerMainMenu">
      {openMenu && (
        <div className="menuPaper">
          <ul>
            <li
              onClick={() => {
                setOpenMenu(!openMenu)
                navigate('products')
              }}>uno</li> <br /><br />
            <li>dos</li> <br /><br />
            <li>tres</li>
          </ul>
        </div>
      )}
      {!isMobile ? (
        <>
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
        </>
      ) : (
        <div className="menuMobile" onClick={() => setOpenMenu(!openMenu)}>
          <img src={menuImage} alt="menu mobile" />
        </div>
      )}
      <LogOut />
    </div>
  )
}

export default MainMenu