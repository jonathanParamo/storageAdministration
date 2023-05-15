import { useNavigate } from "react-router-dom"
import { useState } from "react"
import Loader from "../../components/Loader"
import axios from "axios"
import "./styles.css"
import { useDispatch, useSelector } from "react-redux"
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const Signin = () => {
  const [errorFieldValidation, setErrorFieldValidation] = useState(false)
  const [loading, setLoading] = useState(false)
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {
    error,
  } = useSelector(({StorageReducer})=> ({
    error: StorageReducer.error,
  }))

  const handleSubmit = async () => {
    setLoading(true)
    if(!email || !password ) {
      setErrorFieldValidation(true)
      setLoading(false)
      return;
    }
    setErrorFieldValidation(false)
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
      dispatch({ type: "STORAGE_ERROR", payload: error })
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
        <div className="textCardSignIn">
          <label
            className="textCard"
            htmlFor="email"
          >
            Email:
          </label>
          <input
            className="inputCardSignIn"
            type="email"
            name="email"
            id="email"
            onChange={e => {
              setEmail(e.target.value)
              setErrorFieldValidation(false)
            }}
            value={email}
          />
        </div>
        <div className="textCardSignIn">
          <label
            className="textCard"
            htmlFor="password"
          >
            Password:
          </label>
          <input
            className="inputCardSignIn"
            type="password"
            name="password"
            id="password"
            onChange={e => {
              setPassword(e.target.value)
              setErrorFieldValidation(false)
            }}
            value={password}
          />
        </div>
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
        {error ? <p>Email or password invalid</p> : "" }
        {errorFieldValidation && <p>Missing fields to fill</p>}
      </div>
    </div>
  )
}

export default Signin