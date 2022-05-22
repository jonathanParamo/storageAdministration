import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import "./styles.css"

const SingIn = () => {
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)
  const [validation, setValidation] = useState(false)
  const [email, setEmail] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    setError(false)
  }, [email, password])

  const handleSubmit = () => {
    if(!email || !password ) {
      setValidation(true)
      return;
    }
    setValidation(false)
    const user = {
      correo: "j@text.com",
      contrasena: "1234"
    }

    if(email === user.correo && password === user.contrasena) {
      setError(false)
      localStorage.setItem("token", "asdasdsdsdgsd")
      alert("inicio seccion exitosamente")
      // navigate('/dashboard')
    } else {
      setError(true)
      return
    }

  //   try {
  //     const { data } = await axios({
  //       method: 'GET',
  //       baseURL: process.env,
  //       url: '/',
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       }
  //     })
  //     this.setState({
  //       message: data,
  //     })
  //   } catch(error) {
    //}
  }

  return(
    <div className="cardSignIn">
      <h2>Log in</h2>
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
            setValidation(false)
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
            setValidation(false)
          }}
          value={password}
        />
      </div>
      <div className="singUpSingIn">
        <button
          className="signup"
          name="signUp"

          onClick={handleSubmit}
        >
          Enter
        </button>
        {/* <p
          name="signIn"
          value={handleSubmit}
          onClick={() => handleSubmit()}
          >
          Do you already have an account? enter
        </p> */}
        <p
        className="register"
        onClick={() => navigate('/signup')}
      >
        Sing Up
      </p>
      </div>
      {error && <p>correo o contraseña invalido</p>}
      {validation && <p>faltan campos por llenar</p>}
    </div>
  )
}

export default SingIn