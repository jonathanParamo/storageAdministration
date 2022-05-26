import { useNavigate } from "react-router-dom"
import { useState } from "react"
import axios from "axios"
import "./styles.css"

const Signup = () => {
  const [name, setName] = useState('')
  const [surname, setSurname] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [failValidation, setFailValidation] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async () => {
    if(!name || !surname || !email || !password) {
      setFailValidation(true);
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
      await axios({
        method: 'POST',
        baseURL: 'https://safe-reef-90017.herokuapp.com',
        url: '/users/signup',
        data: newUser
      })
      cleanForm()
      //navigate('/dasbord')
      alert("fin")
    } catch (error) {
      console.log(error);
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
        <h2>Sign up</h2>
        <div className="name">
          <label
            htmlFor="name"
          >
            Name:
          </label>
          <input
            type="text"
            name="name"
            id="name"
            onChange={e => setName(e.target.value)}
            value={name}
          />
        </div>
        <div className="surname">
          <label
            htmlFor="surname"
          >
            Surname:
          </label>
          <input
            type="text"
            name="surname"
            id="surname"
            onChange={e => setSurname(e.target.value)}
            value={surname}
          />
        </div>
        <div className="userEmail">
          <label
            htmlFor="email"
          >
            Email:
          </label>
          <input
            type="text"
            name="email"
            id="email"
            onChange={e => setEmail(e.target.value)}
            value={email}
          />
        </div>
        <div className="userPassword">
          <label
            htmlFor="userPassword"
          >
            Password:
          </label>
          <input
            type="password"
            name="password"
            id="userPassword"
            onChange={e => setPassword(e.target.value)}
            value={password}
          />
        </div>
        <button
            className='createAccount'
            type="submit"
            onClick={() => handleSubmit()}
          >
            Create Account
        </button>
        <div
          className="regis"
          onClick={() => navigate('/signin')}
        >
          <p>you have an account? enter</p>
        </div>
          <button
            className="button"
            onClick={(e) => {
              e.stopPropagation()
              cleanForm()}}
          >
            borrar datos
          </button>
        {failValidation && <p className="errorValidation">All fields are required</p>}
      </div>
    </div>
  )
}

export default Signup