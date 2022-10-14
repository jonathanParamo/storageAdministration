import { useState } from "react"
import { useSelector } from "react-redux"
import "./styles.css"

const Segurity = () => {
  const [newEmail, setNewEmail] = useState("")
  const [newPassword, serNewPassword] = useState("")

  const {
    profile
  } = useSelector(({ProfileReducer}) => ({
    profile: ProfileReducer.profile
  }))

  const { email, password } = profile

  return (
    <div className="containerSegurity">
      <div className="containerSegurityCard">
        <input
          type="text"
          value={email}
          placeholder="Change your email"
        />
      </div>
    </div>
  )
}

export default Segurity