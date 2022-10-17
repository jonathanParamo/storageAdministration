import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import menuImage from "./menu.png"
import menuClose from "./stop.png"
import LogOut from "../LogOut"
import "./styles.css"
import useResponsive from '../../helpers/useResponsive';
import { useSelector } from "react-redux";

const MainMenu = () => {
  const { width } = useResponsive();
  const isMobile = width <= 720;
  const token = localStorage.getItem("token");
  const [openMenu, setOpenMenu] = useState(false);
  const navigate = useNavigate()

  const {
    profile,
  } = useSelector(({ProfileReducer}) => ({
    profile: ProfileReducer.profile,
  }))

  useEffect(() =>{
    if(!token) navigate("/")
  }, [])

  const { name } = profile

  return (
    <div className="containerMainMenu">
      {openMenu && (
        <div className="menuPaper">
          <ul className="optionsMenuMobile">
            <li
              className="optionMenu"
              onClick={() => {
                setOpenMenu(!openMenu)
                navigate('products')
              }}
            >
              Products
            </li>
            <li
              className="optionMenu"
              onClick={() => {
                setOpenMenu(!openMenu)
                navigate('storages')
              }}
            >
              Storages
            </li>
            <li
              className="optionMenu"
              onClick={() => {
                setOpenMenu(!openMenu)
                navigate('profile')
              }}
            >
              Profile
            </li>
            <input
              className="optionMenuSearch"
              placeholder="Search"
              type="search"
              name="search"
            />
          </ul>
        </div>
      )}
      {!isMobile ? (
        <>
          {openMenu ? setOpenMenu(false) : ""}
          <div className="containerUserName">
            <div className="logoMainMenu">Hola {name}</div>
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
              onClick={() => navigate('profile')}
            >
              Profile
            </p>
          </div>
        </>
      ) : (
        <>
          <div className="menuMobile" onClick={() => setOpenMenu(!openMenu)}>
            <img src={openMenu ? menuClose : menuImage} alt="menu mobile" className="logoMainMenu"/>
          </div>
          <p className="menuMobileNombre">Hola {name}</p>
        </>
      )}
      <LogOut />
    </div>
  )
}

export default MainMenu