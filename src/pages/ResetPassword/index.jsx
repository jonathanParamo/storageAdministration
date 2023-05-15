import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Toaster, toast } from "react-hot-toast"
import Loader from "../../components/Loader"
import "./styles.css"
import axios from "axios"
import Input from "../../components/Input"

const ResetPassword = () => {
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const { token } = useParams()
  const navigate = useNavigate()

  const onSubmit = async () => {
    try {
      await axios({
        method: 'PUT',
        baseURL: process.env.REACT_APP_SERVER,
        url: '/reset-password',
        body: {
          password,
          token
        }
      })
      setLoading(false)
      toast.success("Password changed successfully")
      navigate("/signin")
    } catch (error) {
      setLoading(false)
      toast.error("Something went wrong, please try again later")
    }
  }

  const messageErrorPassword = (msn) => {
    toast.error(msn)
    setLoading(false)
  }

  const validation = () => {
    setLoading(true)

    if(!password || !confirmPassword) {
      messageErrorPassword("The fields are required")
      return
    }
    if (password !== confirmPassword) {
      messageErrorPassword("Passwords do not match")
      return
    }
    if(password.length < 6 || confirmPassword.length <= 6) {
      messageErrorPassword("the number of characters is less than 6")
      return
    }

    onSubmit()
  }

  useEffect(() => {
    if(!token) navigate("/signin")
  }, []);

  return (
    <div className="containerResetPassword" >
      <div className="cardResetPassword">
        <h2 className="titleResetPassword">New password</h2>
        <p className="textresetPassword">
          Please create a new password should have
          atleast 6 characters.
        </p>
        <Input
          type="password"
          placeholder="New password"
          onChange={e => setPassword(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Confirm new password"
          onChange={e => setConfirmPassword(e.target.value)}
        />
        {
          loading ? (
            <Loader />
          ) : (
            <button
              className="buttonResetPassword"
              onClick={() => validation()}
            >
              Change
            </button>
          )
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