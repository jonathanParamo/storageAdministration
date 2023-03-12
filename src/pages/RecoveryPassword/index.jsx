import { useState } from "react"
import { useNavigate } from "react-router-dom"
import "./styles.css"
import axios from "axios"
import Loader from "../../components/Loader"
import { toast, Toaster } from "react-hot-toast"


const RecoveryPassword = () => {
  const [email, setEmail] = useState("")
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    setLoading(true)
    if(!email) {
      toast.error("Email is required")
      setLoading(false)
      return;
    }
    try {
      await axios({
        method: 'POST',
        baseURL: process.env.REACT_APP_SERVER,
        url: '/recovery-password',
        data: { email },
      })
      toast.success("In a few minuts you'll recive and email with a link to restore your password.")
      clearEmail()
      setLoading(false)
    } catch(error){
      toast.error("Something went wrong, please, try later")
      setLoading(false)
    }
  }

  const clearEmail = () => {
    setEmail("")
  }

  return (
    <div className="countainerForgotPassword">
      <div className="cardForgotPassword">
        <div className="TitleForgotPassword">
          <p className="titlePassword">Forgot password</p>
        </div>
        <div className="countainerInput">
          <input
            autoComplete="off"
            type="text"
            name="email"
            id="email"
            className="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Your email address"
          />
        </div>
        {
          loading ?
            <Loader />
            :
            <button
              className="resetPassword"
              onClick={() => handleSubmit()}
            >
              Send
            </button>
        }
        <button
          className="goBackButton"
          onClick={() => navigate("../")}
        >
          Back
        </button>
      </div>
      <Toaster
        position="button-center"
      />
    </div>
  )
}

export default RecoveryPassword