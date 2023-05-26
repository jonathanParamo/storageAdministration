import { useNavigate } from "react-router-dom"
import { useState } from "react"
import Loader from "../../components/Loader"
import axios from "axios"
import "./styles.css"
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LabelledInput from "../../components/LabelledInput"
import { Toaster, toast } from "react-hot-toast"

const Signin = () => {
  const [loading, setLoading] = useState(false)
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async () => {
    setLoading(true)
    if(!email || !password ) {
      toast.error("Missing fields to fill")
      setLoading(false)
      return;
    }

    try {
      const {data} = await axios({
        method: 'POST',
        baseURL: process.env.REACT_APP_SERVER,
        url: '/users/signin',
        data: { email, password }
      })
      setLoading(false)
      localStorage.setItem("token", data.token)
      navigate('/dashboard')
    } catch(error){
      toast.error("Email or password invalid")
      setLoading(false)
    }
  }

  return(
    <div className="containerSignIn">
      <div className="cardSignIn">
        <AccountCircleIcon
          sx={{
            marginTop: "30px",
            width: "20%",
            height: "20%",
            color: "#559BD9"
          }}
        />
        <h2 className="titleSignIn">
          Sign in
        </h2>
        <LabelledInput
          label="Email:"
          type="email"
          name="email"
          id="email"
          onChange={e => setEmail(e.target.value)}
          value={email}
        />
        <LabelledInput
          label="Password:"
          type="password"
          name="password"
          id="password"
          onChange={e => setPassword(e.target.value)}
          value={password}
        />
        <seccion className="containerOptionPassword">
          <p
            className="forgotPassword"
            onClick={() => navigate("/recovery-password")}
          >
            Forgot password?
          </p>
        </seccion>
        <div className="signUpSignIn">
          {!loading ?
            <button
              className="signInButton"
              name="signIn"
              onClick={handleSubmit}
            >
              Enter
            </button> : <Loader />
          }
          <button
            className="register"
            onClick={() => navigate('/signup')}
          >
            Sign up
          </button>
        </div>
        <Toaster
          toastOptions={{
            duration: 2000,
          }}
          position="button-center"
        />
      </div>
    </div>
  )
}

export default Signin