import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import LogOut from "../LogOut"
import "./styles.css"
import useResponsive from '../../helpers/useResponsive'
import MenuIcon from '@mui/icons-material/Menu'
import CloseIcon from '@mui/icons-material/Close'
import Inventory2Icon from '@mui/icons-material/Inventory2'
import WidgetsIcon from '@mui/icons-material/Widgets'
import PersonOutlineIcon from '@mui/icons-material/PersonOutline'
import { getProfileData } from "../../Store/ProfileReducer"
import SearchIcon from '@mui/icons-material/Search'
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople'
import { useSelector, useDispatch } from "react-redux"

const MainMenu = () => {
  const { width } = useResponsive();
  const isMobile = width <= 720;
  const token = localStorage.getItem("token");
  const [openMenu, setOpenMenu] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectedMenu, setSelectedMenu] = useState('');

  const {
    profile,
  } = useSelector(({ProfileReducer}) => ({
    profile: ProfileReducer.profile,
  }))

  const sectionSelected = ( section, type ) => {
    setOpenMenu(false)
    dispatch({ type: 'CHANGE_SECTION', payload: type})
    setSelectedMenu('')
    navigate(section)
  }

  useEffect(() =>{
    if(!token) navigate("/")
    dispatch(getProfileData())
  }, [dispatch, navigate, token])

  const { name } = profile

  return (
    <div className="containerMainMenu">
      {openMenu && (
        <div className="menuPaper">
          <ul className="optionsMenuMobile">
            <div className="divseccionMobile">
              <WidgetsIcon />
              <li
                className="optionMenu"
                onClick={() => setSelectedMenu('products')}
              >
                Products
              </li>
              {openMenu && selectedMenu === 'products' && (
                <ul className="subMenu">
                  <li
                    className="subMenuLi"
                    onClick={() => sectionSelected("products", "view")}
                  >
                    All products
                  </li>
                  <li
                    className="subMenuLi"
                    onClick={() => sectionSelected("products", "create")}
                  >
                    Create Product
                  </li>
                </ul>
              )}
            </div>
            <div className="divseccionMobile">
              <Inventory2Icon />
              <li
                className="optionMenu"
                onClick={() => setSelectedMenu('storages')}
              >
                Storages
              </li>
              {openMenu && selectedMenu === 'storages' && (
                <ul className="subMenu">
                  <li
                    className="subMenuLi"
                    onClick={() => sectionSelected("storages", "view")}
                  >
                    All storages
                  </li>
                  <li
                    className="subMenuLi"
                    onClick={() => sectionSelected("storages", "create")}
                  >
                    Create storage
                  </li>
                </ul>
              )}
            </div>
            <div className="divseccionMobile">
              <PersonOutlineIcon />
              <li
                className="optionMenu"
                onClick={() => {
                  setOpenMenu(!openMenu)
                  navigate('profile')
                }}
              >
                Profile
              </li>
            </div>
            <div className="divseccionMobileSearch">
              <SearchIcon />
              <input
                className="optionMenuSearch"
                placeholder="Search"
                type="search"
                name="search"
                />
            </div>
          </ul>
        </div>
      )}
      {!isMobile ? (
        <>
          {openMenu ? setOpenMenu(false) : ""}
          <div className="containerUserName">
            <div className="logoMainMenu">
              <EmojiPeopleIcon />
              ¡Hola {name}!
            </div>
          </div>
          <div className="divSearch">
            <SearchIcon />
            <input
              className="searchMainMenu"
              placeholder="Search"
              type="search"
              name="search"
              autoComplete="off"
              />
          </div>
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
            {openMenu ?
              <div className="MenuIcon">
                <CloseIcon />
              </div> :
              <div className="MenuIcon">
                <MenuIcon />
              </div>
              }
          </div>
          <div className="divGreets">
            <EmojiPeopleIcon />
            <p className="menuMobileNombre">¡Hola {name}!</p>
          </div>
        </>
      )}
      <LogOut />
    </div>
  )
}

export default MainMenu