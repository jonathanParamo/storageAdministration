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

const Security = () => {
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
  const [newPassword, setNewPassword] = useState("")
  const [twoNewPassword, setTowNewPassword] = useState("")

  const validationData = () => {
    setLoading(true)
    if(password !== currentPassword) {
      toast.error("The current password is not valid")
      setLoading(false)
      return false
    }
    if(newPassword !== twoNewPassword) {
      toast.error("Passwords do not match")
      setLoading(false)
      return false
    }
    if(password === newPassword || password === twoNewPassword) {
      toast.error("The new password can't be the same")
      setLoading(false)
      return false
    }
    return true
  }

  const cleanForm = () => {
    setCurrentPassword("")
    setNewPassword("")
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
            password: newPassword,
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
    <div className="containerSecurity">
      <div className="containerSecurityCard">
      <p
        className="titleSecurity"
      >
        Edit your email or password
      </p>
        <div className="divSecurity">
          <div className="divInputIcon">
            <MailIcon className="icono"/>
            <input
              className="inputSecurity"
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
              className="inputSecurity"
              type="password"
              placeholder="Current password"
              onChange={(e) => setCurrentPassword(e.target.value)}
              />
          </div>
        </div>
        <div className="divSecurity">
          <div className="divInputIcon">
            <HttpsIcon className="icono"/>
            <input
              className="inputSecurity"
              type="password"
              placeholder="New password"
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <div className="divInputIcon">
            <HttpsIcon className="icono"/>
            <input
              className="inputSecurity"
              type="password"
              placeholder="Repeat the new password"
              onChange={(e) => setTowNewPassword(e.target.value)}
            />
          </div>
        </div>
        <div className="divSecurityButtons">
          {!loading ?
            <button
              className="securitySave"
              onClick={() => handleEdit()}
            >
              Save changes
            </button> : <Loader />
          }
          <button
            className="securityBack"
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

export default Security