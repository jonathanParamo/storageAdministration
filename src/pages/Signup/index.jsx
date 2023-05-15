import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { Toaster, toast } from "react-hot-toast"
import { useState } from "react"
import Loader from "../../components/Loader"
import axios from "axios"
import "./styles.css"
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import LabelledInput from "../../components/LabelledInput"

const Signup = () => {
  const [failValidation, setFailValidation] = useState(false)
  const [loading, setLoading] = useState(false)
  const [password, setPassword] = useState('')
  const [surname, setSurname] = useState('')
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleSubmit = async () => {
    setLoading(true)
    if(!name || !surname || !email || !password) {
      setFailValidation(true);
      setLoading(false)
      return;
    }
    setFailValidation(false);

    const newUser = {
      name,
      surname,
      email,
      password,
    }
    try {
      const {data} = await axios({
        method: 'POST',
        baseURL: process.env.REACT_APP_SERVER,
        url: '/users/signup',
        data: newUser
      })
      dispatch({ type: "STORAGE_SUCCESS", payload: data.storage })
      cleanForm()
      setLoading(false)
      localStorage.setItem("token", data)
      navigate('/dashboard')
    } catch (error) {
      toast.error('Something went wrong in the user registration')
      setLoading(false)
    }
  }

  const cleanForm = () => {
    setEmail("")
    setName("")
    setPassword("")
    setSurname("")
  }

  return(
    <div className="containerSingUp">
      <div className="cardSignUp">
        <PersonAddIcon
          sx={{
            marginTop: "30px",
            width: "19%",
            height: "19%",
            color: "#559BD9"
          }}
        />
        <h2
          className="titleSignup"
        >
          Sign up
        </h2>
        <LabelledInput
          htmlFor="name"
          children="Name:"
          autoComplete="none"
          type="text"
          name="name"
          id="name"
          onChange={e => setName(e.target.value)}
          value={name}
        />
        <LabelledInput
          htmlFor="surname"
          children="Surname:"
          autoComplete="none"
          type="text"
          name="surname"
          id="surname"
          onChange={e => setSurname(e.target.value)}
          value={surname}
        />
        <LabelledInput
          htmlFor="email"
          children="Email:"
          type="text"
          name="email"
          id="email"
          onChange={e => setEmail(e.target.value)}
          value={email}
        />
        <LabelledInput
          htmlFor="userPassword"
          children="Password:"
          type="password"
          name="password"
          id="userPassword"
          onChange={e => setPassword(e.target.value)}
          value={password}
        />
        {!loading ?
          <button
              className='createAccount'
              type="submit"
              onClick={() => handleSubmit()}
            >
              Create Account
          </button> : <Loader />
        }
        <button
          className="cleanForm"
          onClick={(e) => {
            e.stopPropagation()
            cleanForm()}}
        >
          Clean form
        </button>
        <Toaster
          position="button-center"
        />
        <div
          className="regis"
          onClick={() => navigate('/signin')}
        >
          <p
            className="cardButtonSignin"
          >
            You have an account? Enter
          </p>
        </div>
        {failValidation && <p className="errorValidation">All fields are required</p>}
      </div>
    </div>
  )
}

export default Signup