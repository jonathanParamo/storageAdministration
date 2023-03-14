import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Toaster, toast } from "react-hot-toast"
import Loader from "../../components/Loader"
import "./styles.css"
import axios from "axios"

const ResetPassword = () => {
  const [oneNewPassword, setOneNewPassword] = useState("")
  const [twoNewPassword, setTwoNewPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const { token } = useParams()
  const navigate = useNavigate()

  const sendResetPassword = async () => {
    // try {
    //   await axios({
    //     method: 'POST',
    //     baseURL: process.env.REACT_APP_SERVER,
    //     url: '/reset-password',
    //     body: {
    //       password: oneNewPassword,
    //       token: token
    //     }
    //   })
    //   setLoading(false)
    //   toast.success("Password changed successfully")
    //   navigate("/signin")
    // } catch (error) {
    //   toast.error("Something went wrong, please try again later")
    //   navigate("/signin")
    // }
  }

  const newPassword = () => {
    setLoading(true)

    if(!oneNewPassword || !twoNewPassword) {
      toast.error("The fields are required")
      setLoading(false)
      return
    }
    if (oneNewPassword !== twoNewPassword) {
      toast.error("Passwords do not match")
      setLoading(false)
      return
    }
    if(oneNewPassword.length < 6 || twoNewPassword.length <= 6) {
      toast.error("the number of characters is less than 6")
      setLoading(false)
      return
    }
    sendResetPassword()
  }

  useEffect(() => {
    // if(!token) navigate("/signin")
  }, []);

  return (
    <div className="containerResetPassword" >
      <div className="cardResetPassword">
        <h2 className="titleResetPassword">New password</h2>
        <p className="textresetPassword">
          Please create a new password should have
          atleast 6 characters.
        </p>
        <input
          className="inputResetPassword"
          type="password"
          placeholder="New password"
          onChange={e => setOneNewPassword(e.target.value)}
        />
        <input
          className="inputResetPassword"
          type="password"
          placeholder="Confirm new password"
          onChange={e => setTwoNewPassword(e.target.value)}
        />
        {
          loading ?
          <Loader /> :
          <button
            className="buttonResetPassword"
            onClick={() => newPassword()}
          >
            Change
          </button>
        }
      </div>
      <Toaster
        position="button-center"
        toastOptions={{
          duration: 7000,
        }}
      />
    </div>
  )
}

export default ResetPassword