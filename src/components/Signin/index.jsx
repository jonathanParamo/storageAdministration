import { useState } from "react"
import "./styles.css"
import { useNavigate } from "react-router-dom"

const SingIn = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleSubmit = () => {
    if(!email || !password ) {
      alert("email or password invalids")
      return;
    }
    navigate('/dashboard')
  }
  //   try {
  //     const { data } = await axios({
  //       method: 'GET',
  //       baseURL: process.env.
  //       url: '/',
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       }
  //     })
  //     this.setState({
  //       message: data,
  //     })
  //   } catch(error) {

  //   }
  // }

  navigate('/signup')

  return(
    <div className="cardSignIn">
      <h2>Sing in</h2>
      <div className="email">
        <label
          htmlFor="email"
        >Email:
        </label>
        <input
          type="email"
          name="email"
          id="email"
          value={email}
          onSubmit={e => setEmail(e.target.value)}
        />
      </div>
      <div className="password">
        <label
          htmlFor="password"
        >Password:
        </label>
        <input
          type="password"
          name="password"
          id="password"
          value={password}
          onSubmit={e => setPassword(e.target.value)}
        />
      </div>
      <div className="singUpSingIn">
        <button
          name="signUp"
          onClick={() => navigate('/dashboard')}
        >
          Sign In
        </button>
        <button
          name="signIn"
          value={handleSubmit}
          onClick={() => handleSubmit()}
        >
          Sing Up
        </button>
      </div>
    </div>
  )
}

export default SingIn