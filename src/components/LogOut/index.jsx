import LogoutIcon from '@mui/icons-material/Logout'
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { useEffect } from "react"
import "./styles.css"

const LogOut = () => {
  const token = localStorage.getItem("token")
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if(!token) navigate("/")
  }, [])

  return (
    <p onClick={e =>{
      localStorage.removeItem("token")
      dispatch({type: "USER_LOGOUT"})
      navigate("/signin")
    }}
    className="logOut">
      <LogoutIcon />
    </p>
  )
}

export default LogOut