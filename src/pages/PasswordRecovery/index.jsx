import { useState } from "react"
import { useNavigate } from "react-router-dom"
import "./styles.css"
import axios from "axios"
import Loader from "../../components/Loader"
import { toast, Toaster } from "react-hot-toast"


const PasswordRecovery = () => {
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
      const { data } = await axios({
        method: 'POST',
        baseURL: process.env.REACT_APP_SERVER,
        url: '/recovery-password',
        data: { email },
      })
      toast.success("In a few minuts you'll recive and email with a link to restore your password.")
      clearEmail()
      setLoading(false)
    } catch(error){
      toast.error(error)
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
          <p className="titlePassword">Forgot Password</p>
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
            placeholder="Your email addres"
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
          className="backPassword"
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

export default PasswordRecovery