import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import "./styles.css"

const SingIn = () => {
  const [errorFieldValidation, setErrorFieldValidation] = useState(false)
  const [password, setPassword] = useState('')
  const [signUpError, setSignUpError] = useState(false)
  const [email, setEmail] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    if (signUpError) {
      setSignUpError(false)
    }
  }, [email, password], signUpError)

  const handleSubmit = () => {
    if(!email || !password ) {
      setErrorFieldValidation(true)
      return;
    }
    setErrorFieldValidation(false)
    const user = {
      correo: "j@text.com",
      contrasena: "1234"
    }

    if(email === user.correo && password === user.contrasena) {
      setSignUpError(false)
      localStorage.setItem("token", "asdasdsdsdgsd")
      alert("inicio seccion exitosamente")
      //navigate('/dashboard')
    } else {
      setSignUpError(true)
      return
    }
// const user = {
//   email,
//   password
// }
//   try {
//     await axios({
//       method: 'GET',
//       baseURL: process.env,
//       url: '/',
//       headers: {
//       Authorization: `Bearer ${token}`,
//       }
//     })
//     user({
//       message: data,
//     })
//   } catch(signUpError) {
//  }
  }

  return(
    <div className="containerSignIn">
      <div className="cardSignIn">
        <h2>Sing in</h2>
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
          <button
            className="signupButton"
            name="signUp"
            onClick={handleSubmit}
          >
            Enter
          </button>
          <p
          className="register"
          onClick={() => navigate('/signup')}
        >
          Sing Up
        </p>
        </div>
        {signUpError && <p>correo o contraseña invalido</p>}
        {errorFieldValidation && <p>faltan campos por llenar</p>}
      </div>
    </div>
  )
}

export default SingIn