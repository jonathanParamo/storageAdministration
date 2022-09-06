import { useNavigate } from "react-router-dom"
import { useState } from "react"
import Loader from "../Loader"
import axios from "axios"
import "./styles.css"
import { useDispatch, useSelector } from "react-redux"

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
            onChange={e => {
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
              className="signInButton"
              name="signIn"
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
        {error ? <p>Email or password invalid</p> : "" }
        {errorFieldValidation && <p>Missing fields to fill</p>}
      </div>
    </div>
  )
}

export default Signin