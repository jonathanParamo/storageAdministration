import { useSelector, useDispatch } from "react-redux"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Toaster, toast } from "react-hot-toast"
import axios from "axios"
import "./styles.css"
import Loader from "../Loader"

const Profile = () => {
  const noImage = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ71Tc9Tk2q1eJUUlX1bXhWrc0-g8O9xnAplw&usqp=CAU"
  const token = localStorage.getItem("token")
  const [loading, setLoading] = useState(false)
  const [secundName, setSecundName] = useState("")
  const [secundSurname, setSecundSurname] = useState("")
  const [address, setAddress] = useState("")
  const [birthday, setBirthday] = useState("")
  const [role, setRole] = useState("")
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {
    profile,
  } = useSelector(({ProfileReducer}) => ({
    profile: ProfileReducer.profile,
  }))

  useEffect(() =>{
    if(!token) navigate("/")
  }, [])

  const editProfile = async (_id) => {
    setLoading(true)
    try {
      const { data } = await axios ({
        method: 'PUT',
        baseURL: process.env.REACT_APP_SERVER,
        url: '/users/updateUser',
        data: { secundName, secundSurname, address, birthday, role, image },
        headers: {
          'Authorization': `Bearer ${token}`
        },
      })
      dispatch({type: "PROFILE_SUCCESS", payload: data})
      toast.success("Your profile was updated successfully")
      setLoading(false)
    } catch (error) {
      toast.error("Error updating profile")
      dispatch({ type: "PROFILE_ERROR", payload: error })
      setLoading(false)
    }
  }

  const hasData = !!profile && Object.entries(profile).length > 0
  const {name, surname, image} = profile

  return (
    <div className="cardContainerProfile">
      {hasData ? (
        <div className="cardProfile">
            <img className="cardImage" src={image || noImage} />
          <div className="cardTextProfile">
              <p className="cardName" >{name}</p>
              <p className="cardName">{secundName}</p>
              <p className="cardSurname">{surname}</p>
              <p className="cardSurname">{secundSurname}</p>
          </div>
          <div className="cardDataUser">
            <div className="cardTextProfile">
              <label
                htmlFor="secundName"
                className="labelCardProfile"
              >
                Secund name:
              </label>
              <input
                id="secundName"
                type="text"
                placeholder="Secund name"
                className="inputCard"
                onChange={(e) => setSecundName(e.target.value)}
              />
            </div>
            <div className="cardTextProfile">
              <label
                htmlFor="secundSurname"
                className="labelCardProfile"
              >
                Secund surname:
              </label>
              <input
                id="secundSurname"
                type="text"
                placeholder="Secund surname"
                className="inputCard"
                onChange={(e) => setSecundSurname(e.target.value)}
              />
            </div>
            <div className="cardTextProfile">
              <label
                htmlFor="address"
                className="labelCardProfile"
              >
                Address:
              </label>
              <input
                id="address"
                className="inputCard"
                type="text"
                placeholder="Address"
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div className="cardTextProfile">
              <label
                htmlFor="birthday"
                className="labelCardProfile"
              >
                Birthday:
              </label>
              <input
                id="birthday"
                className="inputCard"
                type="date"
                placeholder="birthday"
                onChange={(e) => setBirthday(e.target.value)}
              />
            </div>
            <div className="cardTextProfile">
              <p className="labelCardProfile">Select your role:</p>
              <select
                value={role}
                className="selectCardProfile"
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="manager">Manager</option>
                <option value="coordinator">Coordinator</option>
                <option value="administrativeAssistant">Administrative assistant</option>
                <option value="headCellarman">Head cellarman</option>
              </select>
            </div>
          </div>
          <div className="cardButtons">
            {!loading ?

              <button
              className="saveChanges"
              onClick={editProfile}
              >
              Save changes
            </button> : <Loader />
            }
          </div>
          <Toaster
            position="button-right"
            duration="3000"
          />
        </div>
        ) : <p>no existen usuarios</p>
      }
    </div>
  )
}

export default Profile