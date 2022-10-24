import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { getProfileData } from "../../Store/ProfileReducer"
import { useNavigate } from "react-router-dom"
import MailIcon from '@mui/icons-material/Mail';
import HttpsIcon from '@mui/icons-material/Https'
import axios from "axios"
import Loader from "../Loader"
import "./styles.css"
import toast, { Toaster } from "react-hot-toast"

const Segurity = () => {
  const [loading, setLoading] = useState(false)
  const token = localStorage.getItem("token")
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const {
    profile
  } = useSelector(({ProfileReducer}) => ({
    profile: ProfileReducer.profile
  }))

  useEffect(() =>{
    if(!token) navigate("/")
    dispatch(getProfileData())
  }, [])

  const { email, password } = profile

  const [newEmail, setNewEmail] = useState(email)
  const [currentPassword, setCurrentPassword] = useState("")
  const [oneNewPassword, setOneNewPassword] = useState("")
  const [twoNewPassword, setTowNewPassword] = useState("")

  const validationData = () => {
    setLoading(true)
    if(password !== currentPassword) {
      toast.error("The current password is not valid")
      setLoading(false)
      return false
    }
    if(oneNewPassword !== twoNewPassword) {
      toast.error("Passwords do not match")
      setLoading(false)
      return false
    }
    if(password === oneNewPassword || password === twoNewPassword) {
      toast.error("The new password can't be the same")
      setLoading(false)
      return false
    }
    return true
  }

  const cleanForm = () => {
    setCurrentPassword("")
    setOneNewPassword("")
    setTowNewPassword("")
  }

  const handleEdit = async () => {
    if(validationData()) {
      try {
        const {data} = await axios({
          method: 'PUT',
          baseURL: process.env.REACT_APP_SERVER,
          url: '/users/updateUser',
          data: {
            email: newEmail,
            password: oneNewPassword,
          },
          headers: {
            'Authorization': `Bearer ${token}`
          },
        })
        toast.success("User segurity updated successfully!")
        dispatch({type: "PROFILE_SUCCESS", payload: data })
        setLoading(false)
        cleanForm()
      } catch (error) {
        toast.error("Error updating user security")
        dispatch({ type: "PROFILE_ERROR", payload: error })
        setLoading(false)
      }
    }
  }

  return (
    <div className="containerSegurity">
      <div className="containerSegurityCard">
      <p
        className="titleSegurity"
      >
        Edit your email or password
      </p>
        <div className="divSegurity">
          <div className="divInputIcon">
            <MailIcon className="icono"/>
            <input
              className="inputSegurity"
              type="text"
              autoComplete="off"
              value={newEmail}
              placeholder="Change your email"
              onChange={(e) => setNewEmail(e.target.value)}
              />
          </div>
          <div className="divInputIcon">
            <HttpsIcon className="icono"/>
            <input
              className="inputSegurity"
              type="password"
              placeholder="Current password"
              onChange={(e) => setCurrentPassword(e.target.value)}
              />
          </div>
        </div>
        <div className="divSegurity">
          <div className="divInputIcon">
            <HttpsIcon className="icono"/>
            <input
              className="inputSegurity"
              type="password"
              placeholder="New password"
              onChange={(e) => setOneNewPassword(e.target.value)}
            />
          </div>
          <div className="divInputIcon">
            <HttpsIcon className="icono"/>
            <input
              className="inputSegurity"
              type="password"
              placeholder="Repeat the new password"
              onChange={(e) => setTowNewPassword(e.target.value)}
            />
          </div>
        </div>
        <div className="divSegurityButtons">
          {!loading ?
            <button
              className="seguritySave"
              onClick={() => handleEdit()}
            >
              Save changes
            </button> : <Loader />
          }
          <button
            className="segurityBack"
            onClick={() => navigate("/dashboard/profile")}
          >
            Back
          </button>
        </div>
      </div>
      <Toaster
        position="button-center"
        duration="3000"
      />
    </div>
  )
}

export default Segurity