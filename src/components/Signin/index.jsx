import { useNavigate } from "react-router-dom"
import { useState } from "react"
import Loader from "../Loader"
import axios from "axios"
import "./styles.css"

const Signin = () => {
  const [errorFieldValidation, setErrorFieldValidation] = useState(false)
  const [signInError, setSignInError] = useState(false)
  const [loading, setLoading] = useState(false)
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async () => {
    setLoading(true)
    if(!email || !password ) {
      setErrorFieldValidation(true)
      return;
    }
    setErrorFieldValidation(false)
    try {
      const {data} = await axios({
        method: 'POST',
        baseURL: process.env.REACT_APP_SERVER,
        url: '/users/signin',
        data: { email, password}
      })
      setLoading(false)
      localStorage.setItem("token", data )
      navigate('/dashboard')
    } catch(signInError){
      setSignInError(true)
      setLoading(false)
    }
  }

  return(
    <div className="containerSignIn">
      <div className="cardSignIn">
        <h2>Sign in</h2>
        <div className="email">
          <label
            htmlFor="email"
          >
            Email:
          </label>
          <input
            type="email"
            name="email"
            id="email"
            onChange={e =>{
              setEmail(e.target.value)
              setErrorFieldValidation(false)
            }}
            value={email}
          />
        </div>
        <div className="password">
          <label
            htmlFor="password"
          >
            Password:
          </label>
          <input
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
        <div className="singUpSingIn">
        {!loading ?
          <button
            className="signupButton"
            name="signUp"
            onClick={handleSubmit}
          >
            Enter
          </button> : <Loader />
        }
          <p
          className="register"
          onClick={() => navigate('/signup')}
        >
          Sign Up
        </p>
        </div>
        {signInError && <p>correo o contraseña invalido</p>}
        {errorFieldValidation && <p>faltan campos por llenar</p>}
      </div>
    </div>
  )
}

export default Signin