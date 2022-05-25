import { useNavigate } from "react-router-dom"
import { useState } from "react"
import "./styles.css"

const Signup = () => {
  const [userName, setUserName] = useState('')
  const [userSurname, setUserSurname] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [failValidation, setFailValidation] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = () => {
    if(!userName || !userSurname || !email || !password) {
      setFailValidation(true);
      return;
    }
    setFailValidation(false);

    // navigate('/signin')
    // try {

    // } catch (error) {
    //   console.log('salió un error');
    // }
  }

  return(
    <div className="containerSingUp">
      <div className="cardSignUp">
        <h2>Sign up</h2>
        <div className="userName">
          <label
            htmlFor="userName"
          >
            Name:
          </label>
          <input
            type="text"
            name="name"
            id="userName"
            onChange={e => setUserName(e.target.value)}
            value={userName}
          />
        </div>
        <div className="userSurname">
          <label
            htmlFor="userSurname"
          >
            Surname:
          </label>
          <input
            type="text"
            name="surname"
            id="userSurname"
            onChange={e => setUserSurname(e.target.value)}
            value={userSurname}
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
            onClick={handleSubmit}
          >
            Create Account
        </button>
        <div
          className="regis"
          onClick={() => navigate('/signin')}
        >
          <p>you have an account? enter</p>
        </div>
        {failValidation && <p className="errorValidation">All fields are required</p>}
      </div>
    </div>
  )
}

export default Signup