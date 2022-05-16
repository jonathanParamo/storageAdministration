import { useState } from "react"

const Loding = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const validation = () => {
    if(email === '') {
      alert("You must enter a valid email")
    }
    if(password === '') {
      alert("Incorrect password")
    }
  }

  return(
    <section className="loding">
      <div>
        <label htmlFor="email">
          Email:
        </label>
        <input
          type="email"
          id="email"
          name="email"
          onChange={e => setEmail(e.target.value)}
          value={email}
        />
      </div>
      <div>
      <label htmlFor="password">
          Email:
        </label>
        <input
          type="password"
          id="password"
          name="password"
          onChange={e => setPassword(e.target.value)}
          value={password}
        />
      </div>
      <button
        type="submit"
        onClick={validation}
      >
        Loding
      </button>
    </section>
  )
}

export default Loding